import AdminLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import WelcomeCard from "@/Components/dashboard/WelcomeCard";
import StatCard from "@/Components/dashboard/StatCard";
import ChartCard from "@/Components/dashboard/ChartCard";
import ActivityCard from "@/Components/dashboard/ActivityCard";
import QuickActionCard from "@/Components/dashboard/QuickActionCard";

import {
    Users,
    Building2,
    GraduationCap,
    FileCheck2,
} from "lucide-react";

export default function SuperadminDashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <AdminLayout>

                <div className="space-y-6">

                    <WelcomeCard
                        name="Super Administrator"
                        role="Superadmin"
                    />

                    {/* Statistik */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Total User"
                            value={245}
                            icon={Users}
                            iconBg="bg-blue-100"
                            iconColor="text-blue-600"
                        />

                        <StatCard
                            title="Total Lembaga"
                            value={78}
                            icon={Building2}
                            iconBg="bg-indigo-100"
                            iconColor="text-indigo-600"
                        />

                        <StatCard
                            title="Total Pengajar"
                            value={1350}
                            icon={GraduationCap}
                            iconBg="bg-green-100"
                            iconColor="text-green-600"
                        />

                        <StatCard
                            title="Total Pengajuan"
                            value={310}
                            icon={FileCheck2}
                            iconBg="bg-amber-100"
                            iconColor="text-amber-600"
                        />

                    </div>

                    {/* Grafik + Quick Action */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                        <div className="xl:col-span-2">

                            <ChartCard
                                title="Statistik Sistem"
                                subtitle="Seluruh data aplikasi"
                            >
                                <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-slate-200">
                                    <span className="text-slate-400">
                                        Grafik Sistem akan ditampilkan di sini
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
                            title="Aktivitas Sistem"
                            activities={[]}
                        />

                        <ActivityCard
                            title="User Terbaru"
                            activities={[]}
                        />

                    </div>

                </div>

            </AdminLayout>
        </>
    );
}