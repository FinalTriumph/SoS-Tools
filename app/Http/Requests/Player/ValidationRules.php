<?php

namespace App\Http\Requests\Player;

use App\Http\Requests\Shared\BaseValidationRules;

trait ValidationRules
{
    use BaseValidationRules;

    public function getValidationRules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'max:255',
            ],
            'alliance' => [
                'nullable',
                'string',
                'max:255',
            ],
            'behemoths_bp' => [
                'nullable',
                'integer',
                'min:0',
                'max:1000',
            ],
            'squadron_bp' => [
                'nullable',
                'integer',
                'min:0',
                'max:1000',
            ],
            'fa1_stars' => [
                'nullable',
                'integer',
                'min:0',
                'max:6',
            ],
        ];
    }
}
