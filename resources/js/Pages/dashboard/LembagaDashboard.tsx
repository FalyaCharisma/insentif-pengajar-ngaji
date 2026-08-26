import AdminLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import WelcomeCard from "@/Components/dashboard/WelcomeCard";
import StatCard from "@/Components/dashboard/StatCard";
import ChartCard from "@/Components/dashboard/ChartCard";
import { usePage } from "@inertiajs/react";
import { DashboardData } from "@/types/dashboard";
import DashboardFilter from "@/Components/dashboard/DashboardFilter";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

import {
    BadgeCheck,
    Users,
    UserStar,
    FileText,
    Building2
} from "lucide-react";

const getStatusBadge = (status: string) => {
    switch (status) {
        case "disetujui":
            return {
                label: "Terverifikasi",
                className: "bg-green-100 text-green-700",
            };

        case "pending":
            return {
                label: "Pending",
                className: "bg-yellow-100 text-yellow-700",
            };

        case "ditolak":
            return {
                label: "Ditolak",
                className: "bg-red-100 text-red-700",
            };

        default:
            return {
                label: "-",
                className: "bg-slate-100 text-slate-700",
            };
    }
};

export default function LembagaDashboard({
    statistics,
    profileProgress,
    periode,
    selectedPeriode,
    currentPeriode,
    profileSummary,
    teacherChart
}: DashboardData) {

    const { auth } = usePage().props as any;

    const user = auth?.user;

    const status = getStatusBadge(profileSummary.status);

    return (
        <>
            <Head title="Dashboard" />
            <AdminLayout>

                <div className="space-y-6">

                    <WelcomeCard
                        name={auth.user.name}
                        role=""
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
                            title="Status Profil"
                            value={
                                statistics.status_profil === "disetujui"
                                    ? "Terverifikasi"
                                    : statistics.status_profil === "pending"
                                    ? "Pending"
                                    : "Ditolak"
                            }
                            icon={BadgeCheck}
                            iconBg="bg-green-100"
                            iconColor="text-green-600"
                        />

                        <StatCard
                            title="Pengajar"
                            value={statistics.total_pengajar}
                            icon={Users}
                            iconBg="bg-blue-100"
                            iconColor="text-blue-600"
                        />

                        <StatCard
                            title="Siswa"
                            value={statistics.total_siswa}
                            icon={UserStar}
                            iconBg="bg-amber-100"
                            iconColor="text-amber-600"
                        />

                        <StatCard
                            title="Status Proposal"
                            value={
                                statistics.status_proposal === "verified"
                                    ? "Disetujui"
                                    : statistics.status_proposal === "pending"
                                    ? "Pending"
                                    : statistics.status_proposal === "revision"
                                    ? "Revisi"
                                    : "Belum"
                            }
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
                                subtitle={`${profileProgress.completed} dari ${profileProgress.total} bagian telah dilengkapi`}
                            >
                                <div className="space-y-6">

                                    {/* Progress */}
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-600">
                                                Kelengkapan Profil
                                            </span>

                                            <span className="text-lg font-bold text-indigo-600">
                                                {profileProgress.progress}%
                                            </span>
                                        </div>

                                        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                                            <div
                                                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                                                style={{
                                                    width: `${profileProgress.progress}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Checklist */}
                                    <div className="grid grid-cols-2 gap-3">

                                        {profileProgress.items.map((item: any) => (
                                            <div
                                                key={item.title}
                                                className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
                                            >
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                        item.completed
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-yellow-100 text-yellow-600"
                                                    }`}
                                                >
                                                    {item.completed ? "✓" : "!"}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-slate-700">
                                                        {item.title}
                                                    </p>

                                                    <p className="text-xs text-slate-500">
                                                        {item.completed
                                                            ? "Sudah lengkap"
                                                            : "Belum lengkap"}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                </div>
                            </ChartCard>
                        </div>

                        <ChartCard
                            title="Periode Aktif"
                            subtitle="Informasi pengajuan proposal"
                        >
                            <div className="space-y-5">

                                <div className="rounded-xl bg-indigo-50 p-4">
                                    <p className="text-sm text-slate-500">Tahun Periode</p>
                                    <p className="mt-1 text-3xl font-bold text-indigo-700">
                                        {currentPeriode.tahun}
                                    </p>
                                </div>

                                <div className="space-y-3">

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">
                                            Mulai Upload
                                        </span>

                                        <span className="font-medium text-slate-700">
                                            {dayjs(currentPeriode.mulai_upload).format("DD MMMM YYYY")}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-500">
                                            Batas Upload
                                        </span>

                                        <span className="font-medium text-slate-700">
                                            {dayjs(currentPeriode.selesai_upload).format("DD MMMM YYYY")}
                                        </span>
                                    </div>

                                </div>

                                <div className="border-t pt-4">

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                                            currentPeriode.status
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {currentPeriode.status
                                            ? "Periode Sedang Berlangsung"
                                            : "Periode Ditutup"}
                                    </span>

                                </div>

                            </div>
                        </ChartCard>
                    </div>

                    {/* Aktivitas */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                        <ChartCard
                            title="Ringkasan Profil"
                            subtitle="Informasi lembaga"
                        >
                            {/* Header */}
                            <div className="mb-6 flex flex-col items-center">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
                                    <Building2 className="h-8 w-8 text-indigo-600" />
                                </div>

                                <h3 className="mt-3 text-lg font-bold text-slate-800">
                                    {profileSummary.nama}
                                </h3>

                                <p className="text-sm text-slate-500">
                                    No. Registrasi {profileSummary.nomor_registrasi}
                                </p>

                            </div>

                            {/* Info */}
                            <div className="space-y-3">

                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-xs text-slate-500">
                                        Kategori
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {profileSummary.kategori}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-xs text-slate-500">
                                        Forum
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {profileSummary.forum}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-xs text-slate-500">
                                        Status Verifikasi
                                    </p>

                                    <span
                                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                                    >
                                        {status.label}
                                    </span>
                                </div>

                            </div>

                        </ChartCard>

                        <ChartCard
                            title="Distribusi Pengajar"
                            subtitle="Berdasarkan pendidikan dan jenis kelamin"
                        >

                            <ReactApexChart
                                type="bar"
                                height={300}
                                series={teacherChart.series}
                                options={{

                                    colors: [
                                        "#2563EB", // Laki-laki
                                        "#F59E0B", // Perempuan
                                    ],

                                    chart: {
                                        stacked: true,
                                        toolbar: {
                                            show: false,
                                        },
                                    },

                                    xaxis: {
                                        categories: teacherChart.categories,
                                    },

                                    legend: {
                                        position: "top",
                                        horizontalAlign: "left",
                                    },

                                    plotOptions: {
                                        bar: {
                                            borderRadius: 6,
                                            columnWidth: "50%",
                                        },
                                    },

                                    dataLabels: {
                                        enabled: false,
                                    },

                                    grid: {
                                        borderColor: "#E2E8F0",
                                    },
                                }}
                            />

                        </ChartCard>

                    </div>

                </div>

            </AdminLayout>
        </>
    );
}