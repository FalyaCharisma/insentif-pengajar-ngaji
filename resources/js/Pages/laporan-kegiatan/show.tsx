import { Head, router } from "@inertiajs/react";
import {
    ArrowLeft,
    CalendarDays,
    FileText,
    Building2,
    User,
    ExternalLink,
} from "lucide-react";

import AdminLayout from "@/layouts/app-layout";

type Props = {
    laporanKegiatan: any;
    role: string;
};

export default function Show({
    laporanKegiatan,
    role,
}: Props) {
    const laporan = laporanKegiatan;

    const formatTanggal = (tanggal?: string) => {
        if (!tanggal) return "-";

        return new Date(tanggal).toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            },
        );
    };

    const statusConfig: Record<
        string,
        {
            label: string;
            className: string;
        }
    > = {
        pending: {
            label: "Menunggu Verifikasi",
            className:
                "bg-yellow-100 text-yellow-700",
        },

        verified: {
            label: "Terverifikasi",
            className:
                "bg-emerald-100 text-emerald-700",
        },

        revision: {
            label: "Perlu Revisi",
            className:
                "bg-orange-100 text-orange-700",
        },

        rejected: {
            label: "Ditolak",
            className:
                "bg-red-100 text-red-700",
        },
    };

    const status =
        statusConfig[laporan.status] ?? {
            label: laporan.status ?? "-",
            className:
                "bg-slate-100 text-slate-600",
        };

    const fileUrl = laporan.file_bukti
        ? `/storage/${laporan.file_bukti}`
        : null;

    const isImage =
        laporan.file_bukti &&
        /\.(jpg|jpeg|png)$/i.test(
            laporan.file_bukti,
        );

    return (
        <>
            <Head title="Detail Laporan Kegiatan" />

            <AdminLayout>
                <div className="space-y-5">

                    {/* HEADER */}
                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                router.visit(
                                    route(
                                        "laporan-kegiatan.index",
                                    ),
                                )
                            }
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                p-2
                                text-slate-500
                                transition
                                hover:bg-slate-50
                            "
                        >
                            <ArrowLeft size={19} />
                        </button>

                        <div>
                            <h1 className="text-xl font-semibold text-slate-900">
                                Detail Laporan Kegiatan
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Informasi lengkap kegiatan
                            </p>
                        </div>

                    </div>

                    {/* INFORMASI KEGIATAN */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {laporan.nama_kegiatan}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Periode{" "}
                                    {laporan.periode?.tahun ?? "-"}
                                </p>
                            </div>

                            <span
                                className={`
                                    rounded-full
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    ${status.className}
                                `}
                            >
                                {status.label}
                            </span>

                        </div>

                        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

                            {/* TANGGAL */}
                            <div className="flex gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <CalendarDays size={19} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Tanggal Kegiatan
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-900">
                                        {formatTanggal(
                                            laporan.tanggal_mulai,
                                        )}

                                        {laporan.tanggal_selesai &&
                                            laporan.tanggal_selesai !==
                                                laporan.tanggal_mulai && (
                                                <>
                                                    {" - "}
                                                    {formatTanggal(
                                                        laporan.tanggal_selesai,
                                                    )}
                                                </>
                                            )}
                                    </p>
                                </div>

                            </div>

                            {/* PERIODE */}
                            <div className="flex gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                    <FileText size={19} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Periode
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-900">
                                        {laporan.periode?.tahun ?? "-"}
                                    </p>
                                </div>

                            </div>

                            {/* KETERANGAN */}
                            <div className="md:col-span-2">

                                <p className="mb-2 text-sm font-semibold text-slate-800">
                                    Keterangan
                                </p>

                                <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                                    {laporan.keterangan ||
                                        "Tidak ada keterangan."}
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* INFORMASI LEMBAGA */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-base font-semibold text-slate-900">
                                Informasi Lembaga
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

                            <div className="flex gap-3">
                                <Building2
                                    size={19}
                                    className="mt-0.5 text-slate-400"
                                />

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Nama Lembaga
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-900">
                                        {laporan.lembaga?.nama ??
                                            "-"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <User
                                    size={19}
                                    className="mt-0.5 text-slate-400"
                                />

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Pimpinan
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-900">
                                        {laporan.lembaga?.profil
                                            ?.nama_pimpinan ??
                                            "-"}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* FILE BUKTI */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FileText size={19} />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Bukti Kegiatan
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        File yang diunggah oleh lembaga
                                    </p>
                                </div>

                            </div>

                            {fileUrl && (
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-slate-200
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        transition
                                        hover:bg-slate-50
                                    "
                                >
                                    <ExternalLink size={16} />
                                    Buka
                                </a>
                            )}

                        </div>

                        <div className="p-6">

                            {!fileUrl ? (
                                <div className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
                                    Belum ada file bukti kegiatan.
                                </div>
                            ) : isImage ? (
                                <div className="flex justify-center rounded-xl bg-slate-50 p-4">
                                    <img
                                        src={fileUrl}
                                        alt="Bukti kegiatan"
                                        className="max-h-[600px] max-w-full rounded-lg object-contain"
                                    />
                                </div>
                            ) : (
                                <iframe
                                    src={fileUrl}
                                    title="Bukti kegiatan"
                                    className="h-[650px] w-full rounded-xl border border-slate-200"
                                />
                            )}

                        </div>
                    </div>

                    {/* CATATAN */}
                    {laporan.catatan && (
                        <div
                            className={`
                                rounded-2xl
                                border
                                p-5
                                ${
                                    laporan.status ===
                                    "rejected"
                                        ? "border-red-200 bg-red-50"
                                        : "border-orange-200 bg-orange-50"
                                }
                            `}
                        >
                            <p className="text-sm font-semibold text-slate-800">
                                Catatan Verifikasi
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {laporan.catatan}
                            </p>
                        </div>
                    )}

                </div>
            </AdminLayout>
        </>
    );
}