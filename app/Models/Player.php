<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Player extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'behemoths_bp',
        'squadron_bp',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mk1(): HasOne
    {
        return $this->hasOne(Mk1::class);
    }

    public function mk2(): HasOne
    {
        return $this->hasOne(Mk2::class);
    }

    public function formationSystem(): HasOne
    {
        return $this->hasOne(FormationSystem::class);
    }
}
