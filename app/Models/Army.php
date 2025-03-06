<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Army extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'player_id',
        'plasma',
        'tier',
        't12_infantry',
        't12_rider',
        't12_hunter',
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }
}
