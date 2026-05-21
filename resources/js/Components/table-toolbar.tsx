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
};

export default function TableToolbar({
    filters,
    setParams,
    searchPlaceholder = "Cari data...",

    addButtonLabel = "Tambah Data",

    sortOptions = [],

    onAdd,
}: Props) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                {/* Search */}
                <input
                    type="text"
                    defaultValue={filters.search}
                    placeholder={searchPlaceholder}
                    className="w-72 px-4 py-2 rounded-xl border border-slate-200 text-sm"
                    onChange={(e) =>
                        setParams({
                            search: e.target.value,
                            page: 1,
                        })
                    }
                />

                {/* Per Page */}
                <select
                    defaultValue={filters.per_page}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-sm"
                    onChange={(e) =>
                        setParams({
                            per_page: Number(e.target.value),
                            page: 1,
                        })
                    }
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                {/* Sort */}
                <select
                    defaultValue={filters.sort}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-sm"
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
            </div>

            <button
                onClick={onAdd}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
            >
                + {addButtonLabel}
            </button>
        </div>
    );
}
