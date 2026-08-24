import { Periode } from "./periode";

export interface Statistics {
    total_forum: number;
    total_lembaga: number;
    total_pengajar: number;
    total_siswa: number;
    total_proposal: number;
    total_pengajuan: number;
    verified_lembaga: number;
    pending_lembaga: number;
    verified_pengajar: number;
    pending_pengajar: number;
    status_profil: string;
    status_proposal: string;
}

export interface ProposalSummary {
    proposal: number;
    verified: number;
    pending: number;
    revision: number;
    progress: number;
}

export interface ChartData {
    categories: string[];
    series: {
        name: string;
        data: number[];
    }[];
}

export interface DonutChartData {
    labels: string[];
    series: number[];
}

export interface HorizontalChartData {
    categories: string[];
    series: {
        name: string;
        data: number[];
    }[];
}

export interface ProfileProgressItem {
    title: string;
    completed: boolean;
}

export interface ProfileProgress {
    progress: number;
    completed: number;
    total: number;
    items: ProfileProgressItem[];
}

export interface Activity {
    title: string;
    description: string;
    time: string;
}

export interface CurrentPeriode {
    tahun: string;
    mulai_upload: string;
    selesai_upload: string;
    status: number;
}

export interface ProfileSummary {
    nama: string;
    kategori: string;
    forum: string;
    nomor_registrasi: string;
    status: string;
}

export interface TeacherChart {
    categories: string[];
    series: {
        name: string;
        data: number[];
    }[];
}

export interface DashboardData {
    statistics: Statistics;

    proposalSummary: ProposalSummary;

    chart: ChartData;

    kategoriChart: DonutChartData;
    kecamatanChart: HorizontalChartData;

    profileProgress: ProfileProgress;

    currentPeriode: CurrentPeriode;

    profileSummary: ProfileSummary;

    teacherChart: TeacherChart;

    activities: Activity[];

    periode: Periode[];

    selectedPeriode: number;

    pengajarKecamatanChart: ChartData;

    pengajarWilayahChart: DonutChartData;
}