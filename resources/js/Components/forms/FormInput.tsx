import React from "react";

import InputError from "../ui/InputError";
import InputLabel from "../ui/InputLabel";
import TextInput from "../ui/TextInput";

type Props = {
    label: string;
    error?: string;
    required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
    label,
    error,
    required = false,
    className = "",
    ...props
}: Props) {
    return (
        <div>
            <InputLabel
                label={label}
                required={required}
            />

            <TextInput
                {...props}
                className={`
                    ${
                        error
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-200 focus:border-indigo-500"
                    }
                `}
            />

            <InputError message={error} />
        </div>
    );
}