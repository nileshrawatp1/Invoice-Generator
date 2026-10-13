import { useFormContext, type RegisterOptions, type Path } from "react-hook-form";
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
    const { register, formState: { errors } } = useFormContext<CustomerFormData>();
    const fieldError = errors[fieldName];

    return (
        <div className={className}>
            <label>{label}</label>
            <div className={wrapClassName ? wrapClassName : undefined}>
                <input
                    type={inputType}
                    {...register(fieldName, validation)}
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
