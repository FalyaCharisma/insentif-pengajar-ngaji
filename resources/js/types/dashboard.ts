import { Periode } from "./periode";

export interface Statistics {
    total_forum: number;
    total_lembaga: number;
    total_pengajar: number;
    total_proposal: number;
    total_pengajuan: number;
    verified_lembaga: number;
    pending_lembaga: number;
    verified_pengajar: number;
    pending_pengajar: number;
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

export interface Activity {
    title: string;
    description: string;
    time: string;
}

export interface DashboardData {
    statistics: Statistics;

    proposalSummary: ProposalSummary;

    chart: ChartData;

    activities: Activity[];

    periode: Periode[];

    selectedPeriode: number;
}