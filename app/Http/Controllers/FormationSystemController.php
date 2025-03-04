<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormationSystemStoreRequest;
use App\Http\Requests\FormationSystemUpdateRequest;
use App\Models\FormationSystem;

use Illuminate\Http\Request;

class FormationSystemController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(FormationSystemStoreRequest $request)
    {
        FormationSystem::create($request->validated());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormationSystemUpdateRequest $request, FormationSystem $formationSystem)
    {
        $formationSystem->update($request->validated());

        return back();
    }
}
