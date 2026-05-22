type Props = {
    label: string;
    value: string | number;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    placeholder?: string;
    error?: string;

    type?: string;
    required?: boolean;
    disabled?: boolean;
};

export default function FormField({
    label,
    value,
    onChange,
    placeholder,
    error,
    type = "text",
    required = false,
    disabled = false,
}: Props) {

    return (
        <div>

            {/* Label */}
            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            {/* Input */}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                    w-full rounded-xl border px-4 py-3 text-sm

                    ${
                        error
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-200 focus:border-indigo-500"
                    }

                    ${
                        disabled
                            ? "bg-slate-100 cursor-not-allowed"
                            : "bg-white"
                    }
                `}
            />

            {/* Error */}
            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}