<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerStoreRequest;
use App\Http\Requests\PlayerUpdateRequest;
use App\Models\Player;
use App\Utilities\PlayerQueryBuilder;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

use Inertia\Inertia;
use Inertia\Response;

class PlayerController extends Controller
{
    private $defaultTopCount = 50;

    /**
     * Display a listing of the players.
     */
    public function index(Request $request): Response
    {
        $params = $request->validate([
            'top' => 'nullable|integer|min:1',
            'alliance' => 'nullable|string',
            'rank_by' => 'nullable|in:behemoths_bp,squadron_bp',
        ]);

        // Base query with user scope
        $baseQuery = auth()->user()->players();

        // Clone for filtered results
        $filteredQuery = (clone $baseQuery)
            ->with('mk1', 'mk2', 'formationSystem', 'army')
            ->when($params['alliance'] ?? null, fn($q, $alliance) => $q->where('alliance', $alliance))
            ->take($params['top'] ?? $this->defaultTopCount)
            ->orderByRaw(PlayerQueryBuilder::getOrderBy($params['rank_by'] ?? null));

        return Inertia::render('Players/Index', [
            'players' => $filteredQuery->get(),
            'alliances' => $baseQuery
                ->whereNotNull('alliance')
                ->distinct()
                ->pluck('alliance'),
            'topCount' => $params['top'] ?? $this->defaultTopCount,
            'alliance' => $params['alliance'] ?? null,
            'rankBy' => $params['rank_by'] ?? null,
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
        $player = auth()->user()->players()->create($request->validated());

        return Redirect::route('player.edit', $player->id);
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
