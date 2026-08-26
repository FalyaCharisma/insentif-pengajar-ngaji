import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/layouts/app-layout";

import PageHeader from "@/Components/PageHeader";
import Pagination from "@/Components/pagination";
import DataTable from "@/Components/DataTable";
import FormSelect2 from "@/Components/forms/FormSelect2";
import PrimaryButton from "@/Components/PrimaryButton";
import TableToolbar from "@/Components/TableToolbar";

import { useQueryParams } from "@/hooks/use-query-params";

import { deleteConfirm, successAlert } from "@/lib/alert";

import { columns } from "./columns";
import FormModal from "./form-modal";

import {
    MasterKuota,
    MasterKuotaFilters,
    MasterKuotaProps,
} from "@/types/master-kuota";

export default function Index({
    masterKuota,
    filters,
    periodes,
    forums,
    kategoris,
}: MasterKuotaProps) {
    const { setParams } = useQueryParams(route("master-kuota.index"), filters);

    const [selectedMasterKuota, setSelectedMasterKuota] =
        useState<MasterKuota | null>(null);

    const [open, setOpen] = useState(false);

    const pageProps: any = usePage().props;

    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    /*
    |--------------------------------------------------------------------------
    | Options
    |--------------------------------------------------------------------------
    */

    const periodeOptions = useMemo(
        () =>
            periodes.map((item) => ({
                value: item.id,
                label: String(item.tahun),
            })),
        [periodes],
    );

    const forumOptions = useMemo(
        () =>
            forums.map((item) => ({
                value: item.id,
                label: item.nama,
            })),
        [forums],
    );

    const kategoriOptions = useMemo(
        () =>
            kategoris.map((item) => ({
                value: item.id,
                label: item.nama,
            })),
        [kategoris],
    );

    /*
    |--------------------------------------------------------------------------
    | Filter
    |--------------------------------------------------------------------------
    */

    const handleFilter = (
        key: keyof MasterKuotaFilters,
        value: string | number | null,
    ) => {
        const params = {
            ...filters,
            page: 1,
        };

        if (value) {
            setParams({
                ...params,
                [key]: value,
            });
        } else {
            const updatedParams = {
                ...params,
            };

            delete updatedParams[key];

            setParams(updatedParams);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Edit
    |--------------------------------------------------------------------------
    */

    const handleEdit = (item: MasterKuota) => {
        setSelectedMasterKuota(item);

        setOpen(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = (item: MasterKuota) => {
        deleteConfirm(
            `Master kuota ${item.forum?.nama ?? ""} - ${
                item.kategori?.nama ?? ""
            } akan dihapus.`,
        ).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("master-kuota.destroy", item.id), {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <>
            <Head title="Master Kuota" />

            <AdminLayout>
                <div className="space-y-5">
                    <PageHeader
                        title="Master Kuota"
                        subtitle="Kelola kuota berdasarkan forum dan kategori"
                    />

                    {/* =====================================================
                INFORMATION
                ====================================================== */}

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
                                    Master Kuota
                                </h3>

                                <p className="mt-1 text-sm text-sky-700">
                                    Tentukan jumlah kuota penerima berdasarkan
                                    periode, forum, dan kategori lembaga. Satu
                                    kombinasi periode, forum, dan kategori hanya
                                    dapat memiliki satu master kuota.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-end gap-3">
                        <div className="min-w-[180px] flex-1">
                            <FormSelect2
                             
                                value={filters.forum_id}
                                options={forums.map((forum) => ({
                                    label: forum.nama,
                                    value: forum.id,
                                }))}
                                placeholder="Semua Forum"
                                onChange={(value) =>
                                    setParams({
                                        forum_id: value || undefined,
                                        page: 1,
                                    })
                                }
                            />
                        </div>

                        <div className="min-w-[180px] flex-1">
                            <FormSelect2
                                value={filters.kategori_id}
                                options={kategoris.map((kategori) => ({
                                    label: kategori.nama,
                                    value: kategori.id,
                                }))}
                                placeholder="Semua Kategori"
                                onChange={(value) =>
                                    setParams({
                                        kategori_id: value || undefined,
                                        page: 1,
                                    })
                                }
                            />
                        </div>

                        <div className="min-w-[150px] flex-1">
                            <FormSelect2
                                value={filters.periode_id}
                                options={periodes.map((periode) => ({
                                    label: String(periode.tahun),
                                    value: periode.id,
                                }))}
                                placeholder="Semua Periode"
                                onChange={(value) =>
                                    setParams({
                                        periode_id: value || undefined,
                                        page: 1,
                                    })
                                }
                            />
                        </div>

                        <div className="flex-1">
                            {/* <TableToolbar
                                filters={filters}
                                setParams={setParams}
                                searchPlaceholder="Cari forum atau kategori..."
                                hideAddButton
                                sortOptions={[
                                    { label: "Terbaru", value: "id" },
                                    {
                                        label: "Jumlah Kuota",
                                        value: "jumlah_kuota",
                                    },
                                ]}
                            /> */}
                        </div>

                        <PrimaryButton
                            onClick={() => {
                                setSelectedMasterKuota(null);
                                setOpen(true);
                            }}
                            className="h-11 min-w-[170px] justify-center text-sm font-semibold"
                        >
                            Tambah Master Kuota
                        </PrimaryButton>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <DataTable
                            columns={columns(handleEdit, handleDelete)}
                            data={masterKuota.data}
                        />
                    </div>

                    <Pagination links={masterKuota.links} />

                    {/* =====================================================
                MODAL
                ====================================================== */}

                    <FormModal
                        open={open}
                        onClose={() => {
                            setOpen(false);

                            setSelectedMasterKuota(null);
                        }}
                        masterKuota={selectedMasterKuota}
                        periodeOptions={periodeOptions}
                        forumOptions={forumOptions}
                        kategoriOptions={kategoriOptions}
                    />
                </div>
            </AdminLayout>
        </>
    );
}
