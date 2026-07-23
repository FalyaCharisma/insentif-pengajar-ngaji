import { ColumnDef } from "@tanstack/react-table";
import { Check, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";

import { deleteConfirm, inputConfirm, verifyConfirm } from "@/lib/alert";

import { PengajuanProposal } from "@/types/pengajuan-proposal";

export const columns = (
    onEdit: (proposal: PengajuanProposal) => void,
    onDelete: (proposal: PengajuanProposal) => void,
    hasRole: (role: string) => boolean,
): ColumnDef<PengajuanProposal>[] => [
    {
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },

    {
        header: "Lembaga",
        cell: ({ row }) => row.original.lembaga?.nama ?? "-",
    },

    {
        header: "Periode",
        cell: ({ row }) => row.original.periode?.tahun ?? "-",
    },

    {
        accessorKey: "jumlah_siswa",
        header: "Jumlah Siswa",
    },

    {
        accessorKey: "estimasi_kuota",
        header: "Estimasi Kuota",
    },

    {
        accessorKey: "jumlah_guru",
        header: "Guru Diajukan",
    },

    {
        accessorKey: "bukti_dukung",
        header: "Bukti Dukung",

        cell: ({ row }) => {
            const file = row.original.bukti_dukung;

            if (!file) return "-";

            return (
                <a
                    href={`/storage/files/proposal/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                >
                    Lihat File
                </a>
            );
        },
    },

    {
        accessorKey: "status",

        header: "Status",

        cell: ({ row }) => {
            const status = row.original.status;

            let className = "bg-amber-100 text-amber-700";

            let label = "Pending";

            if (status === "verified") {
                className = "bg-green-100 text-green-700";
                label = "Terverifikasi";
            }

            if (status === "revision") {
                className = "bg-red-100 text-red-700";
                label = "Revisi";
            }

            return (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${className}`}
                >
                    {label}
                </span>
            );
        },
    },

    {
        accessorKey: "catatan",

        header: "Catatan",

        cell: ({ row }) => row.original.catatan || "-",
    },

    {
        id: "aksi",

        header: "Aksi",

        cell: ({ row }) => {
            const proposal = row.original;

            return (
                <div className="flex flex-wrap items-center gap-2">
                    {hasRole("lembaga") && proposal.status !== "verified" && (
                        <>
                            <button
                                onClick={() => onEdit(proposal)}
                                className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(proposal)}
                                className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Hapus
                            </button>
                        </>
                    )}

                    {hasRole("forum") && proposal.status === "pending" && (
                        <>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        verifyConfirm(
                                            "Verifikasi Proposal",
                                            "Apakah proposal ini sudah sesuai dan akan diverifikasi?",
                                        ).then((result) => {
                                            if (result.isConfirmed) {
                                                router.patch(
                                                    route(
                                                        "pengajuan-proposal.verify",
                                                        proposal.id,
                                                    ),
                                                );
                                            }
                                        })
                                    }
                                    className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs text-white hover:bg-emerald-600"
                                >
                                    <Check className="h-3.5 w-3.5" />
                                    Verifikasi
                                </button>

                                <button
                                    onClick={async () => {
                                        const result = await inputConfirm(
                                            "Catatan Revisi",
                                            "Masukkan catatan revisi",
                                        );

                                        if (result.isConfirmed) {
                                            router.patch(
                                                route(
                                                    "pengajuan-proposal.unverify",
                                                    proposal.id,
                                                ),
                                                {
                                                    catatan: result.value,
                                                },
                                            );
                                        }
                                    }}
                                    className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                    Revisi
                                </button>
                            </div>
                        </>
                    )}
                </div>
            );
        },
    },
];
