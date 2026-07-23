import { Pencil, Trash2 } from "lucide-react";

export const columns = (
    role: string,
    onDetail: (row: any) => void,
    onEdit: (row: any) => void,
    onToggleStatus: (row: any) => void,
    onDelete: (row: any) => void,
) => [
    {
        id: "no",
        header: () => <div className="w-full text-center">No</div>,
        cell: ({ row }: any) => (
            <div className="text-center">{row.index + 1}</div>
        ),
    },

    {
        accessorKey: "nik",
        header: "NIK",
    },

    {
        accessorKey: "nama",
        header: "Nama Pengajar",
    },

    {
        accessorKey: "lembaga.nama",
        header: "Lembaga",
        cell: ({ row }: any) => (
            row.original.lembaga?.nama ?? "-"
        ),
    },

    {
        accessorKey: "jabatan",
        header: "Jabatan",
    },

    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }: any) => (
            <div className="flex justify-center">
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        row.original.status === "aktif"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {row.original.status === "aktif" ? "Aktif" : "Nonaktif"}
                </span>
            </div>
        ),
    },

    {
    id: "aksi",
    header: () => <div className="w-full text-center">Aksi</div>,
    cell: ({ row }: any) => {
        const pengajar = row.original;

        const canViewDetail = ["superadmin", "forum", "dindik"].includes(role);
        const canManage = ["superadmin", "lembaga"].includes(role);
        const canDelete = ["superadmin"].includes(role);


        return (
            <div className="flex justify-center gap-2">
                {/* Detail */}
                {canViewDetail && (
                    <button
                        onClick={() => onDetail(pengajar)}
                        className="
                            flex items-center gap-1
                            rounded-lg
                            bg-sky-600
                            px-3 py-1.5
                            text-xs text-white
                            hover:bg-sky-700
                            transition
                        "
                    >
                        Detail
                    </button>
                )}

                {/* Kelola */}
                {canManage && (
                    <>
                        <button
                            onClick={() => onEdit(pengajar)}
                            className="
                                flex items-center gap-1
                                rounded-lg
                                bg-amber-500
                                px-3 py-1.5
                                text-xs text-white
                                hover:bg-amber-600
                                transition
                            "
                        >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                        </button>

                        <button
                            onClick={() => onToggleStatus(pengajar)}
                            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-white transition ${
                                pengajar.status === "aktif"
                                    ? "bg-slate-600 hover:bg-slate-700"
                                    : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                        >
                            {pengajar.status === "aktif"
                                ? "Nonaktifkan"
                                : "Aktifkan"}
                        </button>
                    </>
                )}

                {canDelete && (
                    <button
                        onClick={() => onDelete(pengajar)}
                        className="
                            flex items-center gap-1
                            rounded-lg
                            bg-red-600
                            px-3 py-1.5
                            text-xs text-white
                            hover:bg-red-700
                            transition
                        "
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                    </button>
                )}
            </div>
        );
    },
},
];
