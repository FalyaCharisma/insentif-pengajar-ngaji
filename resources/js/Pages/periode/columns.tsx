import { Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

export const columns = (
    onEdit: (periode: any) => void,
    onDelete: (periode: any) => void,
) => [
    {
        id: "no",
        header: () => (
            <div className="w-full text-center">
                No
            </div>
        ),

        cell: ({ row }: any) => (
            <div className="text-center">
                {row.index + 1}
            </div>
        ),
    },

    {
        accessorKey: "tahun",
        header: "Tahun Proposal",

        cell: ({ row }: any) => (
            <span className="font-medium">
                {row.original.tahun}
            </span>
        ),
    },

    {
        accessorKey: "mulai_upload",
        header: "Mulai Upload",

        cell: ({ row }: any) =>
            dayjs(row.original.mulai_upload).format(
                "DD MMMM YYYY HH:mm",
            ),
    },

    {
        accessorKey: "selesai_upload",
        header: "Selesai Upload",

        cell: ({ row }: any) =>
            dayjs(row.original.selesai_upload).format(
                "DD MMMM YYYY HH:mm",
            ),
    },

    {
        accessorKey: "status",
        header: () => (
            <div className="text-center">
                Status
            </div>
        ),

        cell: ({ row }: any) => {

            const status = row.original.status;

            return (
                <div className="flex justify-center">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            status
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                        }`}
                    >
                        {status ? "Aktif" : "Tidak Aktif"}
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

            const periode = row.original;

            return (
                <div className="flex items-center justify-center gap-2">

                    <button
                        onClick={() => onEdit(periode)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white transition hover:bg-amber-600"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(periode)}
                        className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white transition hover:bg-red-600"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                    </button>

                </div>
            );
        },
    },
];