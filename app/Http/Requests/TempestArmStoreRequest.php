<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TempestArmStoreRequest extends FormRequest
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
                'required',
                'integer',
                'exists:players,id'
            ],
            'troop_type' => [
                'required',
                'string',
                Rule::in(['infantry', 'riders', 'hunters'])
            ],
            'type' => [
                'required',
                'string',
                Rule::in(['attack', 'defense'])
            ],
            'generation' => [
                'required',
                'string',
                Rule::in(['g1', 'g2', 'g3', 's1'])
            ],
            // Stats
            'stats' => [
                'nullable',
                'array',
                'max:4'
            ],
            'stats.*.name' => [
                'nullable',
                'string',
                'max:255'
            ],
            'stats.*.value' => [
                'nullable',
                'integer',
                'min:0',
                'max:1000'
            ],
            'stats.*.is_percentage' => [
                'nullable',
                'boolean'
            ],
            'stats.*.color' => [
                'nullable',
                'string',
                Rule::in(['purple', 'gold', 'red'])
            ],
            // Skill
            'skill' => [
                'nullable',
                'array'
            ],
            'skill.name' => [
                'nullable',
                'string',
                'max:255'
            ],
            'skill.level' => [
                'nullable',
                'integer',
                'min:1',
                'max:4'
            ],
            'skill.quality' => [
                'nullable',
                'string',
                Rule::in(['common', 'rare', 'ultra'])
            ],
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

