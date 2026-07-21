import AsyncSelect from "react-select/async";

import InputError from "../ui/InputError";
import InputLabel from "../ui/InputLabel";

type Option = {
    label: string;
    value: string | number;
};

type Props = {
    label: string;
    value: any;

    error?: string;
    required?: boolean;
    placeholder?: string;

    disabled?: boolean;

    onChange: (value: any) => void;

    loadOptions: (
        inputValue: string,
    ) => Promise<Option[]>;
};

export default function FormSelect2({
    label,
    value,
    error,
    required = false,
    placeholder = "Pilih data...",
    disabled = false,
    onChange,
    loadOptions,
}: Props) {

    return (
        <div>

            <InputLabel
                label={label}
                required={required}
            />

            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}

                value={value}

                onChange={(opt: any) => onChange(opt)}

                placeholder={placeholder}

                isClearable

                isDisabled={disabled}

                classNames={{
                    control: ({ isFocused }) =>
                        `
                            !min-h-[46px]
                            !rounded-xl
                            !border
                            ${
                                isFocused
                                    ? "!border-indigo-500 !ring-4 !ring-indigo-100"
                                    : "!border-slate-200"
                            }
                            hover:!border-indigo-400
                            !shadow-sm
                        `,

                    menu: () =>
                        `
                            !rounded-xl
                            !overflow-hidden
                            !border
                            !border-slate-200
                            !shadow-xl
                        `,

                    option: ({
                        isFocused,
                        isSelected,
                    }) =>
                        `
                            !text-sm
                            ${
                                isSelected
                                    ? "!bg-indigo-600 !text-white"
                                    : isFocused
                                    ? "!bg-indigo-50"
                                    : ""
                            }
                        `,
                }}
            />

            <InputError message={error} />

        </div>
    );
}