<?php

namespace App\Policies;

use App\Models\Hero;
use App\Models\User;
// use Illuminate\Auth\Access\HandlesAuthorization;

class HeroPolicy
{
    // use HandlesAuthorization;

    public function modify(User $user, Hero $hero): bool
    {
        return $hero->player->user->is($user);
    }
}
