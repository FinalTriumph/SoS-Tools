<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerStoreRequest;
use App\Http\Requests\PlayerUpdateRequest;
use App\Models\Player;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

use Inertia\Inertia;
use Inertia\Response;

class PlayerController extends Controller
{
    /**
     * Display a listing of the players.
     */
    public function index(): Response
    {
        $players = auth()->user()->players()
            ->with('mk1', 'mk2', 'formationSystem')
            ->orderByRaw('(behemoths_bp + squadron_bp) DESC')
            ->get();

        return Inertia::render('Players/Index', [
            'players' => $players,
        ]);
    }

    /**
     * Show the form for creating a new player.
     */
    public function create(): Response
    {
        return Inertia::render('Player/Create');
    }

    /**
     * Store a newly created player in storage.
     */
    public function store(PlayerStoreRequest $request): RedirectResponse
    {
        auth()->user()->players()->create($request->validated());

        return Redirect::route('players.index');
    }

    /**
     * Display the specified player.
     */
    /* public function show(Player $player)
    {
        //
    } */

    /**
     * Show the form for editing the specified player.
     */
    public function edit(Player $player): Response
    {
        if (auth()->user()->cannot('modify', $player)) {
            abort(403);
        }

        $player->load('mk1', 'mk2', 'formationSystem', 'army');

        return Inertia::render('Player/Edit', [
            'player' => $player
        ]);
    }

    /**
     * Update the specified player in storage.
     */
    public function update(PlayerUpdateRequest $request, Player $player): RedirectResponse
    {
        if (auth()->user()->cannot('modify', $player)) {
            abort(403);
        }

        $player->fill($request->validated());
        $player->save();

        return Redirect::route('player.edit', $player);
    }

    /**
     * Remove the specified player from storage.
     */
    public function destroy(Player $player): RedirectResponse
    {
        if (auth()->user()->cannot('modify', $player)) {
            abort(403);
        }

        $player->delete();

        return Redirect::route('players.index');
    }
}
