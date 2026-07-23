import { Eye } from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Proposal } from "@/types/pengajuan-insentif";
import { router } from "@inertiajs/react";

interface Props {
    onDetail: (proposal: Proposal) => void;
}

export const columns = ({ onDetail }: Props) => [
    {
        accessorKey: "periode",
        header: "Periode",
        cell: ({ row }: any) => row.original.periode?.tahun ?? "-",
    },

    {
        accessorKey: "lembaga",
        header: "Lembaga",
        cell: ({ row }: any) => row.original.lembaga?.nama ?? "-",
    },

    {
        accessorKey: "jumlah_guru",
        header: "Kuota",
    },

    {
        accessorKey: "diajukan_count",
        header: "Diajukan",
    },

    {
        accessorKey: "pending_count",
        header: "Pending",
        cell: ({ row }: any) => (
            <span className="font-medium text-amber-600">
                {row.original.pending_count}
            </span>
        ),
    },

    {
        accessorKey: "verified_count",
        header: "Verified",
        cell: ({ row }: any) => (
            <span className="font-medium text-green-600">
                {row.original.verified_count}
            </span>
        ),
    },

    {
        accessorKey: "revision_count",
        header: "Revision",
        cell: ({ row }: any) => (
            <span className="font-medium text-red-600">
                {row.original.revision_count}
            </span>
        ),
    },

    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }: any) => (
            // <PrimaryButton
            //     onClick={() => onDetail(row.original)}
            //     className="flex items-center gap-2"
            // >
            //     <Eye size={16} />
            //     Detail
            // </PrimaryButton>
            <PrimaryButton
                onClick={() =>
                    router.visit(
                        route("pengajuan-insentif.usulan", row.original.id),
                    )
                }
                className="flex items-center gap-2"
            >
                <Eye size={16} />
                Daftar Usulan
            </PrimaryButton>
        ),
    },
];
