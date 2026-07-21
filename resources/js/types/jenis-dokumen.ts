export interface JenisDokumen {
    id: number;
    nama: string;
    is_required: boolean;

    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export interface PaginatedJenisDokumen {
    data: JenisDokumen[];

    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;

    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}