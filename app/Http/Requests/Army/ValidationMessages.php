<?php

namespace App\Http\Requests\Army;

trait ValidationMessages
{
    public function getValidationMessages(): array
    {
        return [
            'player_id.exists' => 'The player does not exist.',
            'player_id.unique' => 'Player already has an army.',
        ];
    }
}
