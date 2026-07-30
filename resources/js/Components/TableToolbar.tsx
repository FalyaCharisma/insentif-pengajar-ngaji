import { Plus, Filter } from "lucide-react";

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
    
    hideFilterButton?: boolean;
    onFilter?: () => void;

    hasFilter?: boolean;
    activeFilterCount?: number;
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

    hideFilterButton = true,
    onFilter,

    hasFilter = false,
    activeFilterCount = 0,
    
}: Props) {
    return (
        <div
            className="
                flex flex-col gap-3
                xl:flex-row xl:items-end xl:justify-between
            "
        >
            {/* LEFT */}
            <div className="flex flex-wrap items-center gap-3">
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
            <div className="flex items-center gap-2">

                {!hideFilterButton && onFilter && (
                    <button
                        onClick={onFilter}
                        className={`
                            h-11
                            px-5
                            rounded-2xl
                            text-sm
                            font-medium
                            inline-flex
                            items-center
                            gap-2
                            transition
                            ${
                                hasFilter
                                    ? "bg-pink-600 text-white border border-pink-600 hover:bg-pink-700"
                                    : "border border-pink-500 text-pink-600 bg-pink-50 hover:bg-pink-100"
                            }
                        `}
                    >
                        <Filter size={18} />
                        Filter
                        {activeFilterCount > 0 && (
                            <span
                                className="
                                    ml-1
                                    rounded-full
                                    bg-white
                                    text-pink-600
                                    text-xs
                                    font-bold
                                    px-2
                                "
                            >
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                )}

                {!hideAddButton && onAdd && addButtonLabel && (
                    <button
                        onClick={onAdd}
                        className="
                            h-11
                            px-5
                            rounded-2xl
                            bg-indigo-600
                            hover:bg-indigo-700
                            text-white
                            text-sm
                            font-medium
                            inline-flex
                            items-center
                            gap-2
                            transition
                        "
                    >
                        <Plus size={18} />
                        {addButtonLabel}
                    </button>
                )}

            </div>

            
        </div>
    );
}
