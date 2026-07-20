import {
    Eye,
    Pencil,
    Trash2,
    BadgeCheck,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type Props = {
    canEdit: boolean;
    canVerify: boolean;

    onPreview: (dokumen: any) => void;
    onEdit: (dokumen: any) => void;
    onDelete: (dokumen: any) => void;
    onVerifikasi: (dokumen: any) => void;
};

export default function columns({
    canEdit,
    canVerify,
    onPreview,
    onEdit,
    onDelete,
    onVerifikasi,
}: Props): ColumnDef<any>[] {
    return [
        {
            id: "no",
            header: "No",
            cell: ({ row }) => row.index + 1,
        },

        {
            accessorKey: "jenis_dokumen.nama",
            header: "Jenis Dokumen",
        },

        {
            accessorKey: "nama_file",
            header: "Nama File",
        },

        {
            accessorKey: "status_verifikasi",
            header: () => (
                <div className="text-center">
                    Status
                </div>
            ),
            cell: ({ row }) => {
                const status = row.original.status_verifikasi;
                const catatan = row.original.catatan_verifikasi;

                const color =
                    status === "disetujui"
                        ? "bg-green-100 text-green-700"
                        : status === "ditolak"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700";

                return (
                    <div className="flex flex-col items-center gap-2">
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${color}`}
                        >
                            {status}
                        </span>

                        {status === "ditolak" && catatan && (
                            <div className="mt-2 w-full max-w-[180px] rounded-lg border border-red-200 bg-red-50 p-2 text-center">
                                <p className="mb-1 text-[11px] font-semibold text-red-600">
                                    Alasan Penolakan
                                </p>

                                <p className="whitespace-normal break-words text-xs leading-5 text-slate-700">
                                    {catatan}
                                </p>
                            </div>
                        )}
                    </div>
                );
            },
        },

        {
            accessorKey: "created_at",
            header: "Tanggal Upload",
            cell: ({ row }) =>
                new Date(row.original.created_at).toLocaleDateString("id-ID"),
        },

        {
            id: "aksi",
            header: () => (
                <div className="text-center">
                    Aksi
                </div>
            ),

            cell: ({ row }) => {
                const dokumen = row.original;

                return (
                    <div className="flex flex-wrap justify-center items-center gap-2">

                        <button
                            onClick={() => onPreview(dokumen)}
                            className="flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs text-white hover:bg-sky-600"
                        >
                            <Eye className="h-3.5 w-3.5" />
                            Preview
                        </button>

                        {canEdit && (
                            <>
                                <button
                                    onClick={() => onEdit(dokumen)}
                                    className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white hover:bg-amber-600"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit
                                </button>

                                <button
                                    onClick={() => onDelete(dokumen)}
                                    className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Hapus
                                </button>
                            </>
                        )}

                        {canVerify && (
                            <button
                                onClick={() => onVerifikasi(dokumen)}
                                className="flex items-center gap-1 rounded-lg bg-green-500 px-3 py-1.5 text-xs text-white hover:bg-green-600"
                            >
                                <BadgeCheck className="h-3.5 w-3.5" />
                                Verifikasi
                            </button>
                        )}

                    </div>
                );
            },
        },
    ];
}