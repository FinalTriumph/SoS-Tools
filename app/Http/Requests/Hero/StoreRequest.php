<?php

namespace App\Http\Requests\Hero;

use App\Http\Requests\Hero\ValidationRules;
use App\Http\Requests\Hero\ValidationMessages;

use Illuminate\Foundation\Http\FormRequest;

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
        return $this->getValidationRules();
    }

    /**
     * Define custom validation messages.
     */
    public function messages(): array
    {
        return $this->getValidationMessages();
    }
}
