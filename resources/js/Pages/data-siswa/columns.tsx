import { Pencil, Trash2 } from "lucide-react";

export const columns = (
    onEdit: (dataSiswa: any) => void,
    onDelete: (dataSiswa: any) => void,
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

        cell: ({ row }: any) => <span>{row.original.periode?.tahun}</span>,
    },

    {
        accessorKey: "lembaga",
        header: "Lembaga",

        cell: ({ row }: any) => (
            <span>{row.original.lembaga?.nama}</span>
        ),
    },

    {
        accessorKey: "jumlah_siswa",
        header: () => <div className="text-center">Jumlah Siswa</div>,

        cell: ({ row }: any) => (
            <div className="text-center font-medium">
                {row.original.jumlah_siswa}
            </div>
        ),
    },

    {
        accessorKey: "estimasi_kuota",
        header: () => <div className="text-center">Estimasi Kuota</div>,

        cell: ({ row }: any) => (
            <div className="flex justify-center">
                <span
                    className="
                        rounded-full
                        bg-emerald-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-emerald-700
                    "
                >
                    {row.original.estimasi_kuota} Orang
                </span>
            </div>
        ),
    },

    {
        id: "aksi",

        header: () => <div className="w-full text-center">Aksi</div>,

        cell: ({ row }: any) => {
            const dataSiswa = row.original;

            return (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => onEdit(dataSiswa)}
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-lg
                            bg-amber-500
                            px-3
                            py-1.5
                            text-xs
                            text-white
                            transition
                            hover:bg-amber-600
                        "
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(dataSiswa)}
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-lg
                            bg-red-500
                            px-3
                            py-1.5
                            text-xs
                            text-white
                            transition
                            hover:bg-red-600
                        "
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                    </button>
                </div>
            );
        },
    },
];
