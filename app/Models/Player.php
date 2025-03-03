<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
