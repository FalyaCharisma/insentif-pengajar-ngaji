import AdminLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import WelcomeCard from "@/Components/dashboard/WelcomeCard";
import StatCard from "@/Components/dashboard/StatCard";
import ChartCard from "@/Components/dashboard/ChartCard";
import ActivityCard from "@/Components/dashboard/ActivityCard";
import QuickActionCard from "@/Components/dashboard/QuickActionCard";

import {
    BadgeCheck,
    Users,
    FolderOpen,
    FileText,
} from "lucide-react";

export default function LembagaDashboard() {

    return (
        <>
            <Head title="Dashboard" />
            <AdminLayout>

                <div className="space-y-6">

                    <WelcomeCard
                        name="Nama Lembaga"
                        role="Lembaga"
                    />

                    {/* Statistik */}

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Status Profil"
                            value="Terverifikasi"
                            icon={BadgeCheck}
                            iconBg="bg-green-100"
                            iconColor="text-green-600"
                        />

                        <StatCard
                            title="Total Pengajar"
                            value={32}
                            icon={Users}
                            iconBg="bg-blue-100"
                            iconColor="text-blue-600"
                        />

                        <StatCard
                            title="Dokumen"
                            value={12}
                            icon={FolderOpen}
                            iconBg="bg-amber-100"
                            iconColor="text-amber-600"
                        />

                        <StatCard
                            title="Pengajuan"
                            value={8}
                            icon={FileText}
                            iconBg="bg-indigo-100"
                            iconColor="text-indigo-600"
                        />

                    </div>

                    {/* Progress + Quick Action */}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                        <div className="xl:col-span-2">

                            <ChartCard
                                title="Progress Kelengkapan Profil"
                                subtitle="Data lembaga"
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
                            title="Status Dokumen"
                            activities={[]}
                        />

                    </div>

                </div>

            </AdminLayout>
        </>
    );
}