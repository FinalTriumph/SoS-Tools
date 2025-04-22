<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TempestArm extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'player_id',
        'troop_type',
        'type',
        'generation',
        'stats',
        'skill',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'stats' => 'array',
            'skill' => 'array',
        ];
    }

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function heroAsAttack(): BelongsTo
    {
        return $this->belongsTo(Hero::class, 'attack_tempest_arm_id');
    }

    public function heroAsDefense(): BelongsTo
    {
        return $this->belongsTo(Hero::class, 'defense_tempest_arm_id');
    }

    public function getHeroAttribute(): ?Hero
    {
        return $this->heroAsAttack ?? $this->heroAsDefense;
    }
}
