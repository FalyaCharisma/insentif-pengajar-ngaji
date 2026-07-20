export type PengajuanProposal = {
    id: number;
    lembaga_id: number;
    periode_id: number;

    bukti_dukung?: string | null;

    status: "pending" | "verified" | "revision";

    catatan?: string | null;

    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;

    lembaga?: {
        id: number;
        nama: string;
    };

    periode?: {
        id: number;
        tahun: number;
    };
};