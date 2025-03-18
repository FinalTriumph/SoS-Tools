<?php

namespace App\Utilities;

use Closure;

class PlayerQueryBuilder
{
    public static function getOrderBy(?string $rankBy): string
    {
        return match ($rankBy) {
            'behemoths_bp' => 'behemoths_bp DESC',
            'squadron_bp' => 'squadron_bp DESC',
            default => '(behemoths_bp + squadron_bp) DESC'
        };
    }
}
