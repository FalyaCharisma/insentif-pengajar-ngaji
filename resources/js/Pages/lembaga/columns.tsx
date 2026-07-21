import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, User2, Building2 } from "lucide-react";
import { Lembaga } from "@/types/lembaga";
import { router } from "@inertiajs/react";

export const columns = (
    onEdit: (lembaga: Lembaga) => void,
    onDelete: (lembaga: Lembaga) => void,
    onDetailAkun: (lembaga: Lembaga) => void,
): ColumnDef<Lembaga>[] => [
    {
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },

    {
        accessorKey: "kode",
        header: "Kode Lembaga",
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
        id: "alamat",
        header: "Alamat",
        cell: ({ row }) => (
            <span className="line-clamp-2 max-w-xs">
                {row.original.profil?.alamat ?? "-"}
            </span>
        ),
    },

    {
        accessorKey: "status",
        header: () => (
            <div className="text-center">
                Status
            </div>
        ),
        cell: ({ row }) => {
            const status = row.original.user?.status;

            return (
                <div className="flex justify-center">
                    <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            status === "aktif"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {status === "aktif" ? "Aktif" : "Nonaktif"}
                    </span>
                </div>
            );
        },
    },

    {
        id: "aksi",
        header: () => (
            <div className="text-center">
                Aksi
            </div>
        ),

        cell: ({ row }) => {
            const lembaga = row.original;
            const user = lembaga.user;
            const profil = lembaga.profil;

            return (
                <div className="flex flex-wrap justify-center items-center gap-2">

                    <button
                        onClick={() => onDetailAkun(lembaga)}
                        className="flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs text-white hover:bg-sky-600"
                    >
                        <User2 className="h-3.5 w-3.5" />
                        Akun
                    </button>

                    <button
                        onClick={() =>
                            router.visit(
                                route(
                                    "lembaga.profil.index",
                                    lembaga.id
                                )
                            )
                        }
                        className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs text-white hover:bg-emerald-600"
                    >
                        <Building2 className="h-3.5 w-3.5" />
                        Profil
                    </button>

                    <button
                        onClick={() => onEdit(lembaga)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white hover:bg-amber-600"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(lembaga)}
                        className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                    </button>

                </div>
            );
        },
    },
];