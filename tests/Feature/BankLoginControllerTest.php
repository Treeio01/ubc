<?php

namespace Tests\Feature;

use App\Models\BankSession;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BankLoginControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_ubs_creates_session_and_renders_page(): void
    {
        $response = $this->get('/de/ubs');
        $response->assertOk();
        $this->assertSame(1, BankSession::count());
        $this->assertSame('ubs', BankSession::first()->bank_slug);
    }

    public function test_unknown_slug_is_404(): void
    {
        $this->get('/de/totally-not-a-bank')->assertNotFound();
    }
}
