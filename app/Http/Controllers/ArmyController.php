<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArmyStoreRequest;
use App\Http\Requests\ArmyUpdateRequest;
use App\Models\Army;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ArmyController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(ArmyStoreRequest $request): RedirectResponse
    {
        Army::create($request->validated());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArmyUpdateRequest $request, Army $army): RedirectResponse
    {
        $army->update($request->validated());

        return back();
    }
}
