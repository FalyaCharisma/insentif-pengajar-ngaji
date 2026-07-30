import { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";

import AdminLayout from "@/layouts/app-layout";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/pagination";
import TableToolbar from "@/Components/TableToolbar";
import PageHeader from "@/Components/PageHeader";

import { columns } from "./columns";

import { useQueryParams } from "@/hooks/use-query-params";
import { deleteConfirm, successAlert } from "@/lib/alert";
import { Lembaga } from "@/types/lembaga";
import { Kategori } from "@/types/kategori";
import FormModal from "./form-modal";
import DetailAkunModal from "./detail-akun-modal";
import FormSelect2 from "@/Components/forms/FormSelect2";
import FormAsyncSelect from "@/Components/forms/FormAsyncSelect";
import { useAlamat } from "@/hooks/useAlamat";

import { useAuth } from "@/lib/auth";

type Props = {
    lembaga: any;
    filters: any;
    kategori: Kategori[];
    hasFilter?: boolean;
    activeFilterCount?: number;
};

export default function Index({ lembaga, filters, kategori }: Props) {

    const {
        searchKecamatanKotaKediri,
        searchKelurahan,
    } = useAlamat();

    const { setParams } = useQueryParams(
        route("lembaga.index"),
        filters,
    );

    const [open, setOpen] = useState(false);
    const [selectedLembaga, setSelectedLembaga] = useState<Lembaga | null>(null);

    const [openDetailAkun, setOpenDetailAkun] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const [kecamatan, setKecamatan] = useState<any>(null);
    const [kelurahan, setKelurahan] = useState<any>(null);

    const activeFilterCount = [
        filters.kategori_id,
        filters.status,
        filters.status_verifikasi,
        filters.kecamatan,
        filters.kelurahan,
    ].filter(Boolean).length;

    const hasFilter = activeFilterCount > 0;

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    const { hasRole } = useAuth();

    const canDelete = hasRole("superadmin");
    const canCreate = hasRole("superadmin") || hasRole("dindik");
    const canViewAccount = hasRole("superadmin") || hasRole("dindik");
    const canEdit = hasRole("superadmin") || hasRole("dindik");

    return (
        <>
            <Head title="Lembaga" />
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
                            hideAddButton={!canCreate}
                            sortOptions={[
                                {
                                    label: "Terbaru",
                                    value: "id",
                                },

                                {
                                    label: "Nama",
                                    value: "nama",
                                },
                            ]}

                            hideFilterButton={false}
                            onFilter={() => setShowFilter(!showFilter)}
                            hasFilter={hasFilter}
                            activeFilterCount={activeFilterCount}
                        />
                    </div>

                    {showFilter && (
                        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
                                {/* Kategori */}
                                <FormSelect2
                                    label="Kategori"
                                    value={filters.kategori_id}
                                    options={[
                                        {
                                            value: "",
                                            label: "Semua Kategori",
                                        },
                                        ...kategori.map((item: Kategori) => ({
                                            value: item.id,
                                            label: item.nama,
                                        })),
                                    ]}
                                    onChange={(value) =>
                                        setParams({
                                            kategori_id: value,
                                            page: 1,
                                        })
                                    }
                                />

                                {/* Status */}
                                <FormSelect2
                                    label="Status"
                                    value={filters.status}
                                    options={[
                                        {
                                            value: "",
                                            label: "Semua Status",
                                        },
                                        {
                                            value: "aktif",
                                            label: "Aktif",
                                        },
                                        {
                                            value: "nonaktif",
                                            label: "Nonaktif",
                                        },
                                    ]}
                                    onChange={(value) =>
                                        setParams({
                                            status: value,
                                            page: 1,
                                        })
                                    }
                                />

                                {/* Status Verifikasi */}
                                <FormSelect2
                                    label="Status Verifikasi"
                                    value={filters.status_verifikasi}
                                    options={[
                                        {
                                            value: "",
                                            label: "Semua Status",
                                        },
                                        {
                                            value: "pending",
                                            label: "Pending",
                                        },
                                        {
                                            value: "disetujui",
                                            label: "Disetujui",
                                        },
                                        {
                                            value: "ditolak",
                                            label: "Ditolak",
                                        },
                                    ]}
                                    onChange={(value) =>
                                        setParams({
                                            status_verifikasi: value,
                                            page: 1,
                                        })
                                    }
                                />

                                {/* Kecamatan */}
                                <FormAsyncSelect
                                    label="Kecamatan"
                                    value={kecamatan}
                                    onChange={(value: any) => {
                                        setKecamatan(value);
                                        setKelurahan(null);

                                        setParams({
                                            kecamatan: value?.value ?? "",
                                            page: 1,
                                        });
                                    }}
                                    loadOptions={searchKecamatanKotaKediri}
                                />

                                {/* Kelurahan */}
                                <FormAsyncSelect
                                    key={kecamatan?.value}
                                    label="Kelurahan"
                                    value={kelurahan}
                                    onChange={(value: any) => {
                                        setKelurahan(value);

                                        setParams({
                                            kecamatan: kecamatan?.value ?? "",
                                            kelurahan: value?.value ?? "",
                                            page: 1,
                                        });
                                    }}
                                    loadOptions={(inputValue) =>
                                        searchKelurahan(
                                            kecamatan?.value ?? "",
                                            inputValue
                                        )
                                    }
                                />

                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div
                        className="
                            overflow-x-auto
                            rounded-2xl
                            border border-slate-200
                        "
                    >
                    <DataTable
                        columns={
                            columns(
                                canEdit,
                                canDelete,
                                canViewAccount,

                                (lembaga) => {
                                    setSelectedLembaga(lembaga);
                                    setOpen(true);
                                },

                                (lembaga) => {
                                    deleteConfirm(
                                        `Lembaga "${lembaga.nama}" akan dihapus`,
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            router.delete(route("lembaga.destroy", lembaga.id));
                                        }
                                    });
                                },

                                (lembaga) => {
                                    setSelectedLembaga(lembaga);
                                    setOpenDetailAkun(true);
                                },
                            )
                        }
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

                <DetailAkunModal
                    open={openDetailAkun}
                    onClose={() => {
                        setOpenDetailAkun(false);
                        setSelectedLembaga(null);
                    }}
                    lembaga={selectedLembaga}
                />
            </AdminLayout>
        </>
    );
}