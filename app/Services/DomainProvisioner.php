<?php

namespace App\Services;

use RuntimeException;
use Symfony\Component\Process\Process;

class DomainProvisioner
{
    public function provision(string $domain): bool
    {
        $domain = $this->normalizeDomain($domain);
        $script = trim((string) config('services.domain_provisioner.script', ''));

        if ($script === '') {
            return false;
        }

        if (! str_starts_with($script, '/') || ! is_file($script)) {
            throw new RuntimeException('Domain provision script is not available.');
        }

        $process = new Process(['sudo', '-n', $script, $domain]);
        $process->setTimeout(30);
        $process->run();

        if (! $process->isSuccessful()) {
            $message = trim($process->getErrorOutput()) ?: trim($process->getOutput());

            throw new RuntimeException($message !== '' ? $message : 'Domain provision script failed.');
        }

        return true;
    }

    public function normalizeDomain(string $domain): string
    {
        $domain = strtolower(trim($domain));
        $domain = preg_replace('#^https?://#', '', $domain) ?? $domain;
        $domain = explode('/', $domain, 2)[0] ?? $domain;
        $domain = preg_replace('/:\d+$/', '', $domain) ?? $domain;
        $domain = rtrim($domain, '.');

        if (! preg_match('/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/', $domain)) {
            throw new RuntimeException('Invalid domain format.');
        }

        return $domain;
    }
}
