type Props = {
    label: string;
    required?: boolean;
};

export default function InputLabel({
    label,
    required = false,
}: Props) {
    return (
        <label className="mb-2 block text-sm font-medium text-slate-700">
            {label}

            {required && (
                <span className="ml-1 text-red-500">
                    *
                </span>
            )}
        </label>
    );
}