type Props = {
    label: string;

    value: string;

    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    placeholder?: string;

    error?: string;
};

export default function FormField({
    label,
    value,
    onChange,
    placeholder,
    error,
}: Props) {

    return (

        <div>

            {/* Label */}
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>

            {/* Input */}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    w-full rounded-xl border px-4 py-3 text-sm

                    ${
                        error
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-200 focus:border-indigo-500"
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