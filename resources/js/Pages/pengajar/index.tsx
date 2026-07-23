import { Head, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";

import AdminLayout from "@/layouts/app-layout";

import DataTable from "@/Components/DataTable";
import PageHeader from "@/Components/PageHeader";
import Pagination from "@/Components/Pagination";
import TableToolbar from "@/Components/TableToolbar";

import { useQueryParams } from "@/hooks/use-query-params";
import { deleteConfirm, successAlert, toggleStatusConfirm } from "@/lib/alert";

import { columns } from "./columns";

type Props = {
    pengajar: any;
    filters: any;
};

export default function Index({ pengajar, filters }: Props) {
    const { setParams } = useQueryParams(route("pengajar.index"), filters);

    const pageProps: any = usePage().props;

    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    const { auth } = usePage().props as any;
    const role = auth.user.role;
    const isForum = role === "forum";
    const isLembaga = role === "lembaga";
    const isDindik = role === "dindik";
    const isSuperadmin = role === "superadmin";


    return (
        <>
            <Head title="Data Pengajar" />

            <AdminLayout>
                <div className="space-y-5">
                    <PageHeader
                        title="Data Pengajar"
                        subtitle="Kelola data pengajar lembaga"
                    />

                    <TableToolbar
                        filters={filters}
                        setParams={setParams}
                        searchPlaceholder="Cari nama atau NIK..."
                        addButtonLabel="Tambah Pengajar"
                        hideAddButton={isForum}
                        onAdd={() => router.visit(route("pengajar.create"))}
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
                                label: "NIK",
                                value: "nik",
                            },
                            {
                                label: "Tanggal",
                                value: "created_at",
                            },
                        ]}
                    />

                    <DataTable
                        columns={columns(
                            role,

                            // Detail / Verifikasi
                            (row) => {
                                router.get(route("pengajar.show", row.id));
                            },

                            // Edit
                            (row) => {
                                router.get(route("pengajar.edit", row.id));
                            },

                            // Toggle Status
                            (row) => {
                                toggleStatusConfirm(row.status, row.nama).then((result) => {
                                    if (!result.isConfirmed) return;

                                    router.patch(route("pengajar.toggle-status", row.id));
                                });
                            },

                            // Hapus
                            (row) => {
                                deleteConfirm(
                                    `Pengajar "${row.nama}" akan dihapus.`,
                                ).then((result) => {
                                    if (!result.isConfirmed) return;

                                    router.delete(route("pengajar.destroy", row.id));
                                });
                            },
                        )}
                        data={pengajar.data}
                    />

                    <Pagination links={pengajar.links} />
                </div>
            </AdminLayout>
        </>
    );
}
