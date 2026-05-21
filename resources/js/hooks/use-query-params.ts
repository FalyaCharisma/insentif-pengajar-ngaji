import { router } from "@inertiajs/react";

export type QueryParams = {
    search?: string;
    sort?: string;
    order?: "asc" | "desc";
    page?: number;
    per_page?: number;
};

export function useQueryParams(
    route: string,
    params: QueryParams
) {

    const setParams = (
        newParams: Partial<QueryParams>
    ) => {

        router.get(
            route,
            {
                ...params,
                ...newParams,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return {
        setParams,
    };
}