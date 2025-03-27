<?php

namespace App\Http\Controllers;

use App\Http\Requests\TempestArmStoreRequest;
use App\Http\Requests\TempestArmUpdateRequest;
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
     * TODO
     * Display a listing of the tempest arms.
     */
    public function index(): Response
    {
        return Inertia::render('TempestArms/Index');
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
    public function store(TempestArmStoreRequest $request): RedirectResponse
    {
        $tempestArm = TempestArm::create($request->validated());

        return Redirect::route('tempest-arm.edit', $tempestArm->id);
    }

    /**
     * TODO
     * Show the form for editing the specified tempest arm.
     */
    public function edit(TempestArm $tempestArm): Response
    {
        return Inertia::render('TempestArm/Edit', [
            'players' => Auth::user()->players()->select('id', 'username')->get(),
            'tempestArm' => $tempestArm,
        ]);
    }

    /**
     * TODO
     * Update the specified tempest arm in storage.
     */
    public function update(TempestArmUpdateRequest $request, TempestArm $tempestArm): RedirectResponse
    {
        $tempestArm->fill($request->validated());
        $tempestArm->save();

        return Redirect::route('tempest-arm.edit', $tempestArm);
    }
}
