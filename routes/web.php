<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\LembagaController;
use App\Http\Controllers\PengurusController;

Route::get('/', function () {
    return redirect()->route('login');
});

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

    Route::resource('pengurus', PengurusController::class);
});

require __DIR__.'/auth.php';