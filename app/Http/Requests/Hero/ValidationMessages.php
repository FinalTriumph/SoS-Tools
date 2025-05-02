<?php

namespace App\Http\Requests\Hero;

trait ValidationMessages
{
    public function getValidationMessages(): array
    {
        return [
            'player_id.exists' => 'The player does not exist.',
            'attack_tempest_arm_id.unique' => 'The attack tempest arm has already been taken.',
            'defense_tempest_arm_id.unique' => 'The defense tempest arm has already been taken.',
        ];
    }
}
