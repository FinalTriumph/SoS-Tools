<?php

namespace App\Http\Requests\Army;

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
            'plasma' => [
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            'tier' => [
                'nullable',
                'integer',
                'min:1',
                'max:15',
            ],
            't12_infantry' => [
                'nullable',
                'integer',
                'min:1',
                'max:13',
            ],
            't12_rider' => [
                'nullable',
                'integer',
                'min:1',
                'max:13',
            ],
            't12_hunter' => [
                'nullable',
                'integer',
                'min:1',
                'max:13',
            ],
        ];
    }
}
