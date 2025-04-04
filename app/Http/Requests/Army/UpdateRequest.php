<?php

namespace App\Http\Requests\Army;

use App\Http\Requests\Army\ValidationRules;
use App\Http\Requests\Army\ValidationMessages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    use ValidationRules, ValidationMessages;

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
        $rules = $this->getValidationRulesWithSometimes();
        $rules['player_id'][] = Rule::unique('armies', 'player_id')
            ->ignore($this->route('army')->id);
        return $rules;
    }

    /**
     * Define custom validation messages.
     */
    public function messages()
    {
        return $this->getValidationMessages();
    }
}
