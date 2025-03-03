<?php

namespace App\Policies;

use App\Models\Player;
use App\Models\User;
// use Illuminate\Auth\Access\HandlesAuthorization;

class PlayerPolicy
{
    // use HandlesAuthorization;

    public function modify(User $user, Player $player): bool
    {
        return $user->id === $player->user_id;
    }
}
