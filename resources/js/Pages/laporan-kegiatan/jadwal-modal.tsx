import { useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { router } from "@inertiajs/react";

type Props = {
    open: boolean;
    onClose: () => void;
    periodeId: number;
    periodeTahun: number | null;
    jadwal?: any;
};

export default function JadwalModal({
    open,
    onClose,
    periodeId,
    periodeTahun,
    jadwal,
}: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);

    if (!open) return null;

    const handleClose = () => {
        setFile(null);
        onClose();
    };

    const handleSubmit = () => {
        if (!file || !periodeId) return;

        setProcessing(true);

        router.post(
            route("laporan-kegiatan.jadwal.upload"),
            {
                periode_id: periodeId,
                file_jadwal: file,
            },
            {
                forceFormData: true,

                onSuccess: () => {
                    setFile(null);
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
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                                <FileText size={20} />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {jadwal
                                        ? "Ganti Jadwal Kegiatan"
                                        : "Upload Jadwal Kegiatan"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Periode {periodeTahun ?? "-"}
                                </p>
                            </div>
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
                <div className="space-y-5 px-6 py-6">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            File Jadwal Kegiatan
                        </label>

                        <label
                            className="
                                flex
                                cursor-pointer
                                flex-col
                                items-center
                                justify-center
                                rounded-xl
                                border-2
                                border-dashed
                                border-slate-300
                                bg-slate-50
                                px-6
                                py-8
                                text-center
                                transition
                                hover:border-cyan-400
                                hover:bg-cyan-50
                            "
                        >
                            <Upload
                                size={28}
                                className="text-slate-400"
                            />

                            <p className="mt-3 text-sm font-medium text-slate-700">
                                {file
                                    ? file.name
                                    : "Pilih file jadwal"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Format PDF, maksimal 2 MB
                            </p>

                            <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={(e) => {
                                    const selected = e.target.files?.[0] ?? null;

                                    if (!selected) {
                                        setFile(null);
                                        return;
                                    }

                                    // Maksimal 2 MB
                                    if (selected.size > 2 * 1024 * 1024) {
                                        alert("Ukuran file maksimal 2 MB.");
                                        e.target.value = "";
                                        setFile(null);
                                        return;
                                    }

                                    // Hanya PDF
                                    if (selected.type !== "application/pdf") {
                                        alert("File jadwal harus berformat PDF.");
                                        e.target.value = "";
                                        setFile(null);
                                        return;
                                    }

                                    setFile(selected);
                                }}
                            />
                        </label>
                    </div>

                    {file && (
                        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                            <div className="flex items-center gap-3">
                                <FileText
                                    size={20}
                                    className="text-cyan-600"
                                />

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-slate-800">
                                        {file.name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

                    <button
                        type="button"
                        onClick={handleClose}
                        className="
                            h-10
                            rounded-xl
                            border
                            border-slate-200
                            px-5
                            text-sm
                            font-medium
                            text-slate-600
                            hover:bg-slate-50
                        "
                    >
                        Batal
                    </button>

                    <button
                        type="button"
                        disabled={!file || processing}
                        onClick={handleSubmit}
                        className="
                            inline-flex
                            h-10
                            items-center
                            gap-2
                            rounded-xl
                            bg-cyan-600
                            px-5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-cyan-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <Upload size={17} />

                        {processing
                            ? "Mengupload..."
                            : jadwal
                              ? "Ganti Jadwal"
                              : "Upload Jadwal"}
                    </button>

                </div>
            </div>
        </div>
    );
}