import AdminLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import WelcomeCard from "@/Components/dashboard/WelcomeCard";
import StatCard from "@/Components/dashboard/StatCard";
import ChartCard from "@/Components/dashboard/ChartCard";
import ActivityCard from "@/Components/dashboard/ActivityCard";
import QuickActionCard from "@/Components/dashboard/QuickActionCard";
import { DashboardData } from "@/types/dashboard";

import {
    Building2,
    Users,
    FileText,
    Wallet,
} from "lucide-react";

export default function DindikDashboard({
    statistics,
    chart,
    activities,
}: DashboardData) {
    return (
        <>
        <Head title="Dashboard" />
        <AdminLayout>

            <div className="space-y-6">

                {/* Welcome */}
                <WelcomeCard
                    name="Dinas Pendidikan"
                    role="Administrator"
                />

                {/* Statistik */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="Forum"
                        value={statistics.total_forum}
                        icon={Wallet}
                    />

                     <StatCard
                        title="Total Lembaga"
                        value={statistics.total_lembaga}
                        icon={Building2}
                    />

                    <StatCard
                        title="Total Pengajar"
                        value={statistics.total_pengajar}
                        icon={Users}
                    />

                    <StatCard
                        title="Proposal"
                        value={statistics.total_proposal}
                        icon={FileText}
                    />

                    <StatCard
                        title="Pengajuan"
                        value={statistics.total_pengajuan}
                        icon={Wallet}
                    />

                </div>

                {/* Chart + Quick Action */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    <div className="xl:col-span-2">

                    <ChartCard
                        title="Pengajuan Bulanan"
                        subtitle="Tahun 2026"
                    >
                        <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-slate-200">
                            <span className="text-slate-400">
                                Grafik akan ditampilkan di sini
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
                        title="Aktivitas Terbaru"
                        activities={[]}
                    />

                    <ActivityCard
                        title="Pengajuan Pending"
                        activities={[]}
                    />

                </div>

            </div>

        </AdminLayout>
        </>
    );
}