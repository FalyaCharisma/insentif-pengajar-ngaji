import { FileText, Pencil, X } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
    jadwal: any;
    periodeTahun: number | null;
    onEdit: () => void;
};

export default function JadwalPreviewModal({
    open,
    onClose,
    jadwal,
    periodeTahun,
    onEdit,
}: Props) {
    if (!open || !jadwal) return null;

    const fileUrl = `/storage/${jadwal.file_jadwal}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                            <FileText size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Jadwal Kegiatan
                            </h2>

                            <p className="text-sm text-slate-500">
                                Periode {periodeTahun ?? "-"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* PDF PREVIEW */}
                <div className="min-h-0 flex-1 bg-slate-100 p-4">
                    <iframe
                        src={fileUrl}
                        title="Preview Jadwal Kegiatan"
                        className="h-full w-full rounded-xl border border-slate-200 bg-white"
                    />
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

                    <button
                        type="button"
                        onClick={onClose}
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
                        Tutup
                    </button>

                    <button
                        type="button"
                        onClick={onEdit}
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
                        "
                    >
                        <Pencil size={17} />
                        Ganti Jadwal
                    </button>

                </div>
            </div>
        </div>
    );
}