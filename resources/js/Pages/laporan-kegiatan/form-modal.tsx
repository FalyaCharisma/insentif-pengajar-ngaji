import { useEffect, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { router } from "@inertiajs/react";

type Props = {
    open: boolean;
    onClose: () => void;
    periodeId: number;
    periodeTahun: number | null;
    laporan?: any;
};

export default function FormModal({
    open,
    onClose,
    periodeId,
    periodeTahun,
    laporan,
}: Props) {
    const [namaKegiatan, setNamaKegiatan] = useState("");
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalSelesai, setTanggalSelesai] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [processing, setProcessing] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Isi Form Saat Edit
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!open) return;

        if (laporan) {
            setNamaKegiatan(laporan.nama_kegiatan ?? "");
            setTanggalMulai(laporan.tanggal_mulai ?? "");
            setTanggalSelesai(laporan.tanggal_selesai ?? "");
            setKeterangan(laporan.keterangan ?? "");
            setFile(null);
        } else {
            setNamaKegiatan("");
            setTanggalMulai("");
            setTanggalSelesai("");
            setKeterangan("");
            setFile(null);
        }
    }, [laporan, open]);

    if (!open) return null;

    /*
    |--------------------------------------------------------------------------
    | Close
    |--------------------------------------------------------------------------
    */

    const handleClose = () => {
        setNamaKegiatan("");
        setTanggalMulai("");
        setTanggalSelesai("");
        setKeterangan("");
        setFile(null);

        onClose();
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = () => {
        if (
            !namaKegiatan ||
            !tanggalMulai ||
            !tanggalSelesai ||
            !periodeId
        ) {
            return;
        }

        setProcessing(true);

        const data = {
            periode_id: periodeId,
            nama_kegiatan: namaKegiatan,
            tanggal_mulai: tanggalMulai,
            tanggal_selesai: tanggalSelesai,
            keterangan: keterangan || null,
            file_bukti: file,
        };

        /*
        |--------------------------------------------------------------------------
        | EDIT
        |--------------------------------------------------------------------------
        */

        if (laporan) {
            router.post(
                route(
                    "laporan-kegiatan.update",
                    laporan.id,
                ),
                {
                    ...data,
                    _method: "PUT",
                },
                {
                    forceFormData: true,

                    onSuccess: () => {
                        handleClose();
                    },

                    onFinish: () => {
                        setProcessing(false);
                    },
                },
            );

            return;
        }

        /*
        |--------------------------------------------------------------------------
        | CREATE
        |--------------------------------------------------------------------------
        */

        router.post(
            route("laporan-kegiatan.store"),
            data,
            {
                forceFormData: true,

                onSuccess: () => {
                    handleClose();
                },

                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex items-start justify-between border-b border-slate-200 px-6 py-3">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            {laporan
                                ? "Edit Kegiatan"
                                : "Tambah Kegiatan"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Periode {periodeTahun ?? "-"}
                        </p>
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

                    {/* NAMA KEGIATAN */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Nama Kegiatan
                        </label>

                        <input
                            type="text"
                            value={namaKegiatan}
                            onChange={(e) =>
                                setNamaKegiatan(e.target.value)
                            }
                            placeholder="Masukkan nama kegiatan"
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                px-4
                                text-sm
                                outline-none
                                transition
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        />
                    </div>

                    {/* TANGGAL */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Tanggal Mulai
                            </label>

                            <input
                                type="date"
                                value={tanggalMulai}
                                onChange={(e) =>
                                    setTanggalMulai(e.target.value)
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    px-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-indigo-500
                                    focus:ring-2
                                    focus:ring-indigo-100
                                "
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Tanggal Selesai
                            </label>

                            <input
                                type="date"
                                value={tanggalSelesai}
                                min={tanggalMulai || undefined}
                                onChange={(e) =>
                                    setTanggalSelesai(e.target.value)
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    px-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-indigo-500
                                    focus:ring-2
                                    focus:ring-indigo-100
                                "
                            />
                        </div>

                    </div>

                    {/* KETERANGAN */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Keterangan
                        </label>

                        <textarea
                            value={keterangan}
                            onChange={(e) =>
                                setKeterangan(e.target.value)
                            }
                            rows={4}
                            placeholder="Masukkan keterangan kegiatan..."
                            className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-slate-200
                                px-4
                                py-3
                                text-sm
                                outline-none
                                transition
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        />
                    </div>

                    {/* FILE */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            File Bukti Kegiatan
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
                                py-7
                                text-center
                                transition
                                hover:border-indigo-400
                                hover:bg-indigo-50
                            "
                        >
                            <Upload
                                size={26}
                                className="text-slate-400"
                            />

                            <p className="mt-3 text-sm font-medium text-slate-700">
                                {file
                                    ? file.name
                                    : laporan?.file_bukti
                                      ? "Pilih file baru untuk mengganti"
                                      : "Pilih file bukti kegiatan"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                PDF atau JPG/PNG, maksimal 2 MB
                            </p>

                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="hidden"
                                onChange={(e) => {
                                    const selected =
                                        e.target.files?.[0] ?? null;

                                    if (!selected) {
                                        setFile(null);
                                        return;
                                    }

                                    const allowedTypes = [
                                        "application/pdf",
                                        "image/jpeg",
                                        "image/png",
                                    ];

                                    if (
                                        !allowedTypes.includes(
                                            selected.type,
                                        )
                                    ) {
                                        alert(
                                            "File harus berupa PDF, JPG, JPEG, atau PNG.",
                                        );

                                        e.target.value = "";
                                        setFile(null);
                                        return;
                                    }

                                    if (
                                        selected.size >
                                        2 * 1024 * 1024
                                    ) {
                                        alert(
                                            "Ukuran file maksimal 2 MB.",
                                        );

                                        e.target.value = "";
                                        setFile(null);
                                        return;
                                    }

                                    setFile(selected);
                                }}
                            />
                        </label>

                        {file && (
                            <div className="mt-3 flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-3">
                                <FileText
                                    size={20}
                                    className="text-indigo-600"
                                />

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-slate-800">
                                        {file.name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {(
                                            file.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{" "}
                                        MB
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* FILE LAMA */}
                        {!file &&
                            laporan?.file_bukti && (
                                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <p className="text-xs text-slate-500">
                                        File saat ini
                                    </p>

                                    <p className="mt-1 truncate text-sm font-medium text-slate-700">
                                        {laporan.file_bukti
                                            .split("/")
                                            .pop()}
                                    </p>
                                </div>
                            )}
                    </div>
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
                        disabled={
                            !namaKegiatan ||
                            !tanggalMulai ||
                            !tanggalSelesai ||
                            processing
                        }
                        onClick={handleSubmit}
                        className="
                            inline-flex
                            h-10
                            items-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            px-5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-indigo-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <FileText size={17} />

                        {processing
                            ? "Menyimpan..."
                            : laporan
                              ? "Simpan Perubahan"
                              : "Simpan Kegiatan"}
                    </button>

                </div>
            </div>
        </div>
    );
}