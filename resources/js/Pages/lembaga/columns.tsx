import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, User2, Building2, MapPin  } from "lucide-react";
import { Lembaga } from "@/types/lembaga";
import { router } from "@inertiajs/react";
    
export const columns = (
    canEdit: boolean,
    canDelete: boolean,
    canViewAccount: boolean,
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
        id: "nama",
        header: "Nama Lembaga",
        cell: ({ row }) => (
            <div className="max-w-sm">
                <div className="font-medium">
                    {row.original.nama}
                </div>

                <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                    <MapPin size={14} className="mt-0.5 shrink-0" />

                    <div>
                        <div>{row.original.profil?.alamat ?? "-"}</div>
                        <div className="text-xs text-slate-400">
                            Kel. {row.original.profil?.kelurahan ?? "-"}, Kec.{" "}
                            {row.original.profil?.kecamatan ?? "-"}
                        </div>
                    </div>
                </div>
            </div>
        ),
    },

    {
        accessorKey: "kategori.nama",
        header: "Kategori",
    },

    {
        accessorKey: "status_verifikasi",
        header: () => (
            <div className="text-center">
                Status Verifikasi
            </div>
        ),
        cell: ({ row }) => {
            const status = row.original.profil?.status_verifikasi;

            const badge =
                status === "disetujui"
                    ? "bg-green-100 text-green-700"
                    : status === "ditolak"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700";

            const label =
                status === "disetujui"
                    ? "Disetujui"
                    : status === "ditolak"
                    ? "Ditolak"
                    : "Pending";

            return (
                <div className="flex justify-center">
                    <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badge}`}
                    >
                        {label}
                    </span>
                </div>
            );
        },
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

                    {canViewAccount && (
                        <button
                            onClick={() => onDetailAkun(lembaga)}
                            className="flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs text-white hover:bg-sky-600"
                        >
                            <User2 className="h-3.5 w-3.5" />
                            Akun
                        </button>
                    )}

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

                    {canEdit && (
                        <button
                            onClick={() => onEdit(lembaga)}
                            className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white hover:bg-amber-600"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                        </button>
                    )}

                    {canDelete && (
                        <button
                            onClick={() => onDelete(lembaga)}
                            className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600"
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