<?php

namespace App\Http\Requests\Hero;

use App\Http\Requests\Hero\ValidationRules;
use App\Http\Requests\Hero\ValidationMessages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    use ValidationRules, ValidationMessages;

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
        $rules = $this->getValidationRules();

        $rules['march'][] = Rule::unique('heroes')
            ->where(function ($query) {
                return $query
                    ->where('player_id', $this->input('player_id'))
                    ->where('troop_type', $this->input('troop_type'));
            });

        return $rules;
    }

    /**
     * Define custom validation messages.
     */
    public function messages(): array
    {
        return $this->getValidationMessages();
    }
}
