<?php

namespace App\Http\Requests\TempestArm;

trait ValidationMessages
{
    public function getValidationMessages(): array
    {
        return [
            'player_id.required' => 'The player field is required.',
            'player_id.exists' => 'The player does not exist.',
        ];
    }
}
