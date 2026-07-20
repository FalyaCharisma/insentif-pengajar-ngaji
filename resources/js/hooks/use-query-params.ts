import { router } from "@inertiajs/react";

export type QueryParams = {
    [key: string]: string | number | undefined;
};

export function useQueryParams(route: string, params: QueryParams) {
    const setParams = (newParams: Partial<QueryParams>) => {
        router.get(
            route,
            {
                ...params,
                ...newParams,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return {
        setParams,
    };
}
