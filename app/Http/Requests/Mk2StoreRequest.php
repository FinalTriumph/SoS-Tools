<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class Mk2StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'player_id' => [
                'required',
                'integer',
                'exists:players,id',
                Rule::unique('mk2s', 'player_id'),
            ],
            'level' => [
                'nullable',
                'integer',
                'min:1',
                'max:200',
            ],
            'stars' => [
                'nullable',
                'integer',
                'min:1',
                'max:3',
            ],
            'color' => [
                'nullable',
                'string',
                Rule::in(['green', 'blue', 'purple', 'gold', 'red']),
            ],
            'skills' => [
                'nullable',
                'integer',
                'min:0',
                'max:50',
            ],
            'skill_1' => [
                'nullable',
                'integer',
                'min:1',
                'max:30',
            ],
            'skill_2' => [
                'nullable',
                'integer',
                'min:1',
                'max:30',
            ],
            'skill_3' => [
                'nullable',
                'integer',
                'min:1',
                'max:30',
            ],
            'skill_4' => [
                'nullable',
                'integer',
                'min:1',
                'max:30',
            ],
            'skill_5' => [
                'nullable',
                'integer',
                'min:1',
                'max:30',
            ],
        ];
    }

    /**
     * Define custom validation messages.
     */
    public function messages()
    {
        return [
            'player_id.exists' => 'The player does not exist.',
            'player_id.unique' => 'Player already has an Mk2.',
        ];
    }
}
