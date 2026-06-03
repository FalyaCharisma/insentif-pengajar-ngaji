<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\KecamatanController;
use App\Http\Controllers\Api\PortalController;
use App\Http\Controllers\Api\BeritaController;

// Kecamatan Routes
Route::prefix('kecamatan')->group(function () {
    Route::get('/', [KecamatanController::class, 'index']); // GET /api/kecamatan
    Route::get('/{id}', [KecamatanController::class, 'show']); // GET /api/kecamatan/{id}
    Route::get('/{id}/lembaga', [KecamatanController::class, 'lembaga']); // GET /api/kecamatan/{id}/lembaga
    Route::get('/{kecamatanId}/lembaga/{lembagaId}', [KecamatanController::class, 'lembagaDetail']); // GET /api/kecamatan/{id}/lembaga/{id}
});

// Portal Routes (Statistik, Layanan, Quick Links)
Route::prefix('portal')->group(function () {
    Route::get('/statistik', [PortalController::class, 'statistik']); // GET /api/portal/statistik
    Route::get('/layanan', [PortalController::class, 'layanan']); // GET /api/portal/layanan
    Route::get('/quick-links', [PortalController::class, 'quickLinks']); // GET /api/portal/quick-links
});

// Berita Routes
Route::prefix('berita')->group(function () {
    Route::get('/', [BeritaController::class, 'index']); // GET /api/berita
    Route::get('/{id}', [BeritaController::class, 'show']); // GET /api/berita/{id}
});

