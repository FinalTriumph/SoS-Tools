<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mk2StoreRequest;
use App\Http\Requests\Mk2UpdateRequest;
use App\Models\Mk2;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class Mk2Controller extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Mk2StoreRequest $request): RedirectResponse
    {
        Mk2::create($request->validated());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Mk2UpdateRequest $request, Mk2 $mk2): RedirectResponse
    {
        $mk2->fill($request->validated());

        if ($mk2->isDirty()) {
            $mk2->save();
        } else {
            $mk2->touch();
        }

        return back();
    }
}
