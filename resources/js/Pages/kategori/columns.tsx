import { ColumnDef } from "@tanstack/react-table";

import { Kategori } from "@/types/kategori";

import { Pencil, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";

export const columns = (
    onEdit: (kategori: any) => void,
    onDelete: (kategori: any) => void
) => [

    {
        id: "no",

        header: "No",

        cell: ({ row }: any) => row.index + 1,
    },

    {
        accessorKey: "nama",

        header: "Nama Kategori",
    },

    {
        id: "aksi",

        header: "Aksi",

        cell: ({ row }: any) => {

            const kategori = row.original;

            return (

                <div className="flex items-center gap-2">

                    <button
                        onClick={() => onEdit(kategori)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(kategori)}
                        className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus
                    </button>

                </div>
            );
        },
    },
];
