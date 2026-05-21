import { Pencil, Trash2 } from "lucide-react";

export const columns = (
    onEdit: (forum: any) => void,
    onDelete: (forum: any) => void
) => [

    {
        id: "no",

        header: "No",

        cell: ({ row }: any) => row.index + 1,
    },
    {
        accessorKey: "nik",

        header: "NIK",
    },
    {
        accessorKey: "nama",

        header: "Nama Forum",
    },

    {
        accessorKey: "kategori.nama",

        header: "Kategori",
    },
    {
        id: "aksi",

        header: "Aksi",

        cell: ({ row }: any) => {

            const forum = row.original;

            return (

                <div className="flex items-center gap-2">

                    <button
                        onClick={() => onEdit(forum)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(forum)}
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
