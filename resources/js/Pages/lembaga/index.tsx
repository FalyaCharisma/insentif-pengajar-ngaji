import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";

import AdminLayout from "@/layouts/app-layout";
import DataTable from "@/Components/data-table";
import Pagination from "@/Components/pagination";
import TableToolbar from "@/Components/table-toolbar";
import PageHeader from "@/Components/page-header";

import { columns } from "./columns";

import { useQueryParams } from "@/hooks/use-query-params";
import { deleteConfirm, successAlert } from "@/lib/alert";
import { Lembaga } from "@/types/lembaga";
import FormModal from "./form-modal";

type Props = {
    lembaga: any;
    filters: any;
    kategori: any;
};

export default function Index({ lembaga, filters, kategori }: Props) {

    const { setParams } = useQueryParams(
        route("lembaga.index"),
        filters,
    );

    const [open, setOpen] = useState(false);
    const [selectedLembaga, setSelectedLembaga] = useState<Lembaga | null>(null);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <AdminLayout>
            <div className="space-y-5 w-full overflow-hidden">

                {/* Header */}
                <PageHeader
                    title="Lembaga"
                    subtitle="Kelola data lembaga"
                />

                {/* Toolbar */}
                <div className="w-full overflow-hidden">
                    <TableToolbar
                        filters={filters}
                        setParams={setParams}
                        searchPlaceholder="Cari lembaga..."
                        addButtonLabel="Tambah Lembaga"
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
                                label: "Jumlah Guru",
                                value: "jumlah_guru",
                            },

                            {
                                label: "Jumlah Siswa",
                                value: "jumlah_siswa",
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
                            (lembaga) => {
                                setSelectedLembaga(lembaga);
                                setOpen(true);
                            },

                            (lembaga) => {
                                deleteConfirm(
                                    `Lembaga "${lembaga.nama}" akan dihapus`,
                                ).then((result) => {
                                    if (result.isConfirmed) {
                                        router.delete(
                                            route(
                                                "lembaga.destroy",
                                                lembaga.id,
                                            ),
                                        );
                                    }
                                });
                            },
                        )}
                        data={lembaga.data}
                    />
                </div>

                {/* Pagination */}
                <div className="overflow-x-auto">
                    <Pagination links={lembaga.links} />
                </div>

                {/* Modal */}
               <FormModal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setSelectedLembaga(null);
                    }}
                    lembaga={selectedLembaga}
                    kategori={kategori}
                />
            </div>
        </AdminLayout>
    );
}