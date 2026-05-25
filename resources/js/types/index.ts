export interface LembagaItem {
  nama: string;
  jenis: string;
  kelurahan: string;
  pendidik: number;
  status: "Tervalidasi" | "Proses" | "Perbaikan";
}

export interface KecamatanItem {
  id: string;
  name: string;
  path: string;
  label: {
    x: number;
    y: number;
  };
  stats: {
    lembaga: number;
    pendidik: number;
    tervalidasi: number;
    insentif: string;
  };
  lembaga: LembagaItem[];
}

export interface BeritaItem {
  title: string;
  date: string;
  category: string;
  excerpt: string;
}