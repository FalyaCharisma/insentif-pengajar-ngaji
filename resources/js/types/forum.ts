export type Forum = {
    id: number;
    user_id: number;

    kode: string;
    nama: string;
    telepon?: string | null;
    status: "aktif" | "nonaktif";

    user?: {
        id: number;
        name: string;
        email: string;
        role?: string;
    };

    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
};