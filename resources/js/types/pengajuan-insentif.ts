export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface Periode {
    id: number;
    tahun: string;
}

export interface Lembaga {
    id: number;
    nama: string;
}

export interface Pengajar {
    id: number;
    nama: string;
    nik: string;
}

export interface Verifier {
    id: number;
    name: string;
}

export interface PengajuanInsentif {
    id: number;
    status: "pending" | "verified" | "revision";
    catatan?: string | null;
    pengajar: Pengajar;
    verifier?: Verifier | null;
}

export interface Proposal {
    id: number;
    jumlah_guru: number;
    status: string;

    periode: Periode;
    lembaga: Lembaga;

    diajukan_count: number;
    pending_count: number;
    verified_count: number;
    revision_count: number;

    pengajuan_insentif?: PengajuanInsentif[];
}

export interface Filters {
    search: string;
    sort: string;
    order: string;
    per_page: number;
}

export interface IndexProps {
    pengajuanProposal: PaginationMeta<Proposal>;
    filters: Filters;
}