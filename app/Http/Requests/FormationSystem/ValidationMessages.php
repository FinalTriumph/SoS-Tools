<?php

namespace App\Http\Requests\FormationSystem;

trait ValidationMessages
{
    public function getValidationMessages(): array
    {
        return [
            'player_id.exists' => 'The player does not exist.',
            'player_id.unique' => 'Player already has a Formation System.',
        ];
    }
}
