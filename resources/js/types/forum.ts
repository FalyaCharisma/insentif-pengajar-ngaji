export type Forum = {
    id: number;
    nama: string;
    kategori_id: number;
    nik: string;

    kategori?: {
        id: number;
        nama: string;
    };

    created_at?: string;
    updated_at?: string;
};