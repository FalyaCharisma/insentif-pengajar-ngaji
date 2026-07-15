export interface ProfilLembaga {
    id: number;
    lembaga_id: number;

    // Informasi Lembaga
    nomor_registrasi: string | null;
    tahun_berdiri: number | null;

    // Alamat
    alamat: string | null;
    provinsi: string | null;
    kabupaten: string | null;
    kecamatan: string | null;
    desa: string | null;
    kode_pos: string | null;

    // Kontak
    telepon: string | null;
    email: string | null;
    website: string | null;

    // Pimpinan
    nama_pimpinan: string | null;
    jabatan_pimpinan: string | null;

    // Operator
    nama_operator: string | null;
    no_hp_operator: string | null;

    // Rekening
    nama_bank: string | null;
    nomor_rekening: string | null;
    atas_nama_rekening: string | null;

    // Verifikasi
    status_verifikasi: "pending" | "disetujui" | "ditolak";
    catatan_verifikasi: string | null;
    verified_by: number | null;
    verified_at: string | null;

    created_at: string;
    updated_at: string;
}