export type PengajuanProposal = {
    id: number;
    lembaga_id: number;
    tahun: number;
    jumlah_guru: number;
    jumlah_siswa: number;
    bukti_dukung?: string | null;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;

    /*
    |--------------------------------------------------------------------------
    | Relasi
    |--------------------------------------------------------------------------
    */

    lembaga?: {
        id: number;
        nama: string;
    };

    pengajuan_insentif?: {
        id: number;
        pengurus_id: number;
        tanggal: string;
        status: string;
    }[];
};