import { useFormContext, type RegisterOptions, type Path, get } from "react-hook-form";
import type { CustomerFormData } from "../constants/FormTypes";

interface FormInputProps {
    fieldName: Path<CustomerFormData>,
    label: string,
    inputType?: string,
    className?: string,
    wrapClassName?: string,
    symbolClassName?: string,
    symbol?: string,
    placeholder?: string,
    validation?: RegisterOptions<CustomerFormData, Path<CustomerFormData>>
}

export default function FormInput({
    fieldName,
    label,
    inputType = "text",
    className = "col",
    wrapClassName,
    symbolClassName,
    symbol,
    placeholder,
    validation
}: FormInputProps) {
    const { register, getFieldState } = useFormContext<CustomerFormData>();
    const fieldError = getFieldState(fieldName).error;
    const mandateryValidation = {
        ...validation, setValueAs: (value: any) => (typeof value === 'string' ? value.trim() : value),
    };

    return (
        <div className={className}>
            <label htmlFor={fieldName}>{label}</label>
            <div className={wrapClassName ? wrapClassName : undefined}>
                <input
                    id={fieldName}
                    type={inputType}
                    {...register(fieldName, mandateryValidation)}
                    placeholder={placeholder}
                />
                <span className={symbolClassName ? symbolClassName : undefined}>{symbol}</span>
            </div>
            {fieldError && <p className="error">
                {String(fieldError.message || 'Field Is Required')}
            </p>}
        </div>
    )
}
