import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import { SearchX } from "lucide-react";
import { useState } from "react";

type Props = {
    columns: any;
    data: any;
};

export default function DataTable({
    columns,
    data,
}: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,

        state: {
            sorting,
        },

        onSortingChange: setSorting,

        getCoreRowModel: getCoreRowModel(),

        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div
            className="
                bg-white
                border border-slate-200
                rounded-2xl
                shadow-sm
                overflow-hidden
            "
        >
            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                    {/* HEADER */}
                    <thead className="bg-slate-50 border-b border-slate-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="
                                            px-4
                                            py-3
                                            text-left
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wide
                                            text-slate-500
                                            whitespace-nowrap
                                        "
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="
                                        border-b border-slate-100
                                        hover:bg-slate-50/70
                                        transition-colors
                                    "
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="
                                                px-4
                                                py-3
                                                text-sm
                                                text-slate-700
                                                whitespace-nowrap
                                            "
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-12 px-4"
                                >
                                    <div className="flex flex-col items-center justify-center text-center">
                                        {/* ICON */}
                                        <div
                                            className="
                                                w-14 h-14
                                                rounded-full
                                                bg-slate-100
                                                flex items-center justify-center
                                                mb-3
                                            "
                                        >
                                            <SearchX className="w-6 h-6 text-slate-400" />
                                        </div>

                                        {/* TITLE */}
                                        <h3 className="text-sm font-semibold text-slate-700">
                                            Data tidak ditemukan
                                        </h3>

                                        {/* SUBTITLE */}
                                        <p className="text-xs text-slate-500 mt-1">
                                            Coba ubah pencarian atau filter
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}