type Props = {
    htmlFor?: string;
    value: string;
    required?: boolean;
    className?: string;
};

export default function InputLabel({
    htmlFor,
    value,
    required = false,
    className = "",
}: Props) {
    return (
        <label
            htmlFor={htmlFor}
            className={`mb-2 block text-sm font-medium text-slate-700 ${className}`}
        >
            {value}

            {required && (
                <span className="ml-1 text-red-500">*</span>
            )}
        </label>
    );
}