import React from "react";

type Props =
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextareaInput({
    className = "",
    ...props
}: Props) {
    return (
        <textarea
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