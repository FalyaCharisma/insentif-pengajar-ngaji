import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { PengajuanProposal } from "@/types/pengajuan-proposal";

export const columns = (
    onEdit: (proposal: PengajuanProposal) => void,
    onDelete: (proposal: PengajuanProposal) => void,
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
        id: "aksi",

        header: "Aksi",

        cell: ({ row }) => {
            const proposal = row.original;

            return (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(proposal)}
                        className="
                            flex items-center gap-1
                            rounded-lg bg-amber-500
                            px-3 py-1.5 text-xs text-white
                        "
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(proposal)}
                        className="
                            flex items-center gap-1
                            rounded-lg bg-red-500
                            px-3 py-1.5 text-xs text-white
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
