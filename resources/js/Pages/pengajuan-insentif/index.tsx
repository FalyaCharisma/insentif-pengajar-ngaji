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

export default function Index({ pengajuanProposal, filters }: IndexProps) {
    const { auth } = usePage().props as any;

    const { setParams } = useQueryParams(
        route("pengajuan-insentif.index"),
        filters,
    );

    const isLembaga = auth.user.role === "lembaga";

    const [openModal, setOpenModal] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
        null,
    );

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
                                    Informasi Pengajuan Insentif
                                </h3>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-700">
                                    <li>
                                        Pengajuan penerima insentif hanya dapat
                                        dilakukan apabila
                                        <strong>
                                            {" "}
                                            proposal lembaga telah berstatus
                                            Terverifikasi
                                        </strong>
                                        .
                                    </li>

                                    <li>
                                        Proposal yang masih berstatus
                                        <strong>
                                            {" "}
                                            Menunggu Verifikasi
                                        </strong>{" "}
                                        atau
                                        <strong> Revisi</strong> belum dapat
                                        mengajukan penerima insentif.
                                    </li>

                                    <li>
                                        Pengajar yang diusulkan sebagai penerima
                                        insentif harus sesuai dengan kuota yang
                                        telah ditetapkan pada proposal.
                                    </li>

                                    <li>
                                        Setelah usulan disimpan, Forum akan
                                        melakukan verifikasi terhadap setiap
                                        pengajar yang diajukan sebelum
                                        ditetapkan sebagai penerima insentif.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

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
