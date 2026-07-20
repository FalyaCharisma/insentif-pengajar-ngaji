export interface User {
    id: number;
    name: string;
    username: string;
    email: string | null;
    role: string[];
    force_change_password: boolean;
    status: "aktif" | "nonaktif";
    lembaga_id?: number;
}