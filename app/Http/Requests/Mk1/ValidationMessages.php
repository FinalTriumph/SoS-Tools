<?php

namespace App\Http\Requests\Mk1;

trait ValidationMessages
{
    public function getValidationMessages(): array
    {
        return [
            'player_id.exists' => 'The player does not exist.',
            'player_id.unique' => 'Player already has an Mk1.',
        ];
    }
}
