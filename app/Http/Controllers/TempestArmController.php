<?php

namespace App\Http\Controllers;

use App\Http\Requests\TempestArm\StoreRequest;
use App\Http\Requests\TempestArm\UpdateRequest;
use App\Models\TempestArm;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use Inertia\Response;

class TempestArmController extends Controller
{
    /**
     * Display a listing of the tempest arms.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $players = Auth::user()->players()
            ->whereHas('tempestArms')
            ->select('id', 'username')
            ->get();
        $playerIds = $players->pluck('id')->toArray();

        $playerId = $request->route('player_id') ?? null;
        if ($playerId && !in_array($playerId, $playerIds)) {
            return Redirect::route('tempest-arms.index');
        }

        return Inertia::render('TempestArms/Index', [
            'tempestArms' => TempestArm::whereIn('player_id', $playerId ? [$playerId] : $playerIds)->get(),
            'players' => $players,
            'selectedPlayerId' => $playerId,
        ]);
    }

    /**
     * Show the form for creating a new tempest arm.
     */
    public function create(): Response
    {
        return Inertia::render('TempestArm/Create', [
            'players' => Auth::user()->players()->select('id', 'username')->get(),
        ]);
    }

    /**
     * Store a newly created tempest arm in storage.
     */
    public function store(StoreRequest $request): RedirectResponse
    {
        $tempestArm = TempestArm::create($request->validated());

        return Redirect::route('tempest-arm.edit', $tempestArm->id);
    }

    /**
     * Show the form for editing the specified tempest arm.
     */
    public function edit(TempestArm $tempestArm): Response
    {
        if (auth()->user()->cannot('modify', $tempestArm)) {
            abort(403);
        }

        return Inertia::render('TempestArm/Edit', [
            'players' => Auth::user()->players()->select('id', 'username')->get(),
            'tempestArm' => $tempestArm,
        ]);
    }

    /**
     * Update the specified tempest arm in storage.
     */
    public function update(UpdateRequest $request, TempestArm $tempestArm): RedirectResponse
    {
        if (auth()->user()->cannot('modify', $tempestArm)) {
            abort(403);
        }

        $tempestArm->fill($request->validated());
        $tempestArm->save();

        return Redirect::route('tempest-arm.edit', $tempestArm);
    }

    /**
     * Remove the specified tempest arm from storage.
     */
    public function destroy(TempestArm $tempestArm): RedirectResponse
    {
        if (auth()->user()->cannot('modify', $tempestArm)) {
            abort(403);
        }

        $tempestArm->delete();

        return Redirect::route('tempest-arms.index');
    }
}
