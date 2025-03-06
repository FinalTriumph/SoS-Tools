<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PlayerController;

use App\Http\Controllers\Mk1Controller;
use App\Http\Controllers\Mk2Controller;
use App\Http\Controllers\FormationSystemController;
use App\Http\Controllers\ArmyController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/players', [PlayerController::class, 'index'])->name('players.index');
    Route::resource('/player', PlayerController::class)->except(['index']);

    Route::resource('/mk1', Mk1Controller::class)->only(['store', 'update']);
    Route::resource('/mk2', Mk2Controller::class)->only(['store', 'update']);
    Route::resource('/formation-system', FormationSystemController::class)->only(['store', 'update']);
    Route::resource('/army', ArmyController::class)->only(['store', 'update']);
});

require __DIR__.'/auth.php';
