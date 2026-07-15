import { User } from "./user";
import { ProfilLembaga } from "./profil-lembaga";
import { Kategori } from "./kategori";

export interface Lembaga {
    id: number;

    user_id: number;
    kategori_id: number;

    kode: string;
    nama: string;

    kategori?: Kategori;
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