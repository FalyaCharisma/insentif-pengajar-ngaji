import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AdminLayout from "@/layouts/app-layout";

import PageHeader from "@/Components/PageHeader";
import Pagination from "@/Components/pagination";
import DataTable from "@/Components/DataTable";
import FormSelect2 from "@/Components/forms/FormSelect2";
import PrimaryButton from "@/Components/PrimaryButton";
import { useQueryParams } from "@/hooks/use-query-params";

import { columns } from "./columns";
import FormModal from "./form-modal";

import { deleteConfirm, successAlert, verifyConfirm } from "@/lib/alert";
import TableToolbar from "@/Components/TableToolbar";

type Props = {
    kuota: any;
    filters: any;
    periodes: any[];
};

export default function Index({ kuota, filters, periodes }: Props) {
    const { setParams } = useQueryParams(route("kuota.index"), filters);
    const [selectedKuota, setSelectedKuota] = useState<any>(null);

    const [open, setOpen] = useState(false);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    const generate = () => {
        verifyConfirm(
            "Generate Kuota",
            "Sistem akan membuat data kuota berdasarkan periode yang sedang aktif. Pastikan data jumlah siswa setiap lembaga sudah lengkap.",
            "Ya, Generate",
            "info",
        ).then((result) => {
            if (result.isConfirmed) {
                router.post(route("kuota.generate"));
            }
        });
    };

    return (
        <>
            <Head title="Kuota Pengusulan" />

            <AdminLayout>
                <div className="space-y-5">
                    <PageHeader
                        title="Kuota Pengusulan"
                        subtitle="Kelola kuota penerima insentif"
                    />
                    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                <svg
                                    className="h-5 w-5 text-sky-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-sky-800">
                                    Mekanisme Generate Kuota
                                </h3>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-700">
                                    <li>
                                        Generate kuota hanya dapat dilakukan
                                        satu kali pada setiap periode.
                                    </li>

                                    <li>
                                        Sistem akan mengambil seluruh data
                                        jumlah siswa yang telah diinput oleh
                                        setiap lembaga.
                                    </li>

                                    <li>
                                        Estimasi kuota dihitung secara otomatis
                                        berdasarkan jumlah siswa.
                                    </li>

                                    <li>
                                        Kuota Final akan diisi sama dengan
                                        Estimasi Kuota sebagai nilai awal.
                                    </li>

                                    <li>
                                        Admin Dinas Pendidikan dapat mengubah
                                        Kuota Final sesuai hasil kebijakan.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <TableToolbar
                            filters={filters}
                            setParams={setParams}
                            searchPlaceholder="Cari lembaga..."
                            hideAddButton
                            sortOptions={[
                                {
                                    label: "Terbaru",
                                    value: "id",
                                },
                            ]}
                        ></TableToolbar>
                        <PrimaryButton
                            onClick={generate}
                            className="h-11 min-w-[180px] justify-center text-sm font-semibold
        "
                        >
                            Generate Kuota
                        </PrimaryButton>
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
                                (item) => {
                                    setSelectedKuota(item);

                                    setOpen(true);
                                },

                                (item) => {
                                    deleteConfirm(
                                        `Kuota lembaga "${item.lembaga.nama}" akan dihapus.`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(
                                                route("kuota.destroy", item.id),
                                            );
                                        }
                                    });
                                },
                            )}
                            data={kuota.data}
                        />
                    </div>

                    <Pagination links={kuota.links} />

                    <FormModal
                        open={open}
                        onClose={() => {
                            setOpen(false);

                            setSelectedKuota(null);
                        }}
                        kuota={selectedKuota}
                    />
                </div>
            </AdminLayout>
        </>
    );
}
