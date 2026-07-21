import { Pencil, Trash2, User2 } from "lucide-react";

export const columns = (
    onEdit: (forum: any) => void,
    onDelete: (forum: any) => void,
    onDetailAkun: (forum: any) => void,
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
        accessorKey: "kode",
        header: "Kode Forum",
    },

    {
        accessorKey: "nama",
        header: "Nama Forum",
    },

    {
        accessorKey: "telepon",
        header: "Telepon",
        cell: ({ row }: any) =>
            row.original.telepon ?? "-",
    },

    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }: any) => (
            <div className="flex justify-center">
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                        row.original.status === "aktif"
                            ? "bg-green-100 text-green-700"
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
            const forum = row.original;

            return (
                <div className="flex items-center justify-center gap-2">

                    <button
                        onClick={() => onDetailAkun(forum)}
                        className="flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs text-white hover:bg-sky-600"
                    >
                        <User2 className="h-3.5 w-3.5" />
                        Akun
                    </button>

                    <button
                        onClick={() => onEdit(forum)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(forum)}
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