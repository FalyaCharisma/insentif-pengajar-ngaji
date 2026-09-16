import { User } from "./user";
import { ProfilLembaga } from "./profil-lembaga";
import { Kategori } from "./kategori";

export interface Forum {
    id: number;
    user_id: number;
    kategori_id: number;
    kode: string;
    nama: string;
    telepon?: string | null;
    status: string;

    kategori?: Kategori;
}

export interface Lembaga {
    id: number;

    user_id: number;
    kategori_id: number;
    forum_id: number;

    kode: string;
    nama: string;

    kategori?: Kategori;
    forum?: Forum;
    user?: User;
    profil: ProfilLembaga | null;
}

export interface PaginatedLembaga {
    data: Lembaga[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}