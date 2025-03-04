<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormationSystem extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'player_id',
        'level',
        'skill_1',
        'skill_2',
        'skill_3',
        'skill_4',
        'skill_5',
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }
}
