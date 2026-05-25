export interface Kategori {
    id: number;
    nama: string;
}

export interface Lembaga {
    id: number;
    kategori_id: number;

    nama: string;
    alamat: string;

    kelurahan_id?: number | null;
    kelurahan: string;

    kecamatan_id?: number | null;
    kecamatan: string;

    kabkota_id?: number | null;
    kabkota: string;

    telp?: string | null;
    email?: string | null;

    jumlah_guru: number;
    jumlah_siswa: number;

    sk?: string | null;
    file_pendukung?: string | null;

    created_at: string;
    updated_at: string;
    deleted_at?: string | null;

    kategori?: Kategori;
}

export interface PaginatedLembaga {
    data: Lembaga[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}