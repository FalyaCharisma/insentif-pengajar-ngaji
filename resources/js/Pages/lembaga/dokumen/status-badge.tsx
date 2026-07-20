import {
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

type Props = {
    status?: "pending" | "disetujui" | "ditolak";
    catatan?: string | null;
};

export default function StatusBadge({
    status = "pending",
    catatan,
}: Props) {

    const config = {
        pending: {
            title: "Menunggu Verifikasi",
            badge: "Pending",
            icon: Clock3,
            card: "border-amber-200 bg-amber-50",
            badgeColor: "bg-amber-100 text-amber-700",
            iconColor: "text-amber-600",
        },

        disetujui: {
            title: "Dokumen Disetujui",
            badge: "Disetujui",
            icon: CheckCircle2,
            card: "border-green-200 bg-green-50",
            badgeColor: "bg-green-100 text-green-700",
            iconColor: "text-green-600",
        },

        ditolak: {
            title: "Dokumen Ditolak",
            badge: "Ditolak",
            icon: XCircle,
            card: "border-red-200 bg-red-50",
            badgeColor: "bg-red-100 text-red-700",
            iconColor: "text-red-600",
        },
    }[status];

    const Icon = config.icon;

    return (
        <div className={`rounded-2xl border p-6 ${config.card}`}>

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-white p-3 shadow-sm">
                        <Icon
                            className={`h-7 w-7 ${config.iconColor}`}
                        />
                    </div>

                    <div>

                        <h3 className="text-lg font-semibold text-slate-800">
                            {config.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Status Verifikasi Dokumen
                        </p>

                    </div>

                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${config.badgeColor}`}
                >
                    {config.badge}
                </span>

            </div>

            {status === "pending" && catatan && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-100 p-3">

                    <p className="font-medium text-amber-700">
                        Menunggu Verifikasi Ulang
                    </p>

                    <p className="mt-1 text-sm text-amber-600">
                        Dokumen telah diperbarui dan sedang menunggu proses verifikasi ulang.
                    </p>

                </div>
            )}

            {catatan && (
                <div className="mt-5 rounded-xl bg-white/70 p-4">

                    <p className="text-sm font-medium text-slate-700">
                        {status === "pending"
                            ? "Catatan Verifikasi Sebelumnya"
                            : "Catatan Verifikasi"}
                    </p>

                    <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                        {catatan}
                    </p>

                </div>
            )}

        </div>
    );
}