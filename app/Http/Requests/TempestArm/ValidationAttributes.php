<?php

namespace App\Http\Requests\TempestArm;

trait ValidationAttributes
{
    public function getValidationAttributes(): array
    {
        return [
            'stats.*.name' => 'stat name',
            'stats.*.value' => 'stat value',
            'stats.*.is_percentage' => 'is percentage',
            'stats.*.color' => 'stat color',
            'skill.name' => 'skill name',
            'skill.level' => 'skill level',
            'skill.quality' => 'skill quality',
        ];
    }
}
