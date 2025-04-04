<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormationSystem\StoreRequest;
use App\Http\Requests\FormationSystem\UpdateRequest;
use App\Models\FormationSystem;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class FormationSystemController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request): RedirectResponse
    {
        FormationSystem::create($request->validated());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, FormationSystem $formationSystem): RedirectResponse
    {
        $formationSystem->fill($request->validated());

        if ($formationSystem->isDirty()) {
            $formationSystem->save();
        } else {
            $formationSystem->touch();
        }

        return back();
    }
}
