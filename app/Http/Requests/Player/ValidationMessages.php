<?php

namespace App\Http\Requests\Player;

trait ValidationMessages
{
    public function getValidationMessages(): array
    {
        return [
            'username.unique' => 'The username already exists.',
        ];
    }
}
