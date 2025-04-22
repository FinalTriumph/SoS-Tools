<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hero extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'player_id',
        'name',
        'generation',
        'troop_type',
        'type',
        'attack_defense_stats',
        'attack_tempest_arm_id',
        'defense_tempest_arm_id',
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function attackTempestArm(): BelongsTo
    {
        return $this->belongsTo(TempestArm::class, 'attack_tempest_arm_id');
    }

    public function defenseTempestArm(): BelongsTo
    {
        return $this->belongsTo(TempestArm::class, 'defense_tempest_arm_id');
    }
}
