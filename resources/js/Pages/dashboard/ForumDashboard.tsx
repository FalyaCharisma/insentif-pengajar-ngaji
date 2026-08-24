import AdminLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";

import WelcomeCard from "@/Components/dashboard/WelcomeCard";
import StatCard from "@/Components/dashboard/StatCard";
import ChartCard from "@/Components/dashboard/ChartCard";
import ActivityCard from "@/Components/dashboard/ActivityCard";
import QuickActionCard from "@/Components/dashboard/QuickActionCard";
import DashboardFilter from "@/Components/dashboard/DashboardFilter";
import type { Periode } from "@/types/periode";
import ReactApexChart from "react-apexcharts";
import { Building2, Users, FileText, BadgeCheck } from "lucide-react";

import {
    FileClock,
    CheckCircle2,
    RefreshCcw,
    ClipboardCheck,
} from "lucide-react";

type Summary = {
    total: number;
    verified: number;
    pending: number;
    progress?: number;
};

type VerificationSummary = {
    total: number;
    verified: number;
    pending: number;
    revision: number;
    progress: number;
};

type InsentifProgress = {
    total_kuota: number;
    dipilih: number;
    sisa_kuota: number;
    progress: number;
};

type KategoriChart = {
    labels: string[];
    series: number[];
};

type PengajarLembagaChart = {
    categories: string[];

    series: {
        name: string;
        data: number[];
    }[];
};

