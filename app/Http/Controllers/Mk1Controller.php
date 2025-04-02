<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mk1StoreRequest;
use App\Http\Requests\Mk1UpdateRequest;
use App\Models\Mk1;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class Mk1Controller extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Mk1StoreRequest $request): RedirectResponse
    {
        Mk1::create($request->validated());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Mk1UpdateRequest $request, Mk1 $mk1): RedirectResponse
    {
        $mk1->fill($request->validated());

        if ($mk1->isDirty()) {
            $mk1->save();
        } else {
            $mk1->touch();
        }

        return back();
    }
}
