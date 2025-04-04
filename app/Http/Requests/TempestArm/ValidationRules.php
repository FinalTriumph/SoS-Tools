<?php

namespace App\Http\Requests\TempestArm;

use App\Http\Requests\Shared\BaseValidationRules;

use Illuminate\Validation\Rule;

trait ValidationRules
{
    use BaseValidationRules;

    public function getValidationRules(): array
    {
        return [
            // General
            'player_id' => [
                'required',
                'integer',
                'exists:players,id',
            ],
            'troop_type' => [
                'required',
                'string',
                Rule::in(['infantry', 'riders', 'hunters']),
            ],
            'type' => [
                'required',
                'string',
                Rule::in(['attack', 'defense']),
            ],
            'generation' => [
                'required',
                'string',
                Rule::in(['g1', 'g2', 'g3', 's1']),
            ],
            // Stats
            'stats' => [
                'required',
                'array',
                'size:4',
            ],
            'stats.*.name' => [
                'nullable',
                'string',
                'max:255',
            ],
            'stats.*.value' => [
                'nullable',
                'numeric',
                'min:0',
                'max:1000',
            ],
            'stats.*.is_percentage' => [
                'nullable',
                'boolean',
            ],
            'stats.*.color' => [
                'nullable',
                'string',
                Rule::in(['purple', 'gold', 'red']),
            ],
            // Skill
            'skill' => [
                'required',
                'array',
            ],
            'skill.name' => [
                'nullable',
                'string',
                'max:255',
            ],
            'skill.level' => [
                'nullable',
                'integer',
                'min:0',
                'max:4',
            ],
            'skill.quality' => [
                'nullable',
                'string',
                Rule::in(['common', 'rare', 'ultra']),
            ],
        ];
    }
}
