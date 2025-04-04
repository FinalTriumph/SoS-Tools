<?php

namespace App\Http\Requests\TempestArm;

use App\Http\Requests\TempestArm\ValidationRules;
use App\Http\Requests\TempestArm\ValidationMessages;
use App\Http\Requests\TempestArm\ValidationAttributes;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    use ValidationRules, ValidationMessages, ValidationAttributes;

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

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return $this->getValidationAttributes();
    }
}
