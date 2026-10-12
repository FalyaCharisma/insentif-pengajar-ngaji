import type { InputHTMLAttributes, ReactNode } from "react";

type Props = {
    label: ReactNode;
    error?: string;
    required?: boolean;
    helperText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
    label,
    error,
    required,
    helperText,
    ...props
}: Props) {
    return (
        <label className="block">
            <span className="mb-1.5 flex items-center text-sm font-medium text-slate-700">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </span>

            <input
                {...props}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {helperText && (
                <small className="mt-1 block text-xs text-slate-500">
                    {helperText}
                </small>
            )}

            {error && (
                <span className="mt-1 block text-xs text-red-500">{error}</span>
            )}
        </label>
    );
}