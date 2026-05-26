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

    fileName?: string;

    currentFile?: string;
};

export default function FormFile({
    label,
    error,
    required = false,
    onChange,
    fileName,
    currentFile,
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
                    w-full rounded-xl border
                    border-slate-200 px-4 py-3
                    text-sm outline-none
                    transition focus:border-indigo-500
                "
            />

            {/* File dipilih */}
            {fileName && (
                <p className="mt-2 text-sm text-slate-600">
                    File dipilih:
                    <span className="ml-1 font-medium">
                        {fileName}
                    </span>
                </p>
            )}

            {/* File lama */}
            {!fileName && currentFile && (
                <div className="mt-2 text-sm">

                    <span className="text-slate-500">
                        File saat ini:
                    </span>

                    <a
                        href={`/storage/files/proposal/${currentFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            ml-2 text-indigo-600
                            hover:underline
                        "
                    >
                        {currentFile}
                    </a>
                </div>
            )}

            <InputError message={error} />
        </div>
    );
}