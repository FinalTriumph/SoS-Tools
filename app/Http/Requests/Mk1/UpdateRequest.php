<?php

namespace App\Http\Requests\Mk1;

use App\Http\Requests\Mk1\ValidationRules;
use App\Http\Requests\Mk1\ValidationMessages;

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
        $rules['player_id'][] = Rule::unique('mk1s', 'player_id')
            ->ignore($this->route('mk1')->id);
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
