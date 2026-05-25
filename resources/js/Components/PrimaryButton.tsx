import { ButtonHTMLAttributes } from "react";

type Props =
    ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: Props) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`
                rounded-xl bg-indigo-600
                px-5 py-2 text-sm text-white
                transition hover:bg-indigo-700

                disabled:cursor-not-allowed
                disabled:opacity-50

                ${className}
            `}
        >
            {children}
        </button>
    );
}