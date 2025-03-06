<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ArmyUpdateRequest extends FormRequest
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
                'sometimes',
                'required',
                'integer',
                'exists:players,id',
                Rule::unique('armies', 'player_id')->ignore($this->route('army')->id),
            ],
            'plasma' => [
                'sometimes',
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            'tier' => [
                'sometimes',
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            't12_infantry' => [
                'sometimes',
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            't12_rider' => [
                'sometimes',
                'nullable',
                'integer',
                'min:1',
                'max:20',
            ],
            't12_hunter' => [
                'sometimes',
                'nullable',
                'integer',
                'min:1',
                'max:20',
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
            'player_id.unique' => 'Player already has an army.',
        ];
    }
}
