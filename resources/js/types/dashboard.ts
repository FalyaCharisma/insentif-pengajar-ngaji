export interface Statistics {
    total_forum: number;
    total_lembaga: number;
    total_pengajar: number;
    total_proposal: number;
    total_pengajuan: number;
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
    chart: ChartData;
    activities: Activity[];
}