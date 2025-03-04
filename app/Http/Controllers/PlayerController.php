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
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $players = auth()->user()->players()->orderByRaw('(behemoths_bp + squadron_bp) DESC')->get();

        return Inertia::render('Players/Index', [
            'players' => $players,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Player/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlayerStoreRequest $request)
    {
        auth()->user()->players()->create($request->validated());
    
        return Redirect::route('players.index');
    }

    /**
     * Display the specified resource.
     */
    /* public function show(Player $player)
    {
        //
    } */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        if (auth()->user()->cannot('modify', $player)) {
            abort(403);
        }

        $player->load('mk1');
        $player->load('mk2');
        $player->load('formationSystem');

        return Inertia::render('Player/Edit', [
            'player' => $player
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlayerUpdateRequest $request, Player $player)
    {
        if (auth()->user()->cannot('modify', $player)) {
            abort(403);
        }

        $player->fill($request->validated());
        $player->save();
    
        return Redirect::route('player.edit', $player);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        if (auth()->user()->cannot('modify', $player)) {
            abort(403);
        }

        $player->delete();

        return Redirect::route('players.index');
    }
}
