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

export default function DataTable({ columns, data }: Props) {
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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-6 py-2 text-left text-sm font-semibold text-slate-700"
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

                <tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-slate-100 hover:bg-slate-50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-6 py-2 text-sm text-slate-700"
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
                            <td colSpan={columns.length} className="py-16">
                                <div className="flex flex-col items-center justify-center text-center">
                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                        <SearchX className="w-8 h-8 text-slate-400" />
                                    </div>
                                    {/* Title */}
                                    <h3 className="text-base font-semibold text-slate-700">
                                        Data tidak ditemukan
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-sm text-slate-500 mt-1">
                                        Coba ubah kata kunci pencarian atau
                                        filter
                                    </p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
