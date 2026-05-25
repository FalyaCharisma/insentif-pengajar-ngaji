import { ButtonHTMLAttributes } from "react";

type Props =
    ButtonHTMLAttributes<HTMLButtonElement>;

export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}: Props) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={`
                rounded-xl border border-slate-200
                px-5 py-2 text-sm text-slate-700
                transition hover:bg-slate-100

                disabled:cursor-not-allowed
                disabled:opacity-50

                ${className}
            `}
        >
            {children}
        </button>
    );
}