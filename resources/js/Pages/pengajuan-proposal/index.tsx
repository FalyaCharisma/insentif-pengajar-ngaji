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

    lembaga: any[];

    filters: any;
};

export default function Index({
    pengajuanProposal,
    lembaga,
    filters,
}: Props) {

    const { hasRole } = useAuth();

    const { setParams } = useQueryParams(
        route("pengajuan-proposal.index"),
        filters,
    );

    const [open, setOpen] = useState(false);

    const [
        selectedProposal,
        setSelectedProposal,
    ] = useState<PengajuanProposal | null>(null);

    const pageProps: any = usePage().props;

    const flash = pageProps.flash || {};

    useEffect(() => {

        if (flash?.success) {
            successAlert(flash.success);
        }

    }, [flash]);

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

                    {/* TOOLBAR */}
                    <div className="w-full overflow-hidden">

                        <TableToolbar
                            filters={filters}

                            setParams={setParams}

                            searchPlaceholder="Cari proposal..."

                            addButtonLabel="Tambah Proposal"

                            onAdd={() => {

                                setSelectedProposal(null);

                                setOpen(true);
                            }}

                            sortOptions={[
                                {
                                    label: "Terbaru",
                                    value: "id",
                                },

                                {
                                    label: "Tahun",
                                    value: "tahun",
                                },

                                {
                                    label: "Jumlah Guru",
                                    value: "jumlah_guru",
                                },

                                {
                                    label: "Jumlah Siswa",
                                    value: "jumlah_siswa",
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
                                        `Proposal tahun ${row.tahun} akan dihapus`,
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
                            )}

                            data={pengajuanProposal.data}
                        />
                    </div>

                    {/* PAGINATION */}
                    <div className="overflow-x-auto">

                        <Pagination
                            links={pengajuanProposal.links}
                        />
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
                    />

                </div>
            </AdminLayout>
        </>
    );
}