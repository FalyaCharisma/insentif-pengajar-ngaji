import AdminLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import WelcomeCard from "@/Components/dashboard/WelcomeCard";
import StatCard from "@/Components/dashboard/StatCard";
import ChartCard from "@/Components/dashboard/ChartCard";
import ActivityCard from "@/Components/dashboard/ActivityCard";
import QuickActionCard from "@/Components/dashboard/QuickActionCard";

import {
    FileClock,
    CheckCircle2,
    XCircle,
    ClipboardCheck,
} from "lucide-react";

export default function ForumDashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <AdminLayout>
                <div className="space-y-6">

                    <WelcomeCard
                        name="Forum"
                        role="Tim Verifikasi"
                    />

                    {/* Statistik */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Menunggu Verifikasi"
                            value={18}
                            icon={FileClock}
                            iconBg="bg-yellow-100"
                            iconColor="text-yellow-600"
                        />

                        <StatCard
                            title="Disetujui"
                            value={145}
                            icon={CheckCircle2}
                            iconBg="bg-green-100"
                            iconColor="text-green-600"
                        />

                        <StatCard
                            title="Ditolak"
                            value={12}
                            icon={XCircle}
                            iconBg="bg-red-100"
                            iconColor="text-red-600"
                        />

                        <StatCard
                            title="Total Verifikasi"
                            value={157}
                            icon={ClipboardCheck}
                            iconBg="bg-indigo-100"
                            iconColor="text-indigo-600"
                        />

                    </div>

                    {/* Grafik + Aksi Cepat */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                        <div className="xl:col-span-2">

                            <ChartCard
                                title="Statistik Verifikasi"
                                subtitle="Periode Tahun 2026"
                            >
                                <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-slate-200">
                                    <span className="text-slate-400">
                                        Grafik Verifikasi akan ditampilkan di sini
                                    </span>
                                </div>
                            </ChartCard>

                        </div>

                        <QuickActionCard
                            title="Aksi Cepat"
                            actions={[]}
                        />

                    </div>

                    {/* Aktivitas */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                        <ActivityCard
                            title="Verifikasi Terbaru"
                            activities={[]}
                        />

                        <ActivityCard
                            title="Menunggu Verifikasi"
                            activities={[]}
                        />

                    </div>

                </div>
            </AdminLayout>
        </>
    );
}