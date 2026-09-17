import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/layouts/app-layout";

import PageHeader from "@/Components/PageHeader";
import Pagination from "@/Components/pagination";
import DataTable from "@/Components/DataTable";
import FormSelect2 from "@/Components/forms/FormSelect2";
import PrimaryButton from "@/Components/PrimaryButton";

import { deleteConfirm, successAlert } from "@/lib/alert";

import { useQueryParams } from "@/hooks/use-query-params";

import { columns } from "./columns";
import FormModal from "./form-modal";

import {
    MasterKuota,
    MasterKuotaFilters,
    MasterKuotaProps,
} from "@/types/master-kuota";

type ForumOption = {
    value: string | number;
    label: string;
    kategori_id?: number | null;
    kategori_nama?: string | null;
};

export default function Index({
    masterKuota,
    filters,
    periodes,
    forums,
}: MasterKuotaProps) {
    const { setParams } = useQueryParams(route("master-kuota.index"), filters);

    const [selectedMasterKuota, setSelectedMasterKuota] =
        useState<MasterKuota | null>(null);

    const [open, setOpen] = useState(false);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    /*
    |--------------------------------------------------------------------------
    | Flash Message
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    /*
    |--------------------------------------------------------------------------
    | Periode Options
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

    /*
    |--------------------------------------------------------------------------
    | Forum Options
    |
    | Kategori diambil dari Forum
    |--------------------------------------------------------------------------
    */

    const forumOptions: ForumOption[] = useMemo(
        () =>
            forums.map((item: any) => ({
                value: item.id,
                label: item.nama,
                kategori_id: item.kategori_id ?? null,
                kategori_nama: item.kategori?.nama ?? null,
            })),
        [forums],
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
                        subtitle="Kelola kuota berdasarkan forum"
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
                                    Tentukan jumlah kuota berdasarkan periode
                                    dan forum. Kategori lembaga otomatis
                                    mengikuti kategori forum yang dipilih.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        FILTER
                    ====================================================== */}

                    <div className="flex flex-wrap items-end gap-3">
                        {/* FORUM */}
                        <div className="min-w-[220px] flex-1">
                            <FormSelect2
                                value={filters.forum_id}
                                options={forums.map((forum: any) => ({
                                    label: forum.kategori?.nama
                                        ? `${forum.nama} — ${forum.kategori.nama}`
                                        : forum.nama,
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

                        {/* PERIODE */}
                        <div className="min-w-[180px] flex-1">
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

                        {/* TAMBAH */}
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

                    {/* =====================================================
                        TABLE
                    ====================================================== */}

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
                    />
                </div>
            </AdminLayout>
        </>
    );
}
