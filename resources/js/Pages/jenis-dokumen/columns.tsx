import { Pencil, Trash2 } from "lucide-react";

export const columns = (
    onEdit: (jenisDokumen: any) => void,
    onDelete: (jenisDokumen: any) => void
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
        accessorKey: "nama",
        header: "Nama Jenis Dokumen",
    },

    {
        accessorKey: "is_required",
        header: () => (
            <div className="w-full text-center">
                Status
            </div>
        ),
        cell: ({ row }: any) => {

            const jenisDokumen = row.original;

            return (
                <div className="flex justify-center">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            jenisDokumen.is_required
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                        }`}
                    >
                        {jenisDokumen.is_required
                            ? "Wajib"
                            : "Opsional"}
                    </span>
                </div>
            );
        },
    },

    {
        id: "aksi",
        header: () => (
            <div className="w-full text-center">
                Aksi
            </div>
        ),
        cell: ({ row }: any) => {

            const jenisDokumen = row.original;

            return (
                <div className="flex items-center justify-center gap-2 w-full">

                    <button
                        onClick={() => onEdit(jenisDokumen)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(jenisDokumen)}
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