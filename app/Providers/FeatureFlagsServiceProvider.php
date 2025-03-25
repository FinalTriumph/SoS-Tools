<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Pennant\Feature;

class FeatureFlagsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $tempestArmsEnabled = env('TEMPEST_ARMS_ENABLED', false);

        Feature::define('tempest-arms', fn () => $tempestArmsEnabled);

        if (Feature::for(null)->active('tempest-arms') !== $tempestArmsEnabled) {
            Feature::for(null)->activate('tempest-arms', $tempestArmsEnabled);
        }
    }
}
