export interface PendidikItem {
    id: string;
    nama: string;
    jabatan: string;
    foto: string;
}

export interface LembagaItem {
    id: string;
    nama: string;
    jenis: string;
    kelurahan: string;
    pendidik: number;
    status: "Tervalidasi" | "Proses" | "Perbaikan";

    alamat: string;
    latitude: number;
    longitude: number;

    daftarPendidik: PendidikItem[];
}

export interface KecamatanStats {
    lembaga: number;
    pendidik: number;
    tervalidasi: number;
    insentif: string;
}

export interface KecamatanLabel {
    x: number;
    y: number;
}

export interface KecamatanItem {
    id: string;
    name: string;
    path: string;

    label: KecamatanLabel;

    stats: KecamatanStats;

    lembaga: LembagaItem[];
}

export interface BeritaItem {
    title: string;
    date: string;
    category: string;
    excerpt: string;
}