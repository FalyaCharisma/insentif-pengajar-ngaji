import { FileText, Pencil, X } from "lucide-react";

type Props = {
    open: boolean;
    jadwal: any;
    periodeTahun: number | null;
    canEdit?: boolean;
    onClose: () => void;
    onEdit: () => void;
};

export default function JadwalPreviewModal({
    open,
    jadwal,
    periodeTahun,
    canEdit = false,
    onClose,
    onEdit,
}: Props) {
    if (!open || !jadwal) return null;

    const jadwalList = Array.isArray(jadwal) ? jadwal : [jadwal];

    if (jadwalList.length === 0) return null;

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
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-slate-100 p-4">
                    {jadwalList.map((item: any) => {
                        const fileUrl = item.file_jadwal
                            ? `/storage/${item.file_jadwal}`
                            : null;

                        return (
                            <div
                                key={item.id}
                                className="rounded-xl bg-white p-3 shadow-sm"
                            >
                                {fileUrl ? (
                                    <iframe
                                        src={fileUrl}
                                        title={`Preview Jadwal Kegiatan ${item.id}`}
                                        className="h-[600px] w-full rounded-xl border border-slate-200 bg-white"
                                    />
                                ) : (
                                    <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500">
                                        File jadwal tidak tersedia.
                                    </div>
                                )}
                            </div>
                        );
                    })}
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

                    {canEdit && (
                        <button
                            type="button"
                            onClick={onEdit}
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
                                hover:bg-cyan-700
                            "
                        >
                            <Pencil size={16} />
                            Ganti Jadwal
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}