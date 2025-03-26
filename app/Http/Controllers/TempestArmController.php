<?php

namespace App\Http\Controllers;

use App\Http\Requests\TempestArmStoreRequest;

// use Illuminate\Http\Request;
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
        dd([
            'from' => 'tempest-arm.store',
            'validated' => $request->validated(),
        ]);
    }
}
