<?php

namespace App\Policies;

use App\Models\TempestArm;
use App\Models\User;
// use Illuminate\Auth\Access\HandlesAuthorization;

class TempestArmPolicy
{
    // use HandlesAuthorization;

    public function modify(User $user, TempestArm $tempestArm): bool
    {
        return $tempestArm->player->user->is($user);
    }
}
