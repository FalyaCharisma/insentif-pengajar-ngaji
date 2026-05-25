import React from "react";

type Props =
    React.SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectInput({
    className = "",
    children,
    ...props
}: Props) {
    return (
        <select
            {...props}
            className={`
                w-full rounded-xl border
                px-4 py-3 text-sm
                outline-none transition

                disabled:bg-slate-100
                disabled:cursor-not-allowed

                ${className}
            `}
        >
            {children}
        </select>
    );
}