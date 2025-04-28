<?php

namespace App\Http\Controllers;

use App\Http\Requests\Hero\StoreRequest;
use App\Http\Requests\Hero\UpdateRequest;
use App\Models\Hero;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use Inertia\Response;

class HeroController extends Controller
{
    /**
     * Display a listing of heroes.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $players = Auth::user()->players()
            ->whereHas('heroes')
            ->select('id', 'username')
            ->get();
        $playerIds = $players->pluck('id')->toArray();

        $playerId = $request->route('player_id') ?? null;
        if ($playerId && !in_array($playerId, $playerIds)) {
            return Redirect::route('heroes.index');
        }

        return Inertia::render('Heroes/Index', [
            'heroes' => Hero::whereIn('player_id', $playerId ? [$playerId] : $playerIds)->get(),
            'players' => $players,
            'selectedPlayerId' => $playerId,
        ]);
    }

    /**
     * Show the form for creating a new hero.
     */
    public function create(): Response
    {
        return Inertia::render('Hero/Create', [
            'players' => Auth::user()->players()->select('id', 'username')->get(),
        ]);
    }

    /**
     * Store a newly created hero in storage.
     */
    public function store(StoreRequest $request): RedirectResponse
    {
        $hero = Hero::create($request->validated());

        return Redirect::route('hero.edit', $hero->id);
    }

    /**
     * Display the specified resource.
     */
    /* public function show(Hero $hero)
    {
        //
    } */

    /**
     * Show the form for editing the specified hero.
     */
    public function edit(Hero $hero): Response
    {
        return Inertia::render('Hero/Edit', [
            'players' => Auth::user()->players()->select('id', 'username')->get(),
            'hero' => $hero,
        ]);
    }

    /**
     * Update the specified hero in storage.
     */
    public function update(UpdateRequest $request, Hero $hero): RedirectResponse
    {
        $hero->fill($request->validated());
        $hero->save();

        return Redirect::route('hero.edit', $hero);
    }

    /**
     * Remove the specified resource from storage.
     */
    /* public function destroy(Hero $hero)
    {
        //
    } */
}
