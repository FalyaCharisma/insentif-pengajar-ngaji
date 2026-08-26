import { MasterKuota } from "@/types/master-kuota";
import { Pencil, Trash2 } from "lucide-react";

export const columns = (
    onEdit: (item: MasterKuota) => void,
    onDelete: (item: MasterKuota) => void,
) => [
    {
        id: "no",

        header: () => <div className="w-full text-center">No</div>,

        cell: ({ row }: any) => (
            <div className="text-center">{row.index + 1}</div>
        ),
    },

    {
        accessorKey: "periode",

        header: "Periode",

        cell: ({ row }: any) => row.original.periode?.tahun ?? "-",
    },

    {
        accessorKey: "forum",

        header: "Forum",

        cell: ({ row }: any) => row.original.forum?.nama ?? "-",
    },

    {
        accessorKey: "kategori",

        header: "Kategori",

        cell: ({ row }: any) => row.original.kategori?.nama ?? "-",
    },

    {
        accessorKey: "jumlah_kuota",

        header: () => <div className="w-full text-center">Jumlah Kuota</div>,

        cell: ({ row }: any) => (
            <div className="flex justify-center">
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {row.original.jumlah_kuota}
                </span>
            </div>
        ),
    },

    {
        accessorKey: "keterangan",

        header: "Keterangan",

        cell: ({ row }: any) => row.original.keterangan || "-",
    },

    {
        id: "aksi",

        header: () => <div className="w-full text-center">Aksi</div>,

        cell: ({ row }: any) => {
            const item: MasterKuota = row.original;

            return (
                <div className="flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white transition hover:bg-amber-600"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white transition hover:bg-red-600"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                    </button>
                </div>
            );
        },
    },
];
