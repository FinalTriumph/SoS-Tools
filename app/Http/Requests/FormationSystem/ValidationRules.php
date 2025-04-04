<?php

namespace App\Http\Requests\FormationSystem;

use App\Http\Requests\Shared\BaseValidationRules;

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
            'level' => [
                'nullable',
                'integer',
                'min:1',
                'max:300',
            ],
            'skill_1' => [
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            'skill_2' => [
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            'skill_3' => [
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            'skill_4' => [
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            'skill_5' => [
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
        ];
    }
}
