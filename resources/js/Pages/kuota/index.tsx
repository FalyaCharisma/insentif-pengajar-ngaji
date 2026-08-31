import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Users } from "lucide-react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";
import Pagination from "@/Components/pagination";
import DataTable from "@/Components/DataTable";
import PrimaryButton from "@/Components/PrimaryButton";
import { useQueryParams } from "@/hooks/use-query-params";

import { columns } from "./columns";
import FormModal from "./form-modal";

import { successAlert, verifyConfirm } from "@/lib/alert";
import TableToolbar from "@/Components/TableToolbar";
import FormSelect2 from "@/Components/forms/FormSelect2";

type Props = {
    kuota: any;
    filters: any;
    periodes: any[];
    forums: any[];
    masterKuotaStats: any[];
};

export default function Index({
    kuota,
    filters,
    periodes,
    forums,
    masterKuotaStats,
}: Props) {
    const { setParams } = useQueryParams(route("kuota.index"), filters);
    const [selectedKuota, setSelectedKuota] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const selectedForum = filters.forum_id ?? "";
    const handleForumChange = (value: string) => {
        setParams({
            forum_id: value || undefined,
            page: 1,
        });
    };

    const filteredMasterKuotaStats = selectedForum
        ? masterKuotaStats.filter(
              (item) => String(item.forum_id) === String(selectedForum),
          )
        : masterKuotaStats;

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
            "Sistem akan membuat kuota berdasarkan jumlah siswa dengan ketentuan 10 siswa = 1 pengajar. Data kuota yang sudah ada tidak akan diubah.",
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

                    {/* Keterangan */}
                    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                <Users className="h-5 w-5 text-sky-600" />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-sky-800">
                                    Mekanisme Generate Kuota
                                </h3>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-700">
                                    <li>
                                        Kuota dibuat berdasarkan jumlah siswa
                                        dengan ketentuan 10 siswa = 1 pengajar.
                                    </li>
                                    <li>
                                        Sistem membuat data kuota untuk lembaga
                                        pada periode aktif yang belum memiliki
                                        data kuota.
                                    </li>
                                    <li>
                                        Kuota Final awal akan mengikuti Estimasi
                                        Kuota dan dapat disesuaikan oleh Admin
                                        Dinas Pendidikan.
                                    </li>
                                    <li>
                                        Total Kuota Final seluruh lembaga harus
                                        memperhatikan batas Master Kuota yang
                                        telah ditentukan.
                                    </li>
                                    <li>
                                        Generate ulang tidak akan mengubah data
                                        kuota lembaga yang sudah ada.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Monitoring Master Kuota */}
                    {masterKuotaStats?.length > 0 && (
                        <div>
                            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-slate-800">
                                        Monitoring Master Kuota
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Ringkasan penggunaan kuota berdasarkan
                                        Forum dan Kategori.
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                {filteredMasterKuotaStats.map((master) => {
                                    const persentaseTampil = Math.min(
                                        master.persentase,
                                        100,
                                    );

                                    return (
                                        <div
                                            key={master.id}
                                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-slate-800">
                                                        {master.forum}
                                                    </p>
                                                    <p className="truncate text-xs text-slate-500">
                                                        {master.kategori}
                                                    </p>
                                                </div>

                                                {master.melebihi ? (
                                                    <div className="rounded-full bg-red-100 p-1.5">
                                                        <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                                                    </div>
                                                ) : (
                                                    <div className="rounded-full bg-emerald-100 p-1.5">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-3 grid grid-cols-3 gap-2">
                                                <div>
                                                    <p className="text-[10px] text-slate-500">
                                                        Master
                                                    </p>
                                                    <p className="text-sm font-bold text-slate-800">
                                                        {master.jumlah_kuota}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-[10px] text-slate-500">
                                                        Terpakai
                                                    </p>
                                                    <p className="text-sm font-bold text-sky-600">
                                                        {master.total_terpakai}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-[10px] text-slate-500">
                                                        {master.melebihi
                                                            ? "Lebih"
                                                            : "Sisa"}
                                                    </p>
                                                    <p
                                                        className={`text-sm font-bold ${
                                                            master.melebihi
                                                                ? "text-red-600"
                                                                : "text-emerald-600"
                                                        }`}
                                                    >
                                                        {master.melebihi
                                                            ? Math.abs(
                                                                  master.sisa,
                                                              )
                                                            : master.sisa}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-2.5">
                                                <div className="mb-1 flex justify-between text-[10px]">
                                                    <span className="text-slate-500">
                                                        Penggunaan
                                                    </span>
                                                    <span
                                                        className={`font-semibold ${
                                                            master.melebihi
                                                                ? "text-red-600"
                                                                : "text-slate-600"
                                                        }`}
                                                    >
                                                        {master.total_terpakai}/
                                                        {master.jumlah_kuota} ·{" "}
                                                        {master.persentase}%
                                                    </span>
                                                </div>

                                                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className={`h-full rounded-full ${
                                                            master.melebihi
                                                                ? "bg-red-500"
                                                                : master.persentase >=
                                                                    80
                                                                  ? "bg-amber-500"
                                                                  : "bg-emerald-500"
                                                        }`}
                                                        style={{
                                                            width: `${persentaseTampil}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Toolbar */}
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
                        />

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    router.visit(route("master-kuota.index"))
                                }
                                className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                Master Kuota
                            </button>

                            <PrimaryButton
                                onClick={generate}
                                className="h-11 min-w-[160px] justify-center text-sm font-semibold"
                            >
                                Generate Kuota
                            </PrimaryButton>
                        </div>
                    </div>

                    {/* Tabel */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <DataTable
                            columns={columns((item) => {
                                setSelectedKuota(item);
                                setOpen(true);
                            })}
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
