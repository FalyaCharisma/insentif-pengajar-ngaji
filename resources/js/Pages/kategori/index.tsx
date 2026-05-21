import AdminLayout from "@/layouts/app-layout";
import { columns } from "./columns";
import DataTable from "@/Components/data-table";
import Pagination from "@/Components/pagination";
import { useQueryParams } from "@/hooks/use-query-params";
import TableToolbar from "@/Components/table-toolbar";
import PageHeader from "@/Components/page-header";
import { useState, useEffect } from "react";
import FormModal from "./form-modal";
import { router } from "@inertiajs/react";
import { deleteConfirm } from "@/lib/alert";
import { usePage } from "@inertiajs/react";
import { successAlert } from "@/lib/alert";

type Props = {
    kategori: any;
    filters: any;
};

export default function Index({ kategori, filters }: Props) {
    const { setParams } = useQueryParams(route("kategori.index"), filters);

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
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <PageHeader title="Kategori" subtitle="Kelola data kategori" />
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

                {/* Table */}
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
                                        route("kategori.destroy", kategori.id),
                                    );
                                }
                            });
                        },
                    )}
                    data={kategori.data}
                />

                {/* Pagination */}
                <Pagination links={kategori.links} />
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
    );
}
