import AdminLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import WelcomeCard from "@/Components/dashboard/WelcomeCard";
import StatCard from "@/Components/dashboard/StatCard";
import ChartCard from "@/Components/dashboard/ChartCard";
import ActivityCard from "@/Components/dashboard/ActivityCard";
import QuickActionCard from "@/Components/dashboard/QuickActionCard";
import { DashboardData } from "@/types/dashboard";
import DashboardFilter from "@/Components/dashboard/DashboardFilter";

import {
    Building2,
    Users,
    Wallet,
    UserStar,
    CirclePile
} from "lucide-react";

export default function DindikDashboard({
    statistics,
    chart,
    activities,
    periode,
    selectedPeriode,
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

                <DashboardFilter
                    periode={periode}
                    value={selectedPeriode}
                    onChange={(value) => {
                        router.get(
                            route("dashboard"),
                            {
                                periode_id: value,
                            },
                            {
                                preserveState: true,
                                replace: true,
                            }
                        );
                    }}
                />

                {/* Statistik */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="Forum"
                        value={statistics.total_forum}
                        icon={CirclePile}
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
                        title="Total Siswa"
                        value={statistics.total_pengajar}
                        icon={UserStar}
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