import React from "react";

import InputError from "../ui/InputError";
import InputLabel from "../ui/InputLabel";
import SelectInput from "../ui/SelectInput";

type Props = {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function FormSelect({
    label,
    error,
    required = false,
    className = "",
    children,
    ...props
}: Props) {
    return (
        <div>
            <InputLabel
                label={label}
                required={required}
            />

            <SelectInput
                {...props}
                className={`
                    ${
                        error
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-200 focus:border-indigo-500"
                    }

                    ${className}
                `}
            >
                {children}
            </SelectInput>

            <InputError message={error} />
        </div>
    );
}