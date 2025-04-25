<?php

namespace App\Http\Requests\Hero;

trait ValidationMessages
{
    public function getValidationMessages(): array
    {
        return [
            'player_id.exists' => 'The player does not exist.',
        ];
    }
}
