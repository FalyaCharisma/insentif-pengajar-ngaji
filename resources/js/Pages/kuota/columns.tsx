import { Pencil, Trash2 } from "lucide-react";

export const columns = (
    onEdit: (kuota: any) => void,
    onDelete: (kuota: any) => void,
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
        cell: ({ row }: any) => row.original.periode?.tahun,
    },

    {
        accessorKey: "lembaga",
        header: "Lembaga",
        cell: ({ row }: any) => row.original.lembaga?.nama,
    },

    {
        accessorKey: "estimasi_kuota",
        header: () => <div className="w-full text-center">Estimasi</div>,

        cell: ({ row }: any) => (
            <div className="flex justify-center">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    {row.original.estimasi_kuota}
                </span>
            </div>
        ),
    },

    {
        accessorKey: "kuota_final",
        header: () => <div className="w-full text-center">Kuota Final</div>,

        cell: ({ row }: any) => (
            <div className="flex justify-center">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {row.original.kuota_final}
                </span>
            </div>
        ),
    },

    {
        accessorKey: "keterangan",
        header: "Keterangan",
        cell: ({ row }: any) => row.original.keterangan ?? "-",
    },

    {
        id: "aksi",

        header: () => <div className="w-full text-center">Aksi</div>,

        cell: ({ row }: any) => {
            const kuota = row.original;

            return (
                <div className="flex items-center justify-center gap-2 w-full">
                    <button
                        onClick={() => onEdit(kuota)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                    </button>

                    {/* <button
                        onClick={() => onDelete(kuota)}
                        className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus
                    </button> */}
                </div>
            );
        },
    },
];
