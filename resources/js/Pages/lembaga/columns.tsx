import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { Lembaga } from "@/types/lembaga";
import { FileText, Paperclip } from "lucide-react";

export const columns = (
    onEdit: (lembaga: Lembaga) => void,
    onDelete: (lembaga: Lembaga) => void
): ColumnDef<Lembaga>[] => [
    {
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
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
        accessorKey: "kecamatan",
        header: "Kecamatan",
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
        id: "dokumen",
        header: "Dokumen",
        cell: ({ row }) => {
            const lembaga = row.original;

            return (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <span>{lembaga.sk || "-"}</span>
                    </div>

                    {lembaga.file_pendukung && (
                        <a
                            href={`/storage/files/lembaga/${lembaga.file_pendukung}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex items-center gap-2
                                rounded-full border
                                px-3 py-1
                                text-xs
                                hover:bg-slate-50
                            "
                        >
                            <Paperclip className="h-3 w-3" />
                            File Pendukung
                        </a>
                    )}
                </div>
            );
        },
    },

    {
        id: "aksi",
        header: "Aksi",

        cell: ({ row }) => {
            const lembaga = row.original;

            return (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(lembaga)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(lembaga)}
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