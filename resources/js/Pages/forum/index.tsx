import { Head } from "@inertiajs/react";
import AdminLayout from "@/layouts/app-layout";
import { columns } from "./columns";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/Pagination";
import { useQueryParams } from "@/hooks/use-query-params";
import TableToolbar from "@/Components/TableToolbar";
import PageHeader from "@/Components/PageHeader";
import { useState, useEffect } from "react";
import FormModal from "./form-modal";
import { router, usePage } from "@inertiajs/react";
import { deleteConfirm, successAlert } from "@/lib/alert";
import DetailAkunModal from "./detail-akun-modal";

type Props = {
    forum: any;
    kategori: any[];
    filters: any;
};

export default function Index({ forum, kategori, filters }: Props) {

    const { setParams } = useQueryParams(
        route("forum.index"),
        filters,
    );

    const [open, setOpen] = useState(false);
    const [selectedForum, setSelectedForum] = useState<any>(null);

    const [openDetailAkun, setOpenDetailAkun] = useState(false);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <> 
            <Head title="Data Forum" />
            <AdminLayout>
                <div className="space-y-5 w-full overflow-hidden">

                    {/* HEADER */}
                    <PageHeader
                        title="Forum"
                        subtitle="Kelola data forum"
                    />

                    {/* TOOLBAR */}
                    <div className="w-full overflow-hidden">
                        <TableToolbar
                            filters={filters}
                            setParams={setParams}
                            searchPlaceholder="Cari forum..."
                            addButtonLabel="Tambah Forum"
                            onAdd={() => {
                                setSelectedForum(null); // penting untuk mode create
                                setOpen(true);
                            }}
                            sortOptions={[
                                { label: "Terbaru", value: "id" },
                                { label: "Nama", value: "nama" },
                                { label: "Tanggal", value: "created_at" },
                            ]}
                        />
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <DataTable
                            columns={columns(
                                (row) => {
                                    setSelectedForum(row); // EDIT MODE
                                    setOpen(true);
                                },

                                (row) => {
                                    deleteConfirm(
                                        `Forum "${row.nama}" akan dihapus`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route("forum.destroy", row.id),
                                            );
                                        }
                                    });
                                },

                                // Detail Akun
                                (row) => {
                                    setSelectedForum(row);
                                    setOpenDetailAkun(true);
                                },
                            )}
                            data={forum.data}
                        />
                    </div>

                    {/* PAGINATION */}
                    <div className="overflow-x-auto">
                        <Pagination links={forum.links} />
                    </div>

                    {/* MODAL */}
                    <FormModal
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setSelectedForum(null);
                        }}
                        forum={selectedForum}
                    />

                    <DetailAkunModal
                        open={openDetailAkun}
                        onClose={() => {
                            setOpenDetailAkun(false);
                            setSelectedForum(null);
                        }}
                        forum={selectedForum}
                    />
                </div>
            </AdminLayout>
        </>
    );
}