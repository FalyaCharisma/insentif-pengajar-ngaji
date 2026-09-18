import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";
import TableToolbar from "@/Components/TableToolbar";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/pagination";

import { columns } from "./columns";

import { useQueryParams } from "@/hooks/use-query-params";
import { deleteConfirm, successAlert } from "@/lib/alert";

type Props = {
    berita: any;
    filters: any;
};

export default function Index({ berita, filters }: Props) {
    const { setParams } = useQueryParams(
        route("berita.index"),
        filters,
    );

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <>
            <Head title="Berita" />

            <AdminLayout>
                <div className="w-full space-y-5 overflow-hidden">

                    <PageHeader
                        title="Berita"
                        subtitle="Kelola berita dan informasi lembaga"
                    />

                    <TableToolbar
                        filters={filters}
                        setParams={setParams}
                        searchPlaceholder="Cari berita..."
                        addButtonLabel="Tambah Berita"
                        onAdd={() => {
                            router.get(route("berita.create"));
                        }}
                        sortOptions={[
                            {
                                label: "Terbaru",
                                value: "created_at",
                            },
                            {
                                label: "Judul",
                                value: "judul",
                            },
                            {
                                label: "Tanggal Publikasi",
                                value: "published_at",
                            },
                        ]}
                    />

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <DataTable
                            columns={columns(
                                (data) => {
                                    router.get(
                                        route("berita.edit", data.id),
                                    );
                                },

                                (data) => {
                                    deleteConfirm(
                                        `Berita "${data.judul}" akan dihapus.`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route(
                                                    "berita.destroy",
                                                    data.id,
                                                ),
                                            );
                                        }
                                    });
                                },
                            )}
                            data={berita.data}
                        />
                    </div>

                    <Pagination links={berita.links} />

                </div>
            </AdminLayout>
        </>
    );
}