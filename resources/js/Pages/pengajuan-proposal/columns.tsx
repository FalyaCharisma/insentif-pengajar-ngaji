import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { verifyConfirm } from "@/lib/alert";

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
        accessorKey: "lembaga.nama",
        header: "Lembaga",
    },
    {
        accessorKey: "tahun",
        header: "Tahun",
    },
    {
        accessorKey: "jumlah_guru",
        header: "Guru",
    },
    {
        accessorKey: "jumlah_siswa",
        header: "Siswa",
    },
    {
        accessorKey: "bukti_dukung",
        header: "Bukti Dukung",
        cell: ({ row }) => {
            const file = row.original.bukti_dukung;

            if (!file) {
                return "-";
            }

            return (
                <a
                    href={`/storage/files/proposal/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        text-sm text-indigo-600
                        hover:underline
                    "
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

            return (
                <span
                    className={`
                    rounded-full px-3 py-1
                    text-xs font-medium

                    ${
                        status === "verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                    }
                `}
                >
                    {status === "verified" ? "Terverifikasi" : "Pending"}
                </span>
            );
        },
    },
    {
        id: "aksi",

        header: "Aksi",

        cell: ({ row }) => {
            const proposal = row.original;

            const verified = proposal.status === "verified";

            return (
                <div className="flex items-center gap-2">
                    {hasRole("pimpinan_lembaga") && !verified && (
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
                    {hasRole("superadmin") && !verified && (
                        <button
                            onClick={() =>
                                verifyConfirm(
                                    "Proposal ini akan diverifikasi",
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
                            className="
            flex items-center gap-1
            rounded-lg bg-green-600
            px-3 py-1.5 text-xs text-white
        "
                        >
                            Verifikasi
                        </button>
                    )}

                    {hasRole("superadmin") && verified && (
                        <button
                            onClick={() => {
                                verifyConfirm(
                                    "Batalkan verifikasi proposal?",
                                ).then((result) => {
                                    if (result.isConfirmed) {
                                        router.patch(
                                            route(
                                                "pengajuan-proposal.unverify",
                                                proposal.id,
                                            ),
                                        );
                                    }
                                });
                            }}
                            className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                        >
                            Batalkan Verifikasi
                        </button>
                    )}
                </div>
            );
        },
    },
];
