<?php

namespace App\Http\Requests\Mk2;

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
            'level' => [
                'nullable',
                'integer',
                'min:1',
                'max:200',
            ],
            'stars' => [
                'nullable',
                'integer',
                'min:1',
                'max:3',
            ],
            'color' => [
                'nullable',
                'string',
                Rule::in(['green', 'blue', 'purple', 'gold', 'red']),
            ],
            'skills' => [
                'nullable',
                'integer',
                'min:0',
                'max:50',
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
