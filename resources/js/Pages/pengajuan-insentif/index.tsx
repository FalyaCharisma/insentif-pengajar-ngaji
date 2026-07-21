import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";

import AdminLayout from "@/layouts/app-layout";

import DataTable from "@/Components/DataTable";
import PageHeader from "@/Components/PageHeader";
import Pagination from "@/Components/pagination";
import TableToolbar from "@/Components/TableToolbar";

import { useQueryParams } from "@/hooks/use-query-params";

import FormModal from "./form-modal";
import { columns } from "./columns";

import { IndexProps, Proposal } from "@/types/pengajuan-insentif";

export default function Index({
    pengajuanProposal,
    filters,
}: IndexProps) {
    const { auth } = usePage().props as any;

    const { setParams } = useQueryParams(
        route("pengajuan-insentif.index"),
        filters,
    );

    const isLembaga = auth.user.role === "lembaga";

    const [openModal, setOpenModal] = useState(false);
    const [selectedProposal, setSelectedProposal] =
        useState<Proposal | null>(null);

    const openDetail = async (proposal: Proposal) => {
        try {
            const { data } = await axios.get(
                route("pengajuan-insentif.show", proposal.id),
            );

            setSelectedProposal(data.proposal);
            setOpenModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Head title="Pengajuan Insentif" />

            <AdminLayout>
                <div className="space-y-5">
                    <PageHeader
                        title="Pengajuan Insentif"
                        subtitle={
                            isLembaga
                                ? "Daftar pengajuan insentif lembaga."
                                : "Monitoring pengajuan insentif."
                        }
                    />

                    <TableToolbar
                        filters={filters}
                        setParams={setParams}
                        searchPlaceholder="Cari lembaga atau periode..."
                        sortOptions={[
                            {
                                label: "Terbaru",
                                value: "id",
                            },
                            {
                                label: "Kuota",
                                value: "jumlah_guru",
                            },
                        ]}
                    />

                    <DataTable
                        columns={columns({
                            onDetail: openDetail,
                        })}
                        data={pengajuanProposal.data}
                    />

                    <Pagination links={pengajuanProposal.links} />

                    <FormModal
                        open={openModal}
                        proposal={selectedProposal}
                        onClose={() => {
                            setOpenModal(false);
                            setSelectedProposal(null);
                        }}
                    />
                </div>
            </AdminLayout>
        </>
    );
}