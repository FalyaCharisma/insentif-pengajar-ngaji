import React from "react";

import InputError from "../ui/InputError";
import InputLabel from "../ui/InputLabel";

type Props = {
    label: string;
    error?: string;
    required?: boolean;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

export default function FormFile({
    label,
    error,
    required = false,
    onChange,
}: Props) {
    return (
        <div>
            <InputLabel
                label={label}
                required={required}
            />

            <input
                type="file"
                onChange={onChange}
                className="
                    w-full rounded-xl border border-slate-200
                    px-4 py-3 text-sm outline-none transition
                    focus:border-indigo-500
                "
            />

            <InputError message={error} />
        </div>
    );
}