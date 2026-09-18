import { Head, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AdminLayout from "@/layouts/app-layout";
import Pagination from "@/Components/pagination";
import { successAlert } from "@/lib/alert";

import {
    ArrowLeft,
    Building2,
    CalendarDays,
    CheckCircle,
    Eye,
    FileText,
    MapPin,
    UserRound,
} from "lucide-react";

import VerifikasiModal from "./verifikasi-modal";

type Props = {
    lembaga: any;
    periode: any;
    laporanKegiatan: any;
};

export default function DetailLaporan({
    lembaga,
    periode,
    laporanKegiatan,
}: Props) {
    const { auth, flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash?.success]);

    const [openVerifikasiModal, setOpenVerifikasiModal] = useState(false);
    const [selectedLaporan, setSelectedLaporan] = useState<any>(null);

    const dataLaporan = laporanKegiatan?.data ?? [];

    const namaLembaga =
        lembaga?.profil?.nama_lembaga ??
        lembaga?.profil?.nama ??
        lembaga?.nama_lembaga ??
        lembaga?.nama ??
        "-";

    const namaKecamatan =
        lembaga?.profil?.kecamatan ??
        lembaga?.profil?.nama_kecamatan ??
        lembaga?.kecamatan ??
        "-";

    const namaKelurahan =
        lembaga?.profil?.kelurahan ??
        lembaga?.profil?.nama_kelurahan ??
        lembaga?.kelurahan ??
        "-";

    const alamat =
        lembaga?.profil?.alamat ??
        lembaga?.alamat ??
        "-";

    const namaKetua =
        lembaga?.profil?.nama_ketua ??
        lembaga?.nama_ketua ??
        "-";

    const tahunPeriode = periode?.tahun ?? "-";

    const formatTanggal = (
        tanggal: string | null | undefined,
    ): string => {
        if (!tanggal) return "-";

        const date = new Date(tanggal);

        if (Number.isNaN(date.getTime())) {
            return tanggal;
        }

        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatTanggalWaktu = (
        tanggal: string | null | undefined,
    ): string => {
        if (!tanggal) return "-";

        const date = new Date(tanggal);

        if (Number.isNaN(date.getTime())) {
            return tanggal;
        }

        return date.toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusValue = (laporan: any) => {
        return (
            laporan?.status_verifikasi ??
            laporan?.status ??
            laporan?.status_laporan ??
            null
        );
    };

    const getStatusLabel = (
        status: string | null | undefined,
    ): string => {
        if (!status) return "Belum Diverifikasi";

        switch (String(status).toLowerCase()) {
            case "verified":
            case "terverifikasi":
            case "disetujui":
            case "diterima":
                return "Terverifikasi";

            case "pending":
            case "menunggu":
            case "diajukan":
            case "menunggu_verifikasi":
                return "Menunggu Verifikasi";

            case "revision":
            case "revisi":
            case "perlu_revisi":
                return "Perlu Revisi";

            case "rejected":
            case "ditolak":
                return "Ditolak";

            default:
                return status;
        }
    };

    const getStatusClass = (
        status: string | null | undefined,
    ): string => {
        if (!status) {
            return "bg-slate-100 text-slate-700";
        }

        switch (String(status).toLowerCase()) {
            case "verified":
            case "terverifikasi":
            case "disetujui":
            case "diterima":
                return "bg-emerald-100 text-emerald-700";

            case "pending":
            case "menunggu":
            case "diajukan":
            case "menunggu_verifikasi":
                return "bg-yellow-100 text-yellow-700";

            case "revision":
            case "revisi":
            case "perlu_revisi":
                return "bg-orange-100 text-orange-700";

            case "rejected":
            case "ditolak":
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getStatusDotClass = (
        status: string | null | undefined,
    ): string => {
        if (!status) {
            return "bg-slate-500";
        }

        switch (String(status).toLowerCase()) {
            case "verified":
            case "terverifikasi":
            case "disetujui":
            case "diterima":
                return "bg-emerald-500";

            case "pending":
            case "menunggu":
            case "diajukan":
            case "menunggu_verifikasi":
                return "bg-yellow-500";

            case "revision":
            case "revisi":
            case "perlu_revisi":
                return "bg-orange-500";

            case "rejected":
            case "ditolak":
                return "bg-red-500";

            default:
                return "bg-slate-500";
        }
    };

    const handleKembali = () => {
        router.get(route("laporan-kegiatan.index"), {
            periode_id: periode?.id,
        });
    };

    const handleVerifikasi = (laporan: any) => {
        setSelectedLaporan(laporan);
        setOpenVerifikasiModal(true);
    };

    const isAlreadyVerified = (laporan: any) => {
        const status = String(getStatusValue(laporan) ?? "").toLowerCase();

        return [
            "verified",
            "terverifikasi",
            "disetujui",
            "diterima",
        ].includes(status);
    };

    return (
        <>
            <Head title="Detail Laporan Kegiatan" />

            <AdminLayout>
                <div className="space-y-6 p-6">
                    {/* HEADER */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                                <span>Laporan Kegiatan</span>
                                <span>/</span>
                                <span>Detail Laporan</span>
                            </div>

                            <h1 className="text-2xl font-bold text-slate-900">
                                Detail Laporan Kegiatan
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Monitoring laporan kegiatan lembaga pada
                                periode yang dipilih.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleKembali}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            <ArrowLeft size={17} />
                            Kembali
                        </button>
                    </div>

                    {/* INFORMASI LEMBAGA */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        {/* HEADER */}
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                                <Building2 size={20} />
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Informasi Lembaga
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Identitas lembaga yang dipilih
                                </p>
                            </div>
                        </div>

                        {/* INFORMASI */}
                        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                            {/* NAMA LEMBAGA */}
                            <div className="min-w-0">
                                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                    <Building2 size={13} />
                                    Nama Lembaga
                                </div>

                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {namaLembaga}
                                </p>
                            </div>

                            {/* ID LEMBAGA */}
                            <div className="min-w-0">
                                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                    <FileText size={13} />
                                    ID Lembaga
                                </div>

                                <p className="text-sm font-semibold text-slate-900">
                                    {lembaga?.id ?? "-"}
                                </p>
                            </div>

                            {/* PERIODE */}
                            <div className="min-w-0">
                                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                    <CalendarDays size={13} />
                                    Periode
                                </div>

                                <p className="text-sm font-semibold text-slate-900">
                                    {tahunPeriode}
                                </p>
                            </div>

                            {/* ALAMAT */}
                            <div className="min-w-0">
                                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                    <MapPin size={13} />
                                    Alamat
                                </div>

                                <p className="line-clamp-2 text-sm text-slate-700">
                                    {alamat}
                                </p>
                            </div>

                            {/* KELURAHAN / KECAMATAN */}
                            <div className="min-w-0">
                                <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                    <MapPin size={13} />
                                    Kelurahan / Kecamatan
                                </div>

                                <p className="text-sm text-slate-700">
                                    {namaKelurahan} / {namaKecamatan}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* STATISTIK */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {/* TOTAL LAPORAN */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-medium text-slate-500">
                                    Total Laporan
                                </p>

                                <div className="rounded-lg bg-cyan-50 p-2 text-cyan-600">
                                    <FileText size={17} />
                                </div>
                            </div>

                            <p className="mt-2 text-2xl font-bold leading-none text-slate-900">
                                {laporanKegiatan?.total ?? 0}
                            </p>
                        </div>

                        {/* TERVERIFIKASI */}
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-medium text-emerald-700">
                                    Terverifikasi
                                </p>

                                <div className="rounded-lg bg-white/70 p-2 text-emerald-600">
                                    <CheckCircle size={17} />
                                </div>
                            </div>

                            <p className="mt-2 text-2xl font-bold leading-none text-emerald-700">
                                {
                                    dataLaporan.filter((item: any) =>
                                        [
                                            "verified",
                                            "terverifikasi",
                                            "disetujui",
                                            "diterima",
                                        ].includes(
                                            String(getStatusValue(item) ?? "").toLowerCase(),
                                        ),
                                    ).length
                                }
                            </p>
                        </div>

                        {/* MENUNGGU VERIFIKASI */}
                        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-medium text-yellow-700">
                                    Menunggu Verifikasi
                                </p>

                                <div className="rounded-lg bg-white/70 p-2 text-yellow-600">
                                    <CalendarDays size={17} />
                                </div>
                            </div>

                            <p className="mt-2 text-2xl font-bold leading-none text-yellow-700">
                                {
                                    dataLaporan.filter((item: any) =>
                                        [
                                            "pending",
                                            "menunggu",
                                            "diajukan",
                                            "menunggu_verifikasi",
                                        ].includes(
                                            String(getStatusValue(item) ?? "").toLowerCase(),
                                        ),
                                    ).length
                                }
                            </p>
                        </div>

                        {/* PERLU REVISI */}
                        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 shadow-sm">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-medium text-orange-700">
                                    Perlu Revisi
                                </p>

                                <div className="rounded-lg bg-white/70 p-2 text-orange-600">
                                    <FileText size={17} />
                                </div>
                            </div>

                            <p className="mt-2 text-2xl font-bold leading-none text-orange-700">
                                {
                                    dataLaporan.filter((item: any) =>
                                        [
                                            "revision",
                                            "revisi",
                                            "perlu_revisi",
                                        ].includes(
                                            String(getStatusValue(item) ?? "").toLowerCase(),
                                        ),
                                    ).length
                                }
                            </p>
                        </div>
                    </div>

                    {/* TABEL LAPORAN */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Daftar Laporan Kegiatan
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Daftar laporan kegiatan lembaga pada
                                    periode {tahunPeriode}.
                                </p>
                            </div>

                            <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                                {laporanKegiatan?.total ?? 0} laporan
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            No
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Nama Kegiatan
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Tanggal
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Deskripsi
                                        </th>

                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {dataLaporan.length > 0 ? (
                                        dataLaporan.map(
                                            (item: any, index: number) => {
                                                const status =
                                                    getStatusValue(item);

                                                return (
                                                    <tr
                                                        key={item.id}
                                                        className="transition hover:bg-slate-50"
                                                    >
                                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                            {((
                                                                laporanKegiatan?.current_page ??
                                                                1
                                                            ) -
                                                                1) *
                                                                (laporanKegiatan?.per_page ??
                                                                    10) +
                                                                index +
                                                                1}
                                                        </td>

                                                        <td className="min-w-[220px] px-5 py-4">
                                                            <p className="font-semibold text-slate-900">
                                                                {item.nama_kegiatan ??
                                                                    "-"}
                                                            </p>
                                                        </td>

                                                        <td className="min-w-[150px] whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                                                            {formatTanggal(
                                                                item.tanggal ??
                                                                    item.tanggal_kegiatan ??
                                                                    item.tanggal_mulai ??
                                                                    item.created_at,
                                                            )}
                                                        </td>

                                                        <td className="min-w-[250px] max-w-[350px] px-5 py-4 text-sm text-slate-600">
                                                            <p className="line-clamp-3">
                                                                {item.deskripsi ??
                                                                    item.keterangan ??
                                                                    item.uraian ??
                                                                    "-"}
                                                            </p>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <div className="flex min-w-[180px] flex-col gap-1">
                                                                <span
                                                                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                                                        status,
                                                                    )}`}
                                                                >
                                                                    <span
                                                                        className={`mr-2 mt-0.5 h-1.5 w-1.5 rounded-full ${getStatusDotClass(
                                                                            status,
                                                                        )}`}
                                                                    />

                                                                    {getStatusLabel(status)}
                                                                </span>

                                                                {item.catatan && (
                                                                    <div
                                                                        className="max-w-[280px] text-xs leading-relaxed text-slate-500"
                                                                        title={item.catatan}
                                                                    >
                                                                        <span className="font-semibold text-slate-600">
                                                                            Catatan:
                                                                        </span>{" "}
                                                                        {item.catatan}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-5 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleVerifikasi(
                                                                            item,
                                                                        )
                                                                    }
                                                                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                                                                >
                                                                    <CheckCircle
                                                                        size={
                                                                            15
                                                                        }
                                                                    />

                                                                    {isAlreadyVerified(
                                                                        item,
                                                                    )
                                                                        ? "Lihat Verifikasi"
                                                                        : "Verifikasi"}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-5 py-12 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                                        <FileText size={25} />
                                                    </div>

                                                    <p className="font-medium text-slate-700">
                                                        Belum ada laporan
                                                        kegiatan
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Belum ada laporan untuk
                                                        lembaga dan periode
                                                        yang dipilih.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION */}
                        {laporanKegiatan?.links &&
                            laporanKegiatan.links.length > 0 && (
                                <div className="border-t border-slate-200 px-5 py-4">
                                    <Pagination
                                        links={laporanKegiatan.links}
                                    />
                                </div>
                            )}
                    </div>
                </div>

                {/* MODAL VERIFIKASI */}
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