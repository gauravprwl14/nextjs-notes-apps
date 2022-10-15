import { ChangeEvent, FocusEvent } from "react";

type InputProps = {
    placeholder: string;
    label: string;
    className?: string;
    defaultValue?: string;
    error?: string;
    id?: string;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    disabled?: boolean;
    value?: string;
};

export const Input = ({
    placeholder,
    label,
    className,
    defaultValue,
    error,
    onBlur,
    id,
    onChange,
    type,
    disabled,
    value,
}: InputProps) => {
    return (
        <div className="w-full">
            <label className="flex flex-col label">
                {label}
                <input
                    className={`input placeholder:base focus:outline-none ${className}`}
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    id={id}
                    onChange={onChange}
                    disabled={disabled}
                    value={value}
                />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default Input