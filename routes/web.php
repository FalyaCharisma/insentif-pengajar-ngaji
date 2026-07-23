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
use App\Http\Controllers\JenisDokumenController;
use App\Http\Controllers\ProfilLembagaController;
use App\Http\Controllers\DokumenLembagaController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\DashboardController;

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

Route::middleware('auth')->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']) ->name('dashboard');

    // Profil Setting
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/password', [PasswordController::class, 'update'])->name('profile.password');

    Route::resource('kategori', KategoriController::class);
    Route::resource('forum', ForumController::class);
    Route::put('/forum/{forum}/reset-password', [ForumController::class, 'resetPassword'])->name('forum.reset-password');

    // Lembaga
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

    // Route tambahan lembaga
    Route::prefix('lembaga')
        ->name('lembaga.')
        ->controller(LembagaController::class)
        ->group(function () {
            Route::get('data', 'data')->name('data');
            Route::put('{lembaga}/reset-password', 'resetPassword')->name('reset-password');
        });

    // Profil Lembaga
    Route::prefix('lembaga')
        ->name('lembaga.')
        ->controller(ProfilLembagaController::class)
        ->group(function () {
            Route::get('{lembaga}/profil', 'index')->name('profil.index');
            Route::put('{lembaga}/profil', 'update')->name('profil.update');
            Route::put('profil/{profil}/verifikasi', 'verifikasi')->name('profil.verifikasi');
        });

    // Jenis Dokumen
    Route::resource('jenis-dokumen', JenisDokumenController::class);

    // Dokumen Lembaga
    Route::controller(DokumenLembagaController::class)
        ->prefix('dokumen')
        ->name('dokumen.')
        ->group(function () {
            Route::get('/lembaga/{lembaga}', 'index')->name('index');
            Route::post('/lembaga/{lembaga}', 'store')->name('store');
            Route::get('/{dokumenLembaga}', 'show')->name('show');
            Route::put('/{dokumenLembaga}', 'update')->name('update');
            Route::delete('/{dokumenLembaga}', 'destroy')->name('destroy');
            Route::put('/{dokumenLembaga}/verifikasi', 'verifikasi')->name('verifikasi');
        });

    // Data Siswa
    Route::resource('data-siswa', SiswaController::class);

    // Data Pengurus
    Route::resource('pengurus', PengurusController::class)->parameters([
        'pengurus' => 'pengurus',
    ]);

    // Data Pengajar
    Route::resource('pengajar', PengajarController::class)->parameters(['pengajar' => 'pengajar',]);
    Route::controller(PengajarController::Class)->prefix('pengajar')->name('pengajar.')->group(function (){
        Route::patch('/{pengajar}/toggle-status', 'toggleStatus')->name('toggle-status');
        Route::put('/{pengajar}/verifikasi', 'verifikasi')->name('verifikasi');
    });

    // Setting Kuota
    Route::resource('kuota', KuotaController::class)->parameters(['kuota' => 'kuota']);
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
            Route::patch('/{pengajuan}/verify', 'verify')->name('verify');
            Route::patch('/{pengajuan}/reject', 'reject')->name('reject');
            Route::get('pengajuan-insentif/{proposal}/usulan', 'usulan')->name('usulan');
        });

    Route::patch('verify-selected', [PengajuanInsentifController::class, 'verifySelected'])->name('pengajuan-insentif.verify-selected');

    Route::patch('reject-selected', [PengajuanInsentifController::class, 'rejectSelected'])->name('pengajuan-insentif.reject-selected');
});

require __DIR__ . '/auth.php';
