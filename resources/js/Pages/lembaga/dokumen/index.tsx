import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";
import DataTable from "@/Components/DataTable";
import TableToolbar from "@/Components/TableToolbar";
import Pagination from "@/Components/Pagination";

import { useAuth } from "@/lib/auth";

import UploadModal from "./upload-modal";
import PreviewModal from "./preview-modal";
import VerifikasiModal from "./verifikasi-modal";
import columns from "./columns";

import { Lembaga } from "@/types/lembaga";
import { deleteConfirm, successAlert } from "@/lib/alert";

type Props = {
    lembaga: Lembaga;
    dokumen: any;
    filters: any;
    jenisDokumen: any[];
};

export default function Index({
    lembaga,
    dokumen,
    filters,
    jenisDokumen,
}: Props) {
    const { hasRole } = useAuth();

    const canUpload =
        hasRole("lembaga") ||
        hasRole("superadmin");

    const canVerify =
        hasRole("dindik") ||
        hasRole("superadmin");

    const [selected, setSelected] = useState<any>(null);

    const [openUpload, setOpenUpload] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [openVerifikasi, setOpenVerifikasi] = useState(false);

    return (
        <>
            <Head title="Dokumen Lembaga" />

            <AdminLayout>
                <div className="space-y-5 w-full overflow-hidden">

                    <PageHeader
                        title="Dokumen Lembaga"
                        subtitle="Kelola dokumen persyaratan lembaga"
                    />

                    <TableToolbar
                        filters={filters}
                        setParams={() => {}}
                        searchPlaceholder="Cari dokumen..."
                        addButtonLabel="Upload Dokumen"
                        onAdd={() => {
                            setSelected(null);
                            setOpenUpload(true);
                        }}
                    />

                    <div
                        className="
                            overflow-x-auto
                            rounded-2xl
                            border border-slate-200
                        "
                    >
                        <DataTable
                            columns={columns({
                                canEdit: canUpload,
                                canVerify,

                                onPreview: (row) => {
                                    setSelected(row);
                                    setOpenPreview(true);
                                },

                                onEdit: (row) => {
                                    setSelected(row);
                                    setOpenUpload(true); // pakai modal upload untuk ganti file
                                },

                                onDelete: (row) => {
                                    deleteConfirm(
                                        `Dokumen "${row.jenis_dokumen?.nama}" akan dihapus.`
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route("dokumen.destroy", row.id),
                                                {
                                                    preserveScroll: true,
                                                }
                                            );
                                        }
                                    });
                                },

                                onVerifikasi: (row) => {
                                    setSelected(row);
                                    setOpenVerifikasi(true);
                                },
                            })}
                            data={dokumen.data}
                        />
                    </div>

                    <Pagination links={dokumen.links} />

                    <div className="flex items-center justify-between pt-4">

                        <button
                            type="button"
                            onClick={() => router.visit(route("lembaga.profil.index", lembaga.id))}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
                        >
                            <ArrowLeft size={18} />
                            Kembali Ke Profil
                        </button>
                    </div>

                </div>
            </AdminLayout>

            <UploadModal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                lembaga={lembaga}
                jenisDokumen={jenisDokumen}
                item={selected}
            />

            <PreviewModal
                open={openPreview}
                onClose={() => setOpenPreview(false)}
                item={selected}
            />

            <VerifikasiModal
                open={openVerifikasi}
                onClose={() => setOpenVerifikasi(false)}
                item={selected}
            />
        </>
    );
}