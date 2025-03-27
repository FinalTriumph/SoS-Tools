<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TempestArmUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            // General
            'player_id' => [
                'sometimes',
                'required',
                'integer',
                'exists:players,id',
            ],
            'troop_type' => [
                'sometimes',
                'required',
                'string',
                Rule::in(['infantry', 'riders', 'hunters']),
            ],
            'type' => [
                'sometimes',
                'required',
                'string',
                Rule::in(['attack', 'defense']),
            ],
            'generation' => [
                'sometimes',
                'required',
                'string',
                Rule::in(['g1', 'g2', 'g3', 's1']),
            ],
            // Stats
            'stats' => [
                'sometimes',
                'required',
                'array',
                'size:4',
            ],
            'stats.*.name' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],
            'stats.*.value' => [
                'sometimes',
                'nullable',
                'numeric',
                'min:0',
                'max:1000',
            ],
            'stats.*.is_percentage' => [
                'sometimes',
                'nullable',
                'boolean',
            ],
            'stats.*.color' => [
                'sometimes',
                'nullable',
                'string',
                Rule::in(['purple', 'gold', 'red']),
            ],
            // Skill
            'skill' => [
                'sometimes',
                'required',
                'array',
            ],
            'skill.name' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],
            'skill.level' => [
                'sometimes',
                'nullable',
                'integer',
                'min:1',
                'max:4',
            ],
            'skill.quality' => [
                'sometimes',
                'nullable',
                'string',
                Rule::in(['common', 'rare', 'ultra']),
            ],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
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

    /**
     * Define custom validation messages.
     */
    public function messages(): array
    {
        return [
            'player_id.required' => 'The player field is required.',
            'player_id.exists' => 'The player does not exist.',
        ];
    }
}
