<?php

namespace App\Http\Requests\Shared;

trait BaseValidationRules
{
    abstract public function getValidationRules(): array;

    public function getValidationRulesWithSometimes(): array
    {
        $rules = $this->getValidationRules();

        return array_map(function ($rule) {
            return is_array($rule) ? array_merge(['sometimes'], $rule) : ['sometimes', $rule];
        }, $rules);
    }
}
