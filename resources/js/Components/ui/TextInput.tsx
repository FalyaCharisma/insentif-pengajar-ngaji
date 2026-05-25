import React from "react";

type Props =
    React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({
    className = "",
    ...props
}: Props) {
    return (
        <input
            {...props}
            className={`
                w-full rounded-xl border
                px-4 py-3 text-sm
                outline-none transition

                disabled:bg-slate-100
                disabled:cursor-not-allowed

                ${className}
            `}
        />
    );
}