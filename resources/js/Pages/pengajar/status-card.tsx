import {
    CircleCheckBig,
    CircleX,
    Clock3,
} from "lucide-react";

type Props = {
    pengajar: any;
};

export default function StatusCard({ pengajar }: Props) {
    const config = (() => {
        switch (pengajar.status_verifikasi) {
            case "disetujui":
                return {
                    title: "Pengajar Disetujui",
                    badge: "Disetujui",
                    card: "border-emerald-200 bg-emerald-50",
                    badgeColor: "bg-emerald-100 text-emerald-700",
                    iconColor: "text-emerald-600",
                    Icon: CircleCheckBig,
                };

            case "ditolak":
                return {
                    title: "Pengajar Ditolak",
                    badge: "Ditolak",
                    card: "border-red-200 bg-red-50",
                    badgeColor: "bg-red-100 text-red-700",
                    iconColor: "text-red-600",
                    Icon: CircleX,
                };

            default:
                return {
                    title: "Menunggu Verifikasi",
                    badge: "Pending",
                    card: "border-amber-200 bg-amber-50",
                    badgeColor: "bg-amber-100 text-amber-700",
                    iconColor: "text-amber-600",
                    Icon: Clock3,
                };
        }
    })();

    const StatusIcon = config.Icon;

    return (
        <div className={`rounded-2xl border p-6 ${config.card}`}>

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-white p-3 shadow-sm">
                        <StatusIcon
                            className={`h-7 w-7 ${config.iconColor}`}
                        />
                    </div>

                    <div>

                        <h3 className="text-lg font-semibold text-slate-800">
                            {config.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Status Verifikasi Pengajar
                        </p>

                    </div>

                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${config.badgeColor}`}
                >
                    {config.badge}
                </span>

            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

                <div className="rounded-xl bg-white/70 p-4">

                    <p className="text-sm text-slate-500">
                        Tanggal Verifikasi
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                        {pengajar.verified_at
                            ? new Date(
                                  pengajar.verified_at
                              ).toLocaleDateString("id-ID", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                              })
                            : "-"}
                    </p>

                </div>

                <div className="rounded-xl bg-white/70 p-4">

                    <p className="text-sm text-slate-500">
                        Verifikator
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                        {pengajar.verifier?.name ?? "-"}
                    </p>

                </div>

            </div>

            {pengajar.catatan_verifikasi && (

                <div className="mt-5 rounded-xl bg-white/70 p-4">

                    <p className="text-sm font-medium text-slate-700">
                        Catatan Verifikasi
                    </p>

                    <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                        {pengajar.catatan_verifikasi}
                    </p>

                </div>

            )}

        </div>
    );
}