<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PlayerUpdateRequest extends FormRequest
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
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('players', 'username')
                    ->where('user_id', auth()->id())
                    ->ignore($this->route('player')->id),
            ],
            'alliance' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],
            'behemoths_bp' => [
                'sometimes',
                'nullable',
                'integer',
                'min:0',
                'max:1000',
            ],
            'squadron_bp' => [
                'sometimes',
                'nullable',
                'integer',
                'min:0',
                'max:1000',
            ],
            'fa1_stars' => [
                'sometimes',
                'nullable',
                'integer',
                'min:0',
                'max:10',
            ],
        ];
    }

        /**
     * Define custom validation messages.
     */
    public function messages()
    {
        return [
            'username.unique' => 'The username already exists.',
        ];
    }
}
