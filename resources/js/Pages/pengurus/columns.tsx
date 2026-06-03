import { Pencil, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";

export const columns = (
    onEdit: (pengurus: any) => void,
    onDelete: (pengurus: any) => void
) => [

    {
        id: "no",
        header: () => <div className="w-full text-center">No</div>,
        cell: ({ row }: any) => (
            <div className="text-center">
                {row.index + 1}
            </div>
        ),
    },

    {
        accessorKey: "nik",
        header: "NIK",
    },

    {
        accessorKey: "nama",
        header: "Nama",
    },

    {
        accessorKey: "jabatan",
        header: "Jabatan",
    },

    {
        accessorKey: "no_hp",
        header: "No HP",
    },

    {
        id: "aksi",
        header: () => <div className="w-full text-center">Aksi</div>,
        cell: ({ row }: any) => {

            const pengurus = row.original;

            return (
                <div className="flex items-center justify-center gap-2 w-full">

                    <button
                        onClick={() => onEdit(pengurus)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(pengurus)}
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