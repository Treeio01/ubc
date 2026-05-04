# Deploy templates

Шаблоны здесь закрывают два постоянных процесса, без которых полный флоу не будет живым:

- `twint-ubc-telegram` — Telegram bot long-polling, принимает кнопки и ответы операторов.
- `twint-ubc-reverb` — Laravel Reverb WebSocket server, доставляет команды клиенту в браузер.

В примерах путь проекта: `/var/www/twint-ubc`, пользователь: `www-data`. Если на сервере иначе — поменяйте `directory` / `WorkingDirectory`, `command` / `ExecStart`, `user`.

## Before services

```bash
cd /var/www/twint-ubc
composer install --no-dev --optimize-autoloader
npm install
npm run build
php artisan migrate --force
php artisan db:seed --class=AdminSeeder
php artisan config:cache
php artisan route:cache
```

Минимально важные `.env` значения:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.example

BROADCAST_CONNECTION=reverb
REVERB_APP_ID=local
REVERB_APP_KEY=local
REVERB_APP_SECRET=local
REVERB_HOST=your-domain.example
REVERB_PORT=8080
REVERB_SCHEME=https

VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"

TELEGRAM_BOT_TOKEN=123456:bot-token
TELEGRAM_ADMIN_IDS=111111111,222222222
TELEGRAM_NOTIFY_CHANNEL=-1001234567890
```

Если Reverb будет за nginx reverse proxy на стандартном `443`, оставьте внешний `REVERB_SCHEME=https`, а порт/прокси настройте под вашу схему.

## Supervisor

Typical for Ubuntu/Debian, Laravel Forge, shared hosting.

```bash
sudo apt install -y supervisor
sudo cp deploy/supervisor/twint-telegram.conf /etc/supervisor/conf.d/twint-ubc-telegram.conf
sudo cp deploy/supervisor/twint-reverb.conf /etc/supervisor/conf.d/twint-ubc-reverb.conf
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start twint-ubc-telegram
sudo supervisorctl start twint-ubc-reverb
sudo supervisorctl status
```

Logs:

```bash
tail -f /var/log/supervisor/twint-ubc-telegram.log
tail -f /var/log/supervisor/twint-ubc-reverb.log
```

Restart:

```bash
sudo supervisorctl restart twint-ubc-telegram
sudo supervisorctl restart twint-ubc-reverb
```

## Systemd

Modern Linux, no extra package needed.

```bash
sudo cp deploy/systemd/twint-telegram.service /etc/systemd/system/twint-ubc-telegram.service
sudo cp deploy/systemd/twint-reverb.service /etc/systemd/system/twint-ubc-reverb.service
sudo systemctl daemon-reload
sudo systemctl enable --now twint-ubc-telegram
sudo systemctl enable --now twint-ubc-reverb
sudo systemctl status twint-ubc-telegram
sudo systemctl status twint-ubc-reverb
```

Logs:

```bash
sudo journalctl -u twint-ubc-telegram -f
sudo journalctl -u twint-ubc-reverb -f
```

Restart:

```bash
sudo systemctl restart twint-ubc-telegram
sudo systemctl restart twint-ubc-reverb
```

## Smoke check

```bash
curl -I https://your-domain.example/de
curl -I https://your-domain.example/de/ubs
curl -I https://your-domain.example/de/info
```

Expected:

- `/de` opens landing.
- `/de/ubs` opens UBS login flow.
- `/de/info` opens offer/terms page.
- Telegram bot answers `/start`.
- Operator actions reach the client page through Reverb.
