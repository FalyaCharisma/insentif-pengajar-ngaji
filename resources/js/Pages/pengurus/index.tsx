import { Head } from "@inertiajs/react";
import AdminLayout from "@/layouts/app-layout";
import { columns } from "./columns";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/pagination";
import { useQueryParams } from "@/hooks/use-query-params";
import TableToolbar from "@/Components/TableToolbar";
import PageHeader from "@/Components/PageHeader";
import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { deleteConfirm, successAlert } from "@/lib/alert";

type Props = {
    pengurus: any;
    filters: any;
};

export default function Index({ pengurus, filters }: Props) {

    const { setParams } = useQueryParams(
        route("pengurus.index"),
        filters,
    );

    const [open, setOpen] = useState(false);
    const [selectedPengurus, setSelectedPengurus] = useState<any>(null);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <>
            <Head title="Data Pengurus" />
            <AdminLayout>
                <div className="space-y-5 w-full overflow-hidden">

                    {/* HEADER */}
                    <PageHeader
                        title="Pengurus"
                        subtitle="Kelola data pengurus"
                    />

                    {/* TOOLBAR */}
                    <div className="w-full overflow-hidden">
                        <TableToolbar
                            filters={filters}
                            setParams={setParams}
                            searchPlaceholder="Cari pengurus..."
                            addButtonLabel="Tambah Pengurus"
                            onAdd={() => {
                                router.visit(route("pengurus.create"));
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
                                    setSelectedPengurus(row); // EDIT MODE
                                    setOpen(true);
                                },

                                (row) => {
                                    deleteConfirm(
                                        `Pengurus "${row.nama}" akan dihapus`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route("pengurus.destroy", row.id),
                                            );
                                        }
                                    });
                                },
                            )}
                            data={pengurus?.data ?? []}
                        />
                    </div>

                    {/* PAGINATION */}
                    <div className="overflow-x-auto">
                        <Pagination links={pengurus?.links ?? []} />
                    </div>

                </div>
            </AdminLayout>
        </>
    );
}