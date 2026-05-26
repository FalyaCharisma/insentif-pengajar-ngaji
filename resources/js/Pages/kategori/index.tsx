import { Head } from "@inertiajs/react";
import AdminLayout from "@/layouts/app-layout";
import { columns } from "./columns";
import DataTable from "@/Components/Datatable";
import Pagination from "@/Components/pagination";
import { useQueryParams } from "@/hooks/use-query-params";
import TableToolbar from "@/Components/TableToolbar";
import PageHeader from "@/Components/PageHeader";
import { useState, useEffect } from "react";
import FormModal from "./form-modal";
import { router, usePage } from "@inertiajs/react";
import { deleteConfirm, successAlert } from "@/lib/alert";

type Props = {
    kategori: any;
    filters: any;
};

export default function Index({ kategori, filters }: Props) {

    const { setParams } = useQueryParams(
        route("kategori.index"),
        filters,
    );

    const [open, setOpen] = useState(false);

    const [selectedKategori, setSelectedKategori] = useState(null);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <>
            <Head title="Data Kategori" />
            <AdminLayout>
                <div className="space-y-5 w-full overflow-hidden">

                    {/* Header */}
                    <PageHeader
                        title="Kategori"
                        subtitle="Kelola data kategori"
                    />

                    {/* Toolbar */}
                    <div className="w-full overflow-hidden">
                        <TableToolbar
                            filters={filters}
                            setParams={setParams}
                            searchPlaceholder="Cari kategori..."
                            addButtonLabel="Tambah Kategori"
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
                                (kategori) => {
                                    setSelectedKategori(kategori);
                                    setOpen(true);
                                },

                                (kategori) => {
                                    deleteConfirm(
                                        `Kategori "${kategori.nama}" akan dihapus`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route(
                                                    "kategori.destroy",
                                                    kategori.id,
                                                ),
                                            );
                                        }
                                    });
                                },
                            )}
                            data={kategori.data}
                        />
                    </div>

                    {/* Pagination */}
                    <div className="overflow-x-auto">
                        <Pagination links={kategori.links} />
                    </div>

                    {/* Modal */}
                    <FormModal
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setSelectedKategori(null);
                        }}
                        kategori={selectedKategori}
                    />
                </div>
            </AdminLayout>
        </>
    );
}