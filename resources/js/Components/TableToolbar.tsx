import { ReactNode } from "react";

type Props = {
    filters: any;

    setParams: (params: any) => void;

    searchPlaceholder?: string;

    addButtonLabel?: string;

    sortOptions?: {
        label: string;
        value: string;
    }[];

    onAdd?: () => void;

    hideAddButton?: boolean;
    hideSearch?: boolean;
    hideSort?: boolean;
    hidePerPage?: boolean;

    children?: React.ReactNode;
};

export default function TableToolbar({
    filters,
    setParams,

    searchPlaceholder = "Cari data...",

    addButtonLabel = "Tambah Data",

    sortOptions = [],

    onAdd,

    hideAddButton = false,
    hideSearch = false,
    hideSort = false,
    hidePerPage = false,

    children,
}: Props) {
    return (
        <div
            className="
                flex flex-col gap-3
                xl:flex-row xl:items-end xl:justify-between
            "
        >
            {/* LEFT */}
            <div
                className="
        flex flex-col gap-3
        md:flex-row md:flex-wrap md:items-center
    "
            >
                {!hideSearch && (
                    <input
                        type="text"
                        defaultValue={filters.search}
                        placeholder={searchPlaceholder}
                        className="
                w-full
                md:w-72
                h-11
                px-4
                rounded-2xl
                border border-slate-200
                bg-white
                text-sm
                outline-none
                transition
                focus:ring-2
                focus:ring-indigo-500
                focus:border-indigo-500
            "
                        onChange={(e) =>
                            setParams({
                                search: e.target.value,
                                page: 1,
                            })
                        }
                    />
                )}

                {!hidePerPage && (
                    <select
                        defaultValue={filters.per_page}
                        className="
                h-11
                rounded-2xl
                border border-slate-200
                px-4
                text-sm
            "
                        onChange={(e) =>
                            setParams({
                                per_page: Number(e.target.value),
                                page: 1,
                            })
                        }
                    >
                        <option value="10">10 Data</option>
                        <option value="25">25 Data</option>
                        <option value="50">50 Data</option>
                        <option value="100">100 Data</option>
                    </select>
                )}

                {!hideSort && sortOptions.length > 0 && (
                    <select
                        defaultValue={filters.sort}
                        className="
                h-11
                rounded-2xl
                border border-slate-200
                px-4
                text-sm
            "
                        onChange={(e) =>
                            setParams({
                                sort: e.target.value,
                                page: 1,
                            })
                        }
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}

                {children}
            </div>

            {/* RIGHT */}
            {!hideAddButton && (
                <button
                    onClick={onAdd}
                    className="
            w-full
            md:w-auto
            h-11
            px-5
            rounded-2xl
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            text-sm
            font-medium
            transition
            shadow-sm
        "
                >
                    + {addButtonLabel}
                </button>
            )}
        </div>
    );
}
