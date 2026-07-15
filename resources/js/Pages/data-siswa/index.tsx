import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AdminLayout from "@/layouts/app-layout";

import PageHeader from "@/Components/PageHeader";
import TableToolbar from "@/Components/TableToolbar";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/pagination";

import { columns } from "./columns";
import FormModal from "./form-modal";

import { useQueryParams } from "@/hooks/use-query-params";
import { deleteConfirm, successAlert } from "@/lib/alert";

type Props = {
    siswa: any;
    filters: any;
};

export default function Index({ siswa, filters }: Props) {
    const { setParams } = useQueryParams(route("data-siswa.index"), filters);

    const [open, setOpen] = useState(false);

    const [selectedDataSiswa, setSelectedDataSiswa] = useState<any>(null);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <>
            <Head title="Data Siswa" />

            <AdminLayout>
                <div className="space-y-5 w-full overflow-hidden">
                    <PageHeader
                        title="Data Siswa"
                        subtitle="Kelola data jumlah siswa setiap lembaga"
                    />

                    <div className="w-full overflow-hidden">
                        <TableToolbar
                            filters={filters}
                            setParams={setParams}
                            searchPlaceholder="Cari lembaga..."
                            addButtonLabel="Tambah Data"
                            onAdd={() => {
                                setSelectedDataSiswa(null);
                                setOpen(true);
                            }}
                            sortOptions={[
                                {
                                    label: "Terbaru",
                                    value: "id",
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

                    <div
                        className="
                            overflow-x-auto
                            rounded-2xl
                            border
                            border-slate-200
                        "
                    >
                        <DataTable
                            columns={columns(
                                (data) => {
                                    setSelectedDataSiswa(data);

                                    setOpen(true);
                                },

                                (data) => {
                                    deleteConfirm(
                                        `Data siswa "${data.lembaga.nama}" akan dihapus.`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route(
                                                    "data-siswa.destroy",
                                                    data.id,
                                                ),
                                            );
                                        }
                                    });
                                },
                            )}
                            data={siswa.data}
                        />
                    </div>

                    <Pagination links={siswa.links} />

                    <FormModal
                        open={open}
                        onClose={() => {
                            setOpen(false);

                            setSelectedDataSiswa(null);
                        }}
                        dataSiswa={selectedDataSiswa}
                    />
                </div>
            </AdminLayout>
        </>
    );
}
