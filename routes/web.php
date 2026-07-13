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
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('kategori', KategoriController::class);
    Route::resource('forum', ForumController::class);
    Route::resource('lembaga', LembagaController::class);
    Route::get('/data/lembaga', [LembagaController::class, 'data'])->name('lembaga.data');

    Route::resource('pengurus', PengurusController::class)
        ->parameters([
            'pengurus' => 'pengurus',
        ]);
    Route::resource('periode', PeriodeController::class);
    Route::resource('pengajuan-proposal', PengajuanProposalController::class);
    Route::patch('/pengajuan-proposal/{pengajuanProposal}/verify', [PengajuanProposalController::class, 'verify'])->name('pengajuan-proposal.verify');
    Route::patch('/pengajuan-proposal/{pengajuanProposal}/unverify',[PengajuanProposalController::class, 'unverify'])->name('pengajuan-proposal.unverify');
    Route::resource('pengajuan-insentif', PengajuanInsentifController::class);

});

require __DIR__.'/auth.php';