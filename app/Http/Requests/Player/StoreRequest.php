<?php

namespace App\Http\Requests\Player;

use App\Http\Requests\Player\ValidationRules;
use App\Http\Requests\Player\ValidationMessages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
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
        $rules = $this->getValidationRules();
        $rules['username'][] = Rule::unique('players', 'username')
            ->where('user_id', auth()->id());
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