type PageProps = {
    auth: {
        user: {
            id: number;
            name: string;
        };
    };

    lembagaSummary: Summary;
    pengajarSummary: Summary;
    proposalSummary: Summary;
    insentifSummary: Summary;

    insentifProgress: InsentifProgress;
    kategoriChart: KategoriChart;
    pengajarLembagaChart: PengajarLembagaChart;

    periode: Periode[];
    selectedPeriode: number | null;
};
export default function ForumDashboard() {
    const {
        auth,
        lembagaSummary,
        pengajarSummary,
        proposalSummary,
        insentifSummary,
        insentifProgress,
        kategoriChart,
        pengajarLembagaChart,
        periode,
        selectedPeriode,
    } = usePage<PageProps>().props;

    const user = auth?.user;
    const getPercentage = (value: number, total: number) => {
        if (total === 0) return 0;

        return Math.round((value / total) * 100);
    };

    const verificationChartSeries = [
        {
            name: "Terverifikasi",
            data: [
                getPercentage(
                    lembagaSummary?.verified ?? 0,
                    lembagaSummary?.total ?? 0,
                ),
                getPercentage(
                    pengajarSummary?.verified ?? 0,
                    pengajarSummary?.total ?? 0,
                ),
                getPercentage(
                    proposalSummary?.verified ?? 0,
                    proposalSummary?.total ?? 0,
                ),
            ],
        },
        {
            name: "Pending",
            data: [
                getPercentage(
                    lembagaSummary?.pending ?? 0,
                    lembagaSummary?.total ?? 0,
                ),
                getPercentage(
                    pengajarSummary?.pending ?? 0,
                    pengajarSummary?.total ?? 0,
                ),
                getPercentage(
                    proposalSummary?.pending ?? 0,
                    proposalSummary?.total ?? 0,
                ),
            ],
        },
    ];
    const verificationChartOptions = {
        chart: {
            type: "bar" as const,
            stacked: true,
            stackType: "100%" as const,
            toolbar: {
                show: false,
            },
        },

        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 5,
                barHeight: "45%",
            },
        },

        dataLabels: {
            enabled: true,

            formatter: (value: number) => {
                return value > 0 ? `${Math.round(value)}%` : "";
            },
        },

        xaxis: {
            categories: ["Lembaga", "Pengajar", "Proposal"],

            max: 100,

            labels: {
                formatter: (value: string) => `${value}%`,
            },
        },

        legend: {
            position: "top" as const,
            horizontalAlign: "right" as const,
        },

        grid: {
            borderColor: "#E2E8F0",
            strokeDashArray: 4,
        },

        tooltip: {
            y: {
                formatter: (value: number) => `${Math.round(value)}%`,
            },
        },
    };

    return (
        <>
            <Head title="Dashboard Forum" />

            <AdminLayout>
                <div className="space-y-6">
                    {/* Welcome */}
                    <WelcomeCard name={user?.name ?? "Forum"} role="Forum" />

                    {/* Filter Periode */}
                    <DashboardFilter
                        periode={periode}
                        value={selectedPeriode ?? 0}
                        onChange={(value) => {
                            router.get(
                                route("dashboard"),
                                {
                                    periode_id: value,
                                },
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                    replace: true,
                                },
                            );
                        }}
                    />

                    {/* Statistik */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            title="Lembaga"
                            value={lembagaSummary?.total ?? 0}
                            icon={Building2}
                            iconBg="bg-green-100"
                            iconColor="text-green-600"
                        >
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    {lembagaSummary?.verified ?? 0}{" "}
                                    Terverifikasi
                                </span>

                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                    {lembagaSummary?.pending ?? 0} Pending
                                </span>
                            </div>
                        </StatCard>

                        <StatCard
                            title="Pengajar"
                            value={pengajarSummary?.total ?? 0}
                            icon={Users}
                            iconBg="bg-blue-100"
                            iconColor="text-blue-600"
                        >
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    {pengajarSummary?.verified ?? 0}{" "}
                                    Terverifikasi
                                </span>

                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                    {pengajarSummary?.pending ?? 0} Pending
                                </span>
                            </div>
                        </StatCard>

                        <StatCard
                            title="Pengajuan Proposal"
                            value={proposalSummary?.total ?? 0}
                            icon={FileText}
                            iconBg="bg-yellow-100"
                            iconColor="text-yellow-600"
                        >
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    {proposalSummary?.verified ?? 0}{" "}
                                    Terverifikasi
                                </span>

                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                    {proposalSummary?.pending ?? 0} Pending
                                </span>
                            </div>
                        </StatCard>

                        <StatCard
                            title="Pengajuan Insentif"
                            value={insentifSummary?.total ?? 0}
                            icon={BadgeCheck}
                            iconBg="bg-indigo-100"
                            iconColor="text-indigo-600"
                        >
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    {insentifSummary?.verified ?? 0}{" "}
                                    Terverifikasi
                                </span>

                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                    {insentifSummary?.pending ?? 0} Pending
                                </span>
                            </div>
                        </StatCard>
                    </div>

                    {/* Chart + Quick Action */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {/* Progress Pengajuan Insentif */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6">
                                <h3 className="text-base font-semibold text-slate-800">
                                    Progress Pengajuan Insentif
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Pemenuhan kuota penerima insentif pada
                                    periode terpilih
                                </p>
                            </div>

                            {/* Statistik */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-500">
                                        Total Kuota
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-slate-800">
                                        {insentifProgress?.total_kuota ?? 0}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-green-50 p-4">
                                    <p className="text-xs text-slate-500">
                                        Dipilih
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-green-600">
                                        {insentifProgress?.dipilih ?? 0}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-yellow-50 p-4">
                                    <p className="text-xs text-slate-500">
                                        Sisa Kuota
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-yellow-600">
                                        {insentifProgress?.sisa_kuota ?? 0}
                                    </p>
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="mt-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Pemenuhan Kuota
                                    </span>

                                    <span className="text-sm font-semibold text-slate-700">
                                        {insentifProgress?.progress ?? 0}%
                                    </span>
                                </div>

                                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                                        style={{
                                            width: `${insentifProgress?.progress ?? 0}%`,
                                        }}
                                    />
                                </div>

                                <p className="mt-3 text-sm text-slate-500">
                                    {insentifProgress?.dipilih ?? 0} dari{" "}
                                    {insentifProgress?.total_kuota ?? 0} kuota
                                    penerima telah dipilih.
                                </p>
                            </div>
                        </div>

                        {/* Status Verifikasi nanti di sini */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-slate-800">
                                    Status Verifikasi
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Perbandingan data terverifikasi dan menunggu
                                    verifikasi
                                </p>
                            </div>

                            <ReactApexChart
                                type="bar"
                                height={280}
                                series={verificationChartSeries}
                                options={verificationChartOptions}
                            />
                        </div>
                    </div>

                    {/* Visualisasi Data Lembaga */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {/* Distribusi Kategori Lembaga */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-slate-800">
                                    Distribusi Kategori Lembaga
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Komposisi lembaga berdasarkan kategori
                                </p>
                            </div>

                            {kategoriChart?.series?.length > 0 ? (
                                <ReactApexChart
                                    type="donut"
                                    height={300}
                                    series={kategoriChart.series}
                                    options={{
                                        labels: kategoriChart.labels,

                                        chart: {
                                            toolbar: {
                                                show: false,
                                            },
                                        },

                                        legend: {
                                            position: "bottom",
                                        },

                                        dataLabels: {
                                            enabled: true,
                                        },

                                        plotOptions: {
                                            pie: {
                                                donut: {
                                                    size: "65%",

                                                    labels: {
                                                        show: true,

                                                        total: {
                                                            show: true,
                                                            label: "Total Lembaga",

                                                            formatter: () =>
                                                                String(
                                                                    lembagaSummary?.total ??
                                                                        0,
                                                                ),
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            ) : (
                                <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">
                                    Belum ada data kategori lembaga
                                </div>
                            )}
                        </div>

                        {/* Pengajar per Lembaga */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-slate-800">
                                    Pengajar per Lembaga
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    Jumlah pengajar pada setiap lembaga
                                </p>
                            </div>

                            {pengajarLembagaChart?.categories?.length > 0 ? (
                                <ReactApexChart
                                    type="bar"
                                    height={300}
                                    series={pengajarLembagaChart.series}
                                    options={{
                                        chart: {
                                            toolbar: {
                                                show: false,
                                            },
                                        },

                                        plotOptions: {
                                            bar: {
                                                horizontal: true,
                                                borderRadius: 5,
                                                barHeight: "45%",
                                            },
                                        },

                                        dataLabels: {
                                            enabled: true,
                                        },

                                        xaxis: {
                                            categories:
                                                pengajarLembagaChart.categories,

                                            min: 0,

                                            labels: {
                                                formatter: (value) =>
                                                    Math.round(
                                                        Number(value),
                                                    ).toString(),
                                            },
                                        },

                                        grid: {
                                            borderColor: "#E2E8F0",
                                            strokeDashArray: 4,
                                        },

                                        legend: {
                                            show: false,
                                        },

                                        tooltip: {
                                            y: {
                                                formatter: (value) =>
                                                    `${value} Pengajar`,
                                            },
                                        },
                                    }}
                                />
                            ) : (
                                <div className="flex h-[300px] items-center justify-center text-sm text-slate-400">
                                    Belum ada data pengajar
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
