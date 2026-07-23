import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AdminLayout from "@/layouts/app-layout";

import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/pagination";
import TableToolbar from "@/Components/TableToolbar";
import PageHeader from "@/Components/PageHeader";

import { useQueryParams } from "@/hooks/use-query-params";

import { deleteConfirm, successAlert } from "@/lib/alert";

import { columns } from "./columns";
import FormModal from "./form-modal";
import { PengajuanProposal } from "@/types/pengajuan-proposal";
import { useAuth } from "@/lib/auth";

type Props = {
    pengajuanProposal: {
        data: PengajuanProposal[];
        links: any[];
    };

    periode: any;
    canCreateProposal: boolean;

    jumlahSiswa: number;

    estimasiKuota: number;

    lembaga: any;

    filters: any;
};

export default function Index({
    pengajuanProposal,
    lembaga,
    periode,
    canCreateProposal,
    jumlahSiswa,
    estimasiKuota,
    filters,
}: Props) {
    const { hasRole } = useAuth();

    const { setParams } = useQueryParams(
        route("pengajuan-proposal.index"),
        filters,
    );

    const [open, setOpen] = useState(false);

    const [selectedProposal, setSelectedProposal] =
        useState<PengajuanProposal | null>(null);

    const pageProps: any = usePage().props;

    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    const formatDate = (date?: string) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <>
            <Head title="Pengajuan Proposal" />

            <AdminLayout>
                <div className="space-y-5 w-full overflow-hidden">
                    {/* HEADER */}
                    <PageHeader
                        title="Pengajuan Proposal"
                        subtitle="Kelola data pengajuan proposal"
                    />

                    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                <svg
                                    className="h-5 w-5 text-sky-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-sky-800">
                                    Informasi Pengajuan Proposal
                                </h3>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-700">
                                    <li>
                                        Pengajuan proposal hanya dapat dilakukan
                                        pada periode pengajuan yang sedang
                                        aktif.
                                    </li>
                                    <li>
                                        Periode pengajuan:
                                        <strong>
                                            {" "}
                                            {periode
                                                ? `${formatDate(periode.mulai_upload)} s.d. ${formatDate(periode.selesai_upload)}`
                                                : "Saat ini belum dibuka"}
                                        </strong>
                                    </li>

                                    <li>
                                        Setelah proposal diajukan, proposal akan
                                        diverifikasi oleh Forum sebelum lembaga
                                        dapat mengajukan calon penerima
                                        insentif.
                                    </li>

                                    <li>
                                        Hanya proposal yang telah berstatus
                                        <strong> Terverifikasi</strong> yang
                                        dapat digunakan untuk mengajukan
                                        penerima insentif.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* TOOLBAR */}
                    <div className="w-full overflow-hidden">
                        <TableToolbar
                            filters={filters}
                            setParams={setParams}
                            searchPlaceholder="Cari proposal..."
                            addButtonLabel={
                                hasRole("lembaga") && canCreateProposal
                                    ? "Tambah Proposal"
                                    : undefined
                            }
                            onAdd={
                                hasRole("lembaga") && canCreateProposal
                                    ? () => {
                                          setSelectedProposal(null);
                                          setOpen(true);
                                      }
                                    : undefined
                            }
                            sortOptions={[
                                {
                                    label: "Terbaru",
                                    value: "id",
                                },
                                {
                                    label: "Status",
                                    value: "status",
                                },
                            ]}
                        />
                    </div>

                    {/* TABLE */}
                    <div
                        className="
                            overflow-x-auto rounded-2xl
                            border border-slate-200
                        "
                    >
                        <DataTable
                            columns={columns(
                                (row) => {
                                    setSelectedProposal(row);

                                    setOpen(true);
                                },

                                (row) => {
                                    deleteConfirm(
                                        `Proposal periode ${row.periode?.tahun} akan dihapus`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route(
                                                    "pengajuan-proposal.destroy",
                                                    row.id,
                                                ),
                                            );
                                        }
                                    });
                                },

                                hasRole,
                            )}
                            data={pengajuanProposal.data}
                        />
                    </div>

                    {/* PAGINATION */}
                    <div className="overflow-x-auto">
                        <Pagination links={pengajuanProposal.links} />
                    </div>

                    {/* MODAL */}
                    <FormModal
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setSelectedProposal(null);
                        }}
                        proposal={selectedProposal}
                        lembaga={lembaga}
                        periode={periode}
                        jumlahSiswa={jumlahSiswa}
                        estimasiKuota={estimasiKuota}
                    />
                </div>
            </AdminLayout>
        </>
    );
}
