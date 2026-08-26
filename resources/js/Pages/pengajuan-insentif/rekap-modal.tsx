import { useEffect, useState } from "react";
import axios from "axios";
import { FileSpreadsheet, X } from "lucide-react";
import { Periode } from "@/types/periode";

type RekapSummary = {
    total_pengajar: number;
    menerima: number;
    pending: number;
    tidak_menerima: number;
};

type Props = {
    open: boolean;
    onClose: () => void;
    periode: Periode[];
};

export default function RekapModal({
    open,
    onClose,
    periode,
}: Props) {
    const [selectedPeriode, setSelectedPeriode] = useState("");
    const [summary, setSummary] = useState<RekapSummary | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedPeriode) {
            setSummary(null);
            return;
        }

        const fetchSummary = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    route("pengajuan-insentif.rekap.preview"),
                    {
                        params: {
                            periode_id: selectedPeriode,
                        },
                    },
                );

                setSummary(response.data);
            } catch (error) {
                console.error(
                    "Gagal mengambil rekap insentif:",
                    error,
                );

                setSummary(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [selectedPeriode]);

    if (!open) return null;

    const handleClose = () => {
        setSelectedPeriode("");
        setSummary(null);
        onClose();
    };

    const handleDownload = () => {
        if (!selectedPeriode) return;

        window.location.href = route(
            "pengajuan-insentif.rekap.export",
            {
                periode_id: selectedPeriode,
            },
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Rekap Data Insentif
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Rekap data penerima dan status pengajuan
                            insentif berdasarkan periode.
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
                <div className="space-y-6 px-6 py-6">

                    {/* PERIODE */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Periode
                        </label>

                        <select
                            value={selectedPeriode}
                            onChange={(e) =>
                                setSelectedPeriode(e.target.value)
                            }
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-4
                                text-sm
                                outline-none
                                transition
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        >
                            <option value="">
                                Pilih periode...
                            </option>

                            {periode.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.tahun}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* RINGKASAN */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-slate-800">
                            Data yang akan diunduh
                        </h3>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                            {/* TOTAL */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs text-slate-500">
                                    Total Pengajar
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {loading
                                        ? "..."
                                        : summary?.total_pengajar ?? "-"}
                                </p>
                            </div>

                            {/* MENERIMA */}
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                <p className="text-xs text-emerald-700">
                                    Menerima
                                </p>

                                <p className="mt-1 text-2xl font-bold text-emerald-700">
                                    {loading
                                        ? "..."
                                        : summary?.menerima ?? "-"}
                                </p>
                            </div>

                            {/* PENDING */}
                            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                                <p className="text-xs text-amber-700">
                                    Menunggu Verifikasi
                                </p>

                                <p className="mt-1 text-2xl font-bold text-amber-700">
                                    {loading
                                        ? "..."
                                        : summary?.pending ?? "-"}
                                </p>
                            </div>

                            {/* TIDAK MENERIMA */}
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                                <p className="text-xs text-red-700">
                                    Tidak Menerima
                                </p>

                                <p className="mt-1 text-2xl font-bold text-red-700">
                                    {loading
                                        ? "..."
                                        : summary?.tidak_menerima ?? "-"}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* KETERANGAN */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-slate-800">
                            Data yang disertakan dalam Excel
                        </p>

                        <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
                            <div>• Status insentif</div>
                            <div>• Nama lembaga</div>
                            <div>• Alamat</div>
                            <div>• Pimpinan</div>
                            <div>• NIK pengajar</div>
                            <div>• Nomor rekening</div>
                            <div>• Nomor telepon</div>
                        </div>
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
                        onClick={handleDownload}
                        disabled={!selectedPeriode || loading}
                        className="
                            inline-flex
                            h-10
                            items-center
                            gap-2
                            rounded-xl
                            bg-emerald-600
                            px-5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-emerald-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <FileSpreadsheet size={17} />
                        Download Excel
                    </button>

                </div>

            </div>
        </div>
    );
}