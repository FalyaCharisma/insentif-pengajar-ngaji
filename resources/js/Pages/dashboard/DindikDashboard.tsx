import AdminLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import WelcomeCard from "@/Components/dashboard/WelcomeCard";
import StatCard from "@/Components/dashboard/StatCard";
import ChartCard from "@/Components/dashboard/ChartCard";
import { DashboardData } from "@/types/dashboard";
import DashboardFilter from "@/Components/dashboard/DashboardFilter";
import ReactApexChart from "react-apexcharts";

import {
    Building2,
    Users,
    UserStar,
    CirclePile
} from "lucide-react";

const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
];

export default function DindikDashboard({
    statistics,
    proposalSummary,
    chart,
    kategoriChart,
    kecamatanChart,
    pengajarKecamatanChart,
    pengajarWilayahChart,
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
                        iconBg="bg-yellow-100"
                        iconColor="text-yellow-600"
                    />

                    <StatCard
                        title="Lembaga"
                        value={statistics.total_lembaga}
                        icon={Building2}
                        iconBg="bg-green-100"
                        iconColor="text-green-600"
                    >
                        <div className="flex gap-2">
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                {statistics.verified_lembaga} Tervirifikasi
                            </span>

                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                {statistics.pending_lembaga} Pending
                            </span>
                        </div>
                    </StatCard>

                    <StatCard
                        title="Pengajar"
                        value={statistics.total_pengajar}
                        icon={Users}
                        iconBg="bg-blue-100"
                        iconColor="text-blue-600"
                    >
                        <div className="flex gap-2">
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                {statistics.verified_pengajar} Terverifikasi
                            </span>

                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                {statistics.pending_pengajar} Pending
                            </span>
                        </div>
                    </StatCard>

                    <StatCard
                        title="Siswa"
                        value={statistics.total_siswa}
                        icon={UserStar}
                        iconBg="bg-indigo-100"
                        iconColor="text-indigo-600"
                    />

                </div>

                {/* Chart Pengajuan Proposal */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    <div className="xl:col-span-1">
                        <ChartCard
                            title="Ringkasan Periode Aktif"
                            subtitle="Periode yang sedang dipilih"
                        >
                            
                            {/* Summary */}
                            <div className="space-y-3">

                                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-blue-500" />
                                        <span className="text-sm text-slate-600">
                                            Proposal Masuk
                                        </span>
                                    </div>

                                    <span className="text-xl font-bold text-slate-900">
                                        {proposalSummary.proposal}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-green-500" />
                                        <span className="text-sm text-slate-600">
                                            Terverifikasi
                                        </span>
                                    </div>

                                    <span className="text-xl font-bold text-green-600">
                                        {proposalSummary.verified}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-yellow-50 px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                        <span className="text-sm text-slate-600">
                                            Pending
                                        </span>
                                    </div>

                                    <span className="text-xl font-bold text-yellow-600">
                                        {proposalSummary.pending}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500" />
                                        <span className="text-sm text-slate-600">
                                            Revisi
                                        </span>
                                    </div>

                                    <span className="text-xl font-bold text-red-600">
                                        {proposalSummary.revision}
                                    </span>
                                </div>

                            </div>

                            <div className="mt-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-600">
                                        Progress Verifikasi Proposal
                                    </span>

                                    <span className="text-sm font-semibold text-green-600">
                                        {proposalSummary.progress}%
                                    </span>
                                </div>

                                <div className="h-2 rounded-full bg-slate-200">
                                    <div
                                        className="h-2 rounded-full bg-green-500 transition-all"
                                        style={{
                                            width: `${proposalSummary.progress}%`,
                                        }}
                                    />
                                </div>

                                <p className="mt-2 text-xs text-slate-500">
                                    Sebanyak{" "}
                                    <span className="font-semibold text-slate-700">
                                        {proposalSummary.verified}
                                    </span>{" "}
                                    dari{" "}
                                    <span className="font-semibold text-slate-700">
                                        {proposalSummary.proposal}
                                    </span>{" "}
                                    proposal telah terverifikasi dan dapat dilanjutkan ke proses pengajuan
                                    insentif.
                                </p>
                            </div>
                        </ChartCard>
                    </div>
                    
                    <div className="xl:col-span-2">
                        <ChartCard
                        title="Rekap Pengajar Penerima Insentif per Kecamatan"
                        subtitle="Perbandingan pengajar yang menerima dan tidak menerima insentif berdasarkan kecamatan lembaga"
                    >
                        {pengajarKecamatanChart?.categories?.length > 0 ? (
                            <ReactApexChart
                                type="bar"
                                height={380}
                                series={pengajarKecamatanChart.series}
                                options={{
                                    chart: {
                                        toolbar: {
                                            show: false,
                                        },
                                    },

                                    plotOptions: {
                                        bar: {
                                            horizontal: true,
                                            borderRadius: 6,
                                            barHeight: "55%",
                                        },
                                    },

                                    xaxis: {
                                        categories: pengajarKecamatanChart.categories,
                                        min: 0,
                                    },

                                    colors: ["#10B981", "#EF4444"],

                                    dataLabels: {
                                        enabled: true,
                                    },

                                    legend: {
                                        show: true,
                                        position: "top",
                                        horizontalAlign: "left",
                                    },

                                    grid: {
                                        borderColor: "#E2E8F0",
                                    },
                                }}
                            />
                        ) : (
                            <div className="flex h-[380px] items-center justify-center">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-500">
                                        Belum ada data pengajar
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Data penerima insentif per kecamatan akan ditampilkan di sini.
                                    </p>
                                </div>
                            </div>
                        )}
                    </ChartCard>
                    </div>

                </div>
                
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {/* Trend Pengajuan Proposal */}
                    <ChartCard
                        title="Trend Pengajuan Proposal"
                        subtitle="5 Periode Terakhir"
                    >
                        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-3">
                            <ReactApexChart
                                type="bar"
                                height={300}
                                series={chart.series}
                                options={{
                                    chart: {
                                        toolbar: {
                                            show: false,
                                        },
                                    },

                                    xaxis: {
                                        categories: chart.categories,
                                    },

                                    legend: {
                                        position: "top",
                                        horizontalAlign: "left",
                                    },

                                    dataLabels: {
                                        enabled: false,
                                    },

                                    plotOptions: {
                                        bar: {
                                            borderRadius: 6,
                                            columnWidth: "45%",
                                        },
                                    },

                                    grid: {
                                        borderColor: "#E2E8F0",
                                    },

                                    yaxis: {
                                        min: 0,
                                    },
                                }}
                            />
                        </div>
                    </ChartCard>


                    {/* Statistik Pengajar Berdasarkan Wilayah */}
                    <ChartCard
                        title="Distribusi Pengajar Berdasarkan Wilayah"
                        subtitle="Perbandingan pengajar Kota Kediri dan luar Kota Kediri"
                    >
                        <div className="flex items-center justify-center">
                            <ReactApexChart
                                type="donut"
                                height={330}
                                series={pengajarWilayahChart.series}
                                options={{
                                    labels: pengajarWilayahChart.labels,

                                    chart: {
                                        toolbar: {
                                            show: false,
                                        },
                                    },

                                    colors: ["#4F46E5", "#F97316"],

                                    legend: {
                                        position: "bottom",
                                        horizontalAlign: "center",
                                        fontSize: "12px",
                                    },

                                    dataLabels: {
                                        enabled: true,
                                        formatter: (val: number | string) =>
                                            `${Math.round(Number(val))}%`,
                                    },

                                    plotOptions: {
                                        pie: {
                                            donut: {
                                                size: "55%",

                                                labels: {
                                                    show: true,

                                                    name: {
                                                        show: true,
                                                        fontSize: "11px",
                                                    },

                                                    value: {
                                                        show: true,
                                                        fontSize: "18px",
                                                        fontWeight: 700,
                                                    },

                                                    total: {
                                                        show: true,
                                                        label: "Total Pengajar",
                                                        fontSize: "11px",
                                                        formatter: (w) => {
                                                            return w.globals.seriesTotals
                                                                .reduce(
                                                                    (
                                                                        a: number,
                                                                        b: number,
                                                                    ) => a + b,
                                                                    0,
                                                                )
                                                                .toString();
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },

                                    stroke: {
                                        width: 3,
                                    },

                                    tooltip: {
                                        y: {
                                            formatter: (value) =>
                                                `${value} pengajar`,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </ChartCard>

                </div>

                {/* Aktivitas */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    <ChartCard
                        title="Distribusi Kategori Lembaga"
                        subtitle="Berdasarkan kategori lembaga"
                    >
                        <div className="grid grid-cols-[1fr_180px] items-center gap-4">

                            <ReactApexChart
                                type="donut"
                                height={300}
                                series={kategoriChart.series}
                                options={{
                                    labels: kategoriChart.labels,
                                    colors,

                                    chart: {
                                        toolbar: {
                                            show: false,
                                        },
                                    },

                                    legend: {
                                        show: false,
                                    },

                                    dataLabels: {
                                        enabled: false,
                                    },

                                    stroke: {
                                        width: 3,
                                        colors: ["#fff"],
                                    },

                                    plotOptions: {
                                        pie: {
                                            expandOnClick: true,

                                            donut: {
                                                size: "55%",

                                                labels: {
                                                    show: true,

                                                    total: {
                                                        show: true,
                                                        label: "Total",
                                                        formatter: () =>
                                                            kategoriChart.series
                                                                .reduce((a, b) => a + b, 0)
                                                                .toString(),
                                                    },
                                                },
                                            },
                                        },
                                    },
                                }}
                            />

                            {/* Custom Legend */}
                            <div className="space-y-3">
                                {kategoriChart.labels.map((label, index) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{
                                                    backgroundColor: colors[index],
                                                }}
                                            />

                                            <span className="text-sm text-slate-600">
                                                {label}
                                            </span>
                                        </div>

                                        <span className="font-semibold text-slate-900">
                                            {kategoriChart.series[index]}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </ChartCard>

                    <ChartCard
                        title="Sebaran Lembaga per Kecamatan"
                        subtitle="Jumlah lembaga pada setiap kecamatan"
                    >
                        <ReactApexChart
                            type="bar"
                            height={320}
                            series={kecamatanChart.series}
                            options={{
                                chart: {
                                    toolbar: {
                                        show: false,
                                    },
                                },

                                plotOptions: {
                                    bar: {
                                        horizontal: true,
                                        borderRadius: 6,
                                        barHeight: "45%",
                                    },
                                },

                                xaxis: {
                                    categories: kecamatanChart.categories,
                                },

                                dataLabels: {
                                    enabled: true,
                                },

                                legend: {
                                    show: false,
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