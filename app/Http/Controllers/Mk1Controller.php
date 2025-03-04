<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mk1StoreRequest;
use App\Http\Requests\Mk1UpdateRequest;
use App\Models\Mk1;

use Illuminate\Http\Request;

class Mk1Controller extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Mk1StoreRequest $request)
    {
        Mk1::create($request->validated());

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Mk1UpdateRequest $request, Mk1 $mk1)
    {
        $mk1->update($request->validated());

        return back();
    }
}
