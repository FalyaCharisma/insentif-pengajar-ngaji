import { Forum } from "../types/forum";
import { Kategori } from "../types/kategori";
import { Periode } from "../types/periode";

export type MasterKuota = {
    id: number;

    periode_id: number;
    forum_id: number;
    kategori_id: number;

    jumlah_kuota: number;
    keterangan: string | null;

    periode: Periode;
    forum: Forum;
    kategori: Kategori;

    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export type MasterKuotaFilters = {
    search?: string;
    periode_id?: string | number;
    forum_id?: string | number;
    kategori_id?: string | number;
    sort?: string;
    direction?: string;
    per_page?: number;
};

export type MasterKuotaProps = {
    masterKuota: {
        data: MasterKuota[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };

    filters: MasterKuotaFilters;

    periodes: Periode[];

    forums: Forum[];

    kategoris: Kategori[];
};