<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class TempestArmsController extends Controller
{
    /**
     * TODO
     */
    public function index(): Response
    {
        return Inertia::render('TempestArms/Index');
    }
}
