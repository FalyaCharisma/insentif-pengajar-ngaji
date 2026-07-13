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
    periode: any;
    filters: any;
};

export default function Index({ periode, filters }: Props) {
    const { setParams } = useQueryParams(route("periode.index"), filters);

    const [open, setOpen] = useState(false);

    const [selectedPeriode, setSelectedPeriode] = useState<any>(null);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <>
            <Head title="Data Periode" />

            <AdminLayout>
                <div className="space-y-5 w-full overflow-hidden">
                    <PageHeader
                        title="Periode Upload Proposal"
                        subtitle="Kelola periode upload proposal guru non formal"
                    />

                    <div className="w-full overflow-hidden">
                        <TableToolbar
                            filters={filters}
                            setParams={setParams}
                            searchPlaceholder="Cari tahun proposal..."
                            addButtonLabel="Tambah Periode"
                            onAdd={() => {
                                setSelectedPeriode(null);
                                setOpen(true);
                            }}
                            sortOptions={[
                                {
                                    label: "Terbaru",
                                    value: "id",
                                },
                                {
                                    label: "Tahun",
                                    value: "tahun",
                                },
                                {
                                    label: "Mulai Upload",
                                    value: "mulai_upload",
                                },
                                {
                                    label: "Selesai Upload",
                                    value: "selesai_upload",
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
                                (periode) => {
                                    setSelectedPeriode(periode);

                                    setOpen(true);
                                },

                                (periode) => {
                                    deleteConfirm(
                                        `Periode tahun ${periode.tahun} akan dihapus.`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route(
                                                    "periode.destroy",
                                                    periode.id,
                                                ),
                                            );
                                        }
                                    });
                                },
                            )}
                            data={periode.data}
                        />
                    </div>

                    <Pagination links={periode.links} />

                    <FormModal
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setSelectedPeriode(null);
                        }}
                        periode={selectedPeriode}
                    />
                </div>
            </AdminLayout>
        </>
    );
}
