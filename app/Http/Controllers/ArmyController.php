<?php

namespace App\Http\Controllers;

use App\Http\Requests\Army\StoreRequest;
use App\Http\Requests\Army\UpdateRequest;
use App\Models\Army;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ArmyController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request): RedirectResponse
    {
        Army::create($request->validated());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Army $army): RedirectResponse
    {
        $army->fill($request->validated());

        if ($army->isDirty()) {
            $army->save();
        } else {
            $army->touch();
        }

        return back();
    }
}
