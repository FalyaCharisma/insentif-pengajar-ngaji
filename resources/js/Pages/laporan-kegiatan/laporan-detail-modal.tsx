import {
    CalendarDays,
    FileText,
    X,
} from "lucide-react";

type Props = {
    open: boolean;
    laporan: any;
    onClose: () => void;
};

export default function LaporanDetailModal({
    open,
    laporan,
    onClose,
}: Props) {
    if (!open || !laporan) return null;

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

    const fileUrl = laporan.file_bukti
        ? `/storage/${laporan.file_bukti}`
        : null;

    const isImage = /\.(jpg|jpeg|png)$/i.test(
        laporan.file_bukti ?? "",
    );

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

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Detail Kegiatan
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Informasi laporan kegiatan
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            text-slate-400
                            transition
                            hover:bg-slate-100
                            hover:text-slate-600
                        "
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* BODY */}
                <div className="max-h-[calc(90vh-140px)] space-y-5 overflow-y-auto px-6 py-6">

                    {/* INFORMASI KEGIATAN */}
                    <div className="rounded-xl border border-slate-200 px-5 py-4">

                        {/* Periode */}
                        <div className="flex items-center py-2">
                            <span className="w-36 shrink-0 text-sm text-slate-500">
                                Periode
                            </span>

                            <span className="mr-3 text-sm text-slate-400">
                                :
                            </span>

                            <span className="text-sm font-medium text-slate-800">
                                {laporan.periode?.tahun ?? "-"}
                            </span>
                        </div>

                        {/* Nama Kegiatan */}
                        <div className="flex items-start py-2">
                            <span className="w-36 shrink-0 text-sm text-slate-500">
                                Nama Kegiatan
                            </span>

                            <span className="mr-3 text-sm text-slate-400">
                                :
                            </span>

                            <span className="text-sm font-semibold text-slate-900">
                                {laporan.nama_kegiatan}
                            </span>
                        </div>

                        {/* Tanggal */}
                        <div className="flex items-center py-2">
                            <span className="w-36 shrink-0 text-sm text-slate-500">
                                Tanggal Kegiatan
                            </span>

                            <span className="mr-3 text-sm text-slate-400">
                                :
                            </span>

                            <span className="text-sm font-medium text-slate-800">
                                {formatTanggal(laporan.tanggal_mulai)}

                                {laporan.tanggal_selesai &&
                                    laporan.tanggal_selesai !==
                                        laporan.tanggal_mulai && (
                                        <>
                                            {" - "}
                                            {formatTanggal(laporan.tanggal_selesai)}
                                        </>
                                    )}
                            </span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center py-2">
                            <span className="w-36 shrink-0 text-sm text-slate-500">
                                Status
                            </span>

                            <span className="mr-3 text-sm text-slate-400">
                                :
                            </span>

                            <span
                                className={`
                                    rounded-full
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    ${status.className}
                                `}
                            >
                                {status.label}
                            </span>
                        </div>

                        {/* CATATAN VERIFIKASI */}
                        {laporan.catatan && (
                            <div
                                className={`
                                    rounded-xl border px-4 py-3
                                    ${
                                        laporan.status === "rejected"
                                            ? "border-red-200 bg-red-50"
                                            : laporan.status === "revision"
                                            ? "border-orange-200 bg-orange-50"
                                            : "border-slate-200 bg-slate-50"
                                    }
                                `}
                            >
                                <p
                                    className={`
                                        text-xs font-semibold
                                        ${
                                            laporan.status === "rejected"
                                                ? "text-red-700"
                                                : laporan.status === "revision"
                                                ? "text-orange-700"
                                                : "text-slate-700"
                                        }
                                    `}
                                >
                                    Catatan Verifikator
                                </p>

                                <p
                                    className={`
                                        mt-1.5 text-sm leading-5
                                        ${
                                            laporan.status === "rejected"
                                                ? "text-red-600"
                                                : laporan.status === "revision"
                                                ? "text-orange-600"
                                                : "text-slate-600"
                                        }
                                    `}
                                >
                                    {laporan.catatan}
                                </p>
                            </div>
                        )}

                    </div>

                    {/* KETERANGAN */}
                    <div>
                        <p className="mb-2 text-sm font-semibold text-slate-800">
                            Keterangan
                        </p>

                        <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                            {laporan.keterangan ||
                                "Tidak ada keterangan."}
                        </div>
                    </div>

                    {/* FILE BUKTI */}
                    <div>

                        <div className="mb-3 flex items-center gap-2">
                            <FileText
                                size={18}
                                className="text-indigo-600"
                            />

                            <p className="text-sm font-semibold text-slate-800">
                                Bukti Kegiatan
                            </p>
                        </div>

                        {!fileUrl ? (
                            <div className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                                Belum ada file bukti kegiatan.
                            </div>
                        ) : isImage ? (
                            <div className="flex justify-center rounded-xl bg-slate-100 p-4">
                                <img
                                    src={fileUrl}
                                    alt="Bukti kegiatan"
                                    className="max-h-[500px] max-w-full rounded-lg object-contain"
                                />
                            </div>
                        ) : (
                            <iframe
                                src={fileUrl}
                                title="Bukti kegiatan"
                                className="h-[500px] w-full rounded-xl border border-slate-200"
                            />
                        )}

                    </div>

                </div>

                {/* FOOTER */}
                <div className="flex justify-end border-t border-slate-200 px-6 py-4">

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-xl
                            border
                            border-slate-200
                            px-5
                            py-2
                            text-sm
                            font-medium
                            text-slate-600
                            transition
                            hover:bg-slate-50
                        "
                    >
                        Tutup
                    </button>

                </div>

            </div>
        </div>
    );
}