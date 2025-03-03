<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PlayerStoreRequest extends FormRequest
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
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('players', 'username')->where('user_id', auth()->id()),
            ],
            'behemoths_bp' => [
                'required',
                'integer',
                'min:0',
                'max:1000',
            ],
            'squadron_bp' => [
                'required',
                'integer',
                'min:0',
                'max:1000',
            ],
        ];
    }

    /**
     * Define custom validation messages.
     */
    public function messages()
    {
        return [
            'username.unique' => 'The username has already been added.',
        ];
    }
}

