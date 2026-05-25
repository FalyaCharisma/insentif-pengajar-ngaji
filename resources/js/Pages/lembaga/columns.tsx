import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { Lembaga } from "@/types/lembaga";

export const columns = (
    onEdit: (lembaga: Lembaga) => void,
    onDelete: (lembaga: Lembaga) => void
): ColumnDef<Lembaga>[] => [
    {
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },

    {
        accessorKey: "nama",
        header: "Nama Lembaga",
    },

    {
        accessorKey: "kategori.nama",
        header: "Kategori",
    },

    {
        accessorKey: "kabkota",
        header: "Kab/Kota",
    },

    {
        accessorKey: "kecamatan",
        header: "Kecamatan",
    },

    {
        accessorKey: "jumlah_guru",
        header: "Guru",
    },

    {
        accessorKey: "jumlah_siswa",
        header: "Siswa",
    },

    {
        id: "aksi",
        header: "Aksi",

        cell: ({ row }) => {
            const lembaga = row.original;

            return (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(lembaga)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(lembaga)}
                        className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                    </button>
                </div>
            );
        },
    },
];