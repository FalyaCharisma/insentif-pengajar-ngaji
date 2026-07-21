<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\LembagaController;
use App\Http\Controllers\PengurusController;
use App\Http\Controllers\PengajuanProposalController;
use App\Http\Controllers\PengajuanInsentifController;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\KuotaController;
use App\Http\Controllers\MappingForumController;
use App\Http\Controllers\MappingKategoriController;
use App\Http\Controllers\PengajarController;

Route::get('/', function () {
    return Inertia::render('frontend/Beranda');
})->name('portal.beranda');

Route::get('/peta-sebaran', function () {
    return Inertia::render('frontend/PetaSebaran');
})->name('portal.peta-sebaran');

Route::get('/layanan', function () {
    return Inertia::render('frontend/Layanan');
})->name('portal.layanan');

Route::get('/berita', function () {
    return Inertia::render('frontend/Berita');
})->name('portal.berita');

Route::get('/kontak', function () {
    return Inertia::render('frontend/Kontak');
})->name('portal.kontak');

// Route::get('/', function () {
//     return redirect()->route('login');
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('kategori', KategoriController::class);
    Route::resource('forum', ForumController::class);
    Route::resource('lembaga', LembagaController::class);
    Route::prefix('lembaga')
        ->name('lembaga.')
        ->controller(LembagaController::class)
        ->group(function () {
            Route::get('data', 'data')->name('data');
            Route::put('{lembaga}/reset-password', 'resetPassword')->name('reset-password');
        });

    Route::get('mapping-forum', [MappingForumController::class, 'index'])->name('mapping-forum.index');
    Route::put('mapping-forum', [MappingForumController::class, 'update'])->name('mapping-forum.update');

    Route::get('mapping-kategori', [MappingKategoriController::class, 'index'])->name('mapping-kategori.index');
    Route::put('mapping-kategori', [MappingKategoriController::class, 'update'])->name('mapping-kategori.update');

    Route::resource('data-siswa', SiswaController::class);

    Route::resource('pengurus', PengurusController::class)->parameters([
        'pengurus' => 'pengurus',
    ]);

    Route::resource('pengajar', PengajarController::class)->parameters([
        'pengajar' => 'pengajar',
    ]);

    Route::resource('kuota', KuotaController::class)->parameters([
        'kuota' => 'kuota',
    ]);

    Route::post('kuota/generate', [KuotaController::class, 'generate'])->name('kuota.generate');

    Route::delete('kuota/periode/{periode}', [KuotaController::class, 'destroyPeriode'])->name('kuota.destroyPeriode');
    Route::resource('periode', PeriodeController::class);
    Route::resource('pengajuan-proposal', PengajuanProposalController::class);
    Route::patch('/pengajuan-proposal/{pengajuanProposal}/verify', [PengajuanProposalController::class, 'verify'])->name('pengajuan-proposal.verify');
    Route::patch('/pengajuan-proposal/{pengajuanProposal}/unverify', [PengajuanProposalController::class, 'unverify'])->name('pengajuan-proposal.unverify');
    Route::prefix('pengajuan-insentif')
        ->name('pengajuan-insentif.')
        ->controller(PengajuanInsentifController::class)
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::get('/{proposal}', 'show')->name('show');
            Route::patch('/{proposal}/verify', 'verify')->name('verify');
            Route::patch('/{proposal}/reject', 'reject')->name('reject');
        });

    Route::get('pengajuan-insentif/{proposal}/usulan', [PengajuanInsentifController::class, 'usulan'])->name('pengajuan-insentif.usulan');
});

require __DIR__ . '/auth.php';
