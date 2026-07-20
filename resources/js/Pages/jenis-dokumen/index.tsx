import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/layouts/app-layout";
import { columns } from "./columns";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/Pagination";
import { useQueryParams } from "@/hooks/use-query-params";
import TableToolbar from "@/Components/TableToolbar";
import PageHeader from "@/Components/PageHeader";
import { useState, useEffect } from "react";
import FormModal from "./form-modal";
import { deleteConfirm, successAlert } from "@/lib/alert";

type Props = {
    jenisDokumen: any;
    filters: any;
};

export default function Index({
    jenisDokumen,
    filters,
}: Props) {

    const { setParams } = useQueryParams(
        route("jenis-dokumen.index"),
        filters,
    );

    const [open, setOpen] = useState(false);

    const [selectedJenisDokumen, setSelectedJenisDokumen] = useState(null);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <>
            <Head title="Jenis Dokumen" />

            <AdminLayout>
                <div className="space-y-5 w-full overflow-hidden">

                    {/* Header */}
                    <PageHeader
                        title="Jenis Dokumen"
                        subtitle="Kelola data jenis dokumen"
                    />

                    {/* Toolbar */}
                    <div className="w-full overflow-hidden">
                        <TableToolbar
                            filters={filters}
                            setParams={setParams}
                            searchPlaceholder="Cari jenis dokumen..."
                            addButtonLabel="Tambah Jenis Dokumen"
                            onAdd={() => setOpen(true)}
                            sortOptions={[
                                {
                                    label: "Terbaru",
                                    value: "id",
                                },
                                {
                                    label: "Nama",
                                    value: "nama",
                                },
                                {
                                    label: "Tanggal",
                                    value: "created_at",
                                },
                            ]}
                        />
                    </div>

                    {/* Table */}
                    <div
                        className="
                            overflow-x-auto
                            rounded-2xl
                            border border-slate-200
                        "
                    >
                        <DataTable
                            columns={columns(

                                // Edit
                                (jenisDokumen) => {
                                    setSelectedJenisDokumen(jenisDokumen);
                                    setOpen(true);
                                },

                                // Delete
                                (jenisDokumen) => {
                                    deleteConfirm(
                                        `Jenis Dokumen "${jenisDokumen.nama}" akan dihapus`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route(
                                                    "jenis-dokumen.destroy",
                                                    jenisDokumen.id,
                                                ),
                                            );
                                        }
                                    });
                                },
                            )}
                            data={jenisDokumen.data}
                        />
                    </div>

                    {/* Pagination */}
                    <div className="overflow-x-auto">
                        <Pagination links={jenisDokumen.links} />
                    </div>

                    {/* Modal */}
                    <FormModal
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setSelectedJenisDokumen(null);
                        }}
                        jenisDokumen={selectedJenisDokumen}
                    />
                </div>
            </AdminLayout>
        </>
    );
}