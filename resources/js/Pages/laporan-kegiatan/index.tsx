import { Head, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AdminLayout from "@/layouts/app-layout";

import DataTable from "@/Components/DataTable";
import PageHeader from "@/Components/PageHeader";
import Pagination from "@/Components/pagination";
import TableToolbar from "@/Components/TableToolbar";

import { useQueryParams } from "@/hooks/use-query-params";

import { columns } from "./columns";
import FormSelect2 from "@/Components/forms/FormSelect2";
import { Periode } from "@/types/periode";
import { CalendarDays } from "lucide-react";

import JadwalModal from "./jadwal-modal";
import JadwalPreviewModal from "./jadwal-preview-modal";
import FormModal from "./form-modal";
import LaporanDetailModal from "./laporan-detail-modal";
import VerifikasiModal from "./verifikasi-modal";
import { deleteConfirm, successAlert } from "@/lib/alert";


type Props = {
    laporanKegiatan: any;
    periode: Periode[];
    selectedPeriode: number;
    rekap: {
        total: number;
        verified: number;
        pending: number;
        revision: number;
        rejected: number;
    };
    jadwal: any;
    filters: any;
};

export default function Index({
    laporanKegiatan,
    periode,
    selectedPeriode,
    rekap,
    jadwal,
    filters,
}: Props) {
    const { setParams } = useQueryParams(
        route("laporan-kegiatan.index"),
        filters,
    );

    const { auth, flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash?.success]);

    const role = auth.user.role;

    const isLembaga = role === "lembaga";
    const isDindik = role === "dindik";

    const [openJadwalModal, setOpenJadwalModal] = useState(false);
    const [openPreviewJadwal, setOpenPreviewJadwal] = useState(false);
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openVerifikasiModal, setOpenVerifikasiModal] = useState(false);

    const [selectedLaporan, setSelectedLaporan] = useState<any>(null);

    const selectedPeriodeData = periode.find(
        (item) => item.id === Number(selectedPeriode),
    );

    const periodeTahun =
        periode.find(
            (item) => item.id === Number(selectedPeriode),
        )?.tahun ?? null;

    return (
        <>
            <Head title="Laporan Kegiatan" />

            <AdminLayout>
                <div className="space-y-5">

                    {/* HEADER */}
                    <PageHeader
                        title="Laporan Kegiatan"
                        subtitle={
                            isLembaga
                                ? "Kelola jadwal dan laporan kegiatan lembaga."
                                : "Monitoring laporan kegiatan lembaga."
                        }
                    />

                    {/* FILTER PERIODE */}
                    <div className="flex justify-end">
                        <div className="w-64">
                            <FormSelect2
                                label="Periode"
                                value={selectedPeriode}
                                options={periode.map((item) => ({
                                    value: item.id,
                                    label: item.tahun.toString(),
                                }))}
                                onChange={(value) => {
                                    setParams({
                                        periode_id: Number(value),
                                        page: 1,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    {/* REKAP */}
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                        {/* Total */}
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-4">
                            <p className="text-xs font-medium text-slate-500">
                                Total Kegiatan
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-900">
                                {rekap.total}
                            </p>
                        </div>

                        {/* Verified */}
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
                            <p className="text-xs font-medium text-emerald-700">
                                Terverifikasi
                            </p>

                            <p className="mt-1 text-2xl font-bold text-emerald-700">
                                {rekap.verified}
                            </p>
                        </div>

                        {/* Pending */}
                        <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-4">
                            <p className="text-xs font-medium text-yellow-700">
                                Menunggu Verifikasi
                            </p>

                            <p className="mt-1 text-2xl font-bold text-yellow-700">
                                {rekap.pending}
                            </p>
                        </div>

                        {/* Revision */}
                        <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-4">
                            <p className="text-xs font-medium text-orange-700">
                                Perlu Revisi
                            </p>

                            <p className="mt-1 text-2xl font-bold text-orange-700">
                                {rekap.revision}
                            </p>
                        </div>

                        {/* Rejected */}
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4">
                            <p className="text-xs font-medium text-red-700">
                                Ditolak
                            </p>

                            <p className="mt-1 text-2xl font-bold text-red-700">
                                {rekap.rejected}
                            </p>
                        </div>
                    </div>

                    {/* JADWAL - KHUSUS LEMBAGA */}
                    {isLembaga && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">

                                {/* LEFT */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                        <CalendarDays size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-semibold text-slate-900">
                                            Jadwal Kegiatan
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Jadwal kegiatan untuk periode yang dipilih.
                                        </p>
                                    </div>
                                </div>

                                {/* BUTTON */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (jadwal) {
                                            setOpenPreviewJadwal(true);
                                        } else {
                                            setOpenJadwalModal(true);
                                        }
                                    }}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-cyan-600
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-cyan-700
                                    "
                                >
                                    <CalendarDays size={17} />

                                    {jadwal ? "Lihat Jadwal" : "Upload Jadwal"}
                                </button>
                            </div>

                            {/* STATUS JADWAL */}
                            <div className="mt-4">
                                {jadwal ? (
                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                                        <p className="text-sm font-medium text-emerald-700">
                                            Jadwal kegiatan sudah diupload
                                        </p>

                                        <p className="mt-1 text-xs text-emerald-600">
                                            Jadwal untuk periode ini sudah tersedia dan dapat dilihat.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
                                        <p className="text-sm font-medium text-orange-700">
                                            Jadwal kegiatan belum diupload
                                        </p>

                                        <p className="mt-1 text-xs text-orange-600">
                                            Silakan upload jadwal kegiatan untuk periode yang dipilih.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TOOLBAR */}
                    <TableToolbar
                        filters={filters}
                        setParams={setParams}
                        searchPlaceholder="Cari nama kegiatan..."
                        addButtonLabel="Tambah Kegiatan"
                        hideAddButton={!isLembaga}
                        onAdd={() => {
                            setSelectedLaporan(null);
                            setOpenFormModal(true);
                        }}
                        sortOptions={[
                            {
                                label: "Terbaru",
                                value: "id",
                            },
                            {
                                label: "Tanggal",
                                value: "tanggal",
                            },
                            {
                                label: "Nama Kegiatan",
                                value: "nama_kegiatan",
                            },
                        ]}
                    />

                    {/* TABLE */}
                    <DataTable
                        columns={columns(
                            role,

                            // Detail
                            (row) => {
                                setSelectedLaporan(row);
                                setOpenDetailModal(true);
                            },

                            // Edit
                            (row) => {
                                setSelectedLaporan(row);
                                setOpenFormModal(true);
                            },

                            // Delete
                            (row) => {
                                deleteConfirm(
                                    `Laporan kegiatan "${row.nama_kegiatan}" akan dihapus.`,
                                ).then((result) => {
                                    if (!result.isConfirmed) return;

                                    router.delete(
                                        route(
                                            "laporan-kegiatan.destroy",
                                            row.id,
                                        ),
                                    );
                                });
                            },

                            // Verifikasi
                            // Verifikasi
                            (row) => {
                                setSelectedLaporan(row);
                                setOpenVerifikasiModal(true);
                            },
                        )}
                        data={laporanKegiatan.data}
                    />

                    {/* PAGINATION */}
                    <Pagination
                        links={laporanKegiatan.links}
                    />

                </div>

                <FormModal
                    open={openFormModal}
                    periodeId={Number(selectedPeriode)}
                    periodeTahun={periodeTahun}
                    laporan={selectedLaporan}
                    onClose={() => {
                        setOpenFormModal(false);
                        setSelectedLaporan(null);
                    }}
                />

                <JadwalPreviewModal
                    open={openPreviewJadwal}
                    jadwal={jadwal}
                    periodeTahun={periodeTahun}
                    onClose={() => setOpenPreviewJadwal(false)}
                    onEdit={() => {
                        setOpenPreviewJadwal(false);
                        setOpenJadwalModal(true);
                    }}
                />

                <JadwalModal
                    open={openJadwalModal}
                    periodeId={Number(selectedPeriode)}
                    periodeTahun={periodeTahun}
                    jadwal={jadwal}
                    onClose={() => setOpenJadwalModal(false)}
                />

                <LaporanDetailModal
                    open={openDetailModal}
                    laporan={selectedLaporan}
                    onClose={() => {
                        setOpenDetailModal(false);
                        setSelectedLaporan(null);
                    }}
                />

                <VerifikasiModal
                    open={openVerifikasiModal}
                    laporan={selectedLaporan}
                    onClose={() => {
                        setOpenVerifikasiModal(false);
                        setSelectedLaporan(null);
                    }}
                />
            </AdminLayout>
        </>
    );
}