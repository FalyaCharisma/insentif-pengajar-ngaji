// resources/js/types/berita.ts

export interface Berita {
    id: number;
    judul: string;
    slug: string;
    kategori: string;
    excerpt: string | null;
    isi: string;
    gambar: string | null;
    published_at: string | null;
    is_published: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface BeritaItem {
    id: number;
    title: string;
    date: string;
    category: string;
    excerpt: string | null;
    image: string | null;
    slug: string;
}

export interface BeritaDetail extends BeritaItem {
    content: string;
}

export interface BeritaResponse {
    success: boolean;
    data: BeritaItem[];
}

export interface BeritaDetailResponse {
    success: boolean;
    data: BeritaDetail;
}