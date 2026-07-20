import Select from "react-select";

import InputError from "../ui/InputError";
import InputLabel from "../ui/InputLabel";

type Option = {
    label: string;
    value: string | number;
};

type Props = {
    label: string;
    value: any;
    options: Option[];

    error?: string;
    required?: boolean;
    placeholder?: string;

    disabled?: boolean;

    onChange: (value: any) => void;
};

export default function FormSelect2({
    label,
    value,
    options,
    error,
    required = false,
    placeholder = "Pilih data...",
    disabled = false,
    onChange,
}: Props) {

    return (
        <div>

            <InputLabel
                label={label}
                required={required}
            />

            <Select
                options={options}
                
                isDisabled={disabled}
                
                styles={{
                    control: (base, state) => ({
                        ...base,
                        minHeight: 44,
                        borderRadius: 8,
                        backgroundColor: state.isDisabled
                            ? "#f8fafc"
                            : "#ffffff",
                        cursor: state.isDisabled
                            ? "not-allowed"
                            : "pointer",
                    }),
                }}
                
                value={
                    options.find(
                        (opt) => opt.value == value,
                    ) || null
                }

                onChange={(opt: any) =>
                    onChange(opt?.value || "")
                }

                placeholder={placeholder}
                isClearable

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