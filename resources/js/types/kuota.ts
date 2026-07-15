import { Lembaga } from "./lembaga";
import { Periode } from "./periode";

export type Kuota = {
    id: number;

    periode_id: number;
    lembaga_id: number;

    estimasi_kuota: number;
    kuota_final: number;
    keterangan: string | null;

    periode: Periode;
    lembaga: Lembaga;

    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};