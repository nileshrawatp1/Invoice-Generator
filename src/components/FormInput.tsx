import { useFormContext, type Path } from "react-hook-form";
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
}: FormInputProps) {
    const { register, getFieldState, formState } = useFormContext<CustomerFormData>();
    const fieldError = getFieldState(fieldName, formState).error;

    return (
        <div className={className}>
            <label htmlFor={fieldName}>{label}</label>
            <div className={wrapClassName ? wrapClassName : undefined}>
                <input
                    id={fieldName}
                    type={inputType}
                    {...register(
                        fieldName,
                        inputType === 'number' ? { valueAsNumber: true } : undefined
                    )}
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
