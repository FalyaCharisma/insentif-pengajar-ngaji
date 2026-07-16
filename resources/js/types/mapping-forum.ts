export type Forum = {
    id: number;
    nama: string;
};

export type Kategori = {
    id: number;
    nama: string;
};

export type Lembaga = {
    id: number;
    kode: string;
    nama: string;
    forum_id: number | null;

    kategori: Kategori;

    forum?: Forum | null;
};