export type Forum = {
    id: number;
    nama: string;
    kategori_id: number | null;
    kategori?: Kategori | null;
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
    kategori_id: number | null;

    kategori?: Kategori | null;
    forum?: Forum | null;
};