import { Lembaga } from "./lembaga";
import { Periode } from "./periode";

export type Siswa = {
    id: number;
    periode_id: number;
    lembaga_id: number;
    jumlah_siswa: number;

    periode: Periode;
    lembaga: Lembaga;

    estimasi_kuota: number;

    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};