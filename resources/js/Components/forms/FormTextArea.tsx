import React from "react";

import InputError from "../ui/InputError";
import InputLabel from "../ui/InputLabel";
import TextareaInput from "../ui/TextAreaInput";


type Props = {
    label: string;
    error?: string;
    required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FormTextarea({
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

            <TextareaInput
                {...props}
                className={`
                    ${
                        error
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-200 focus:border-indigo-500"
                    }

                    ${className}
                `}
            />

            <InputError message={error} />
        </div>
    );
}