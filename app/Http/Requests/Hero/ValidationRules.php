<?php

namespace App\Http\Requests\Hero;

use App\Http\Requests\Shared\BaseValidationRules;

use Illuminate\Validation\Rule;

trait ValidationRules
{
    use BaseValidationRules;

    public function getValidationRules(): array
    {
        return [
            'player_id' => [
                'required',
                'integer',
                'exists:players,id',
            ],
            'name' =>[
                'required',
                'string',
                'max:255',
            ],
            'generation' => [
                'required',
                'integer',
                'min:0',
                'max:100',
            ],
            'troop_type' => [
                'required',
                'string',
                Rule::in(['infantry', 'riders', 'hunters']),
            ],
            'type' => [
                'required',
                'string',
                Rule::in(['berserk', 'resilience', 'control']),
            ],
            'attack_defense_stats' => [
                'required',
                'integer',
                'min:0',
                'max:10000',
            ],
        ];
    }
}
