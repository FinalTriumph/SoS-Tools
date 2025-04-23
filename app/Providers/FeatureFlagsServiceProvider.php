<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Pennant\Feature;

class FeatureFlagsServiceProvider extends ServiceProvider
{
    private $featureFlags = [
        'tempest-arms' => 'TEMPEST_ARMS_ENABLED',
        'heroes' => 'HEROES_ENABLED',
    ];

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
        foreach ($this->featureFlags as $feature => $envVariable) {
            $this->bootFeature($feature, $envVariable);
        }
    }

    private function bootFeature(string $feature, string $envVariable): void
    {
        $isEnabled = filter_var(env($envVariable, false), FILTER_VALIDATE_BOOL);
        
        Feature::define($feature, fn() => $isEnabled);
        
        if (Feature::for(null)->active($feature) !== $isEnabled) {
            Feature::for(null)->activate($feature, $isEnabled);
        }
    }
}
