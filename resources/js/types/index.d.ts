export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface PendidikItem {
    id: string;
    nama: string;
    jabatan: string;
    foto: string; // URL foto
}

export interface LembagaDetailItem extends LembagaItem {
    id: string;
    alamat: string;
    daftarPendidik: PendidikItem[];
}
