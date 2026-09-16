import { useEffect, useState } from "react";
import { CheckCircle, X, AlertTriangle } from "lucide-react";
import { router } from "@inertiajs/react";

type Props = {
    open: boolean;
    laporan: any;
    onClose: () => void;
};

export default function VerifikasiModal({
    open,
    laporan,
    onClose,
}: Props) {
    const [status, setStatus] = useState<
        "verified" | "revision" | "rejected"
    >("verified");

    const [catatan, setCatatan] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (open) {
            setStatus("verified");
            setCatatan("");
        }
    }, [open, laporan]);

    if (!open || !laporan) return null;

    const handleClose = () => {
        if (processing) return;

        setStatus("verified");
        setCatatan("");
        onClose();
    };

    const handleSubmit = () => {
        if (
            (status === "revision" ||
                status === "rejected") &&
            !catatan.trim()
        ) {
            return;
        }

        setProcessing(true);

        router.put(
            route(
                "laporan-kegiatan.verifikasi",
                laporan.id,
            ),
            {
                status,
                catatan: catatan || null,
            },
            {
                onSuccess: () => {
                    onClose();
                },

                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <CheckCircle size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Verifikasi Laporan
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Tentukan hasil verifikasi laporan kegiatan.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* BODY */}
                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-6">

                    {/* KEGIATAN */}
                    <div className="rounded-xl border border-slate-200 px-5 py-4">

                        <p className="text-xs text-slate-500">
                            Nama Kegiatan
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            {laporan.nama_kegiatan}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                            <span>
                                Lembaga:
                            </span>

                            <span className="font-medium text-slate-700">
                                {laporan.lembaga?.nama ?? "-"}
                            </span>
                        </div>

                    </div>

                    {/* PILIH STATUS */}
                    <div>

                        <p className="mb-3 text-sm font-semibold text-slate-800">
                            Hasil Verifikasi
                        </p>

                        <div className="space-y-2">

                            {/* VERIFIED */}
                            <label
                                className={`
                                    flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition
                                    ${
                                        status === "verified"
                                            ? "border-emerald-300 bg-emerald-50"
                                            : "border-slate-200 hover:bg-slate-50"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="verified"
                                    checked={
                                        status === "verified"
                                    }
                                    onChange={() =>
                                        setStatus("verified")
                                    }
                                    className="h-4 w-4"
                                />

                                <div>
                                    <p className="text-sm font-medium text-emerald-700">
                                        Terima
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Laporan kegiatan sesuai dan dapat disahkan.
                                    </p>
                                </div>
                            </label>

                            {/* REVISION */}
                            <label
                                className={`
                                    flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition
                                    ${
                                        status === "revision"
                                            ? "border-orange-300 bg-orange-50"
                                            : "border-slate-200 hover:bg-slate-50"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="revision"
                                    checked={
                                        status === "revision"
                                    }
                                    onChange={() =>
                                        setStatus("revision")
                                    }
                                    className="h-4 w-4"
                                />

                                <div>
                                    <p className="text-sm font-medium text-orange-700">
                                        Perlu Revisi
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Laporan perlu diperbaiki oleh lembaga.
                                    </p>
                                </div>
                            </label>

                            {/* REJECTED */}
                            <label
                                className={`
                                    flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition
                                    ${
                                        status === "rejected"
                                            ? "border-red-300 bg-red-50"
                                            : "border-slate-200 hover:bg-slate-50"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    value="rejected"
                                    checked={
                                        status === "rejected"
                                    }
                                    onChange={() =>
                                        setStatus("rejected")
                                    }
                                    className="h-4 w-4"
                                />

                                <div>
                                    <p className="text-sm font-medium text-red-700">
                                        Tolak
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Laporan tidak dapat diterima.
                                    </p>
                                </div>
                            </label>

                        </div>
                    </div>

                    {/* CATATAN */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-800">
                            Catatan
                            {(status === "revision" ||
                                status === "rejected") && (
                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            )}
                        </label>

                        <textarea
                            value={catatan}
                            onChange={(e) =>
                                setCatatan(
                                    e.target.value,
                                )
                            }
                            rows={4}
                            placeholder={
                                status === "verified"
                                    ? "Tambahkan catatan jika diperlukan..."
                                    : "Jelaskan alasan revisi atau penolakan..."
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                px-4
                                py-3
                                text-sm
                                outline-none
                                transition
                                focus:border-indigo-400
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        />

                        {(status === "revision" ||
                            status === "rejected") &&
                            !catatan.trim() && (
                                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                                    <AlertTriangle size={13} />
                                    Catatan wajib diisi.
                                </p>
                            )}

                    </div>

                </div>

                {/* FOOTER */}
                <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 px-6 py-4">

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={processing}
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
                            disabled:opacity-50
                        "
                    >
                        Batal
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={
                            processing ||
                            ((status === "revision" ||
                                status === "rejected") &&
                                !catatan.trim())
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            px-5
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-indigo-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <CheckCircle size={17} />

                        {processing
                            ? "Menyimpan..."
                            : "Simpan Verifikasi"}
                    </button>

                </div>

            </div>
        </div>
    );
}