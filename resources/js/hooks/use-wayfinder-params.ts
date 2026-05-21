import { router } from "@inertiajs/react";
import { useCallback } from "react";
import { QueryParams } from "./use-query-params";

interface UseWayfinderParamsOptions {
    controller: any;
    reloadKeys?: string[];
}

export function useWayfinderParams({ 
    controller, 
    reloadKeys = ['resource'] 
}: UseWayfinderParamsOptions) {
    return useCallback(
        (newParams: Partial<QueryParams>) => {
            const currentUrl = new URL(window.location.href);
            const currentParams: any = {};

            for (const [key, value] of currentUrl.searchParams.entries()) {
                if (key === 'page' || key === 'per_page') {
                    currentParams[key] = parseInt(value, 10);
                } else if (key === 'order') {
                    currentParams[key] = value as 'asc' | 'desc';
                } else {
                    currentParams[key] = value;
                }
            }

            const finalParams = { ...currentParams };

            Object.entries(newParams).forEach(([key, value]) => {
                if (value === undefined || value === null || value === "") {
                    delete finalParams[key];
                } else {
                    finalParams[key] = value;
                }
            });

            if (!finalParams.per_page) {
                finalParams.per_page = 10;
            }

            if (newParams.page !== undefined) {
                finalParams.page = newParams.page;
            } else if (newParams.search !== undefined || newParams.sort !== undefined) {
                finalParams.page = 1;
            } else if (newParams.per_page !== undefined) {
                finalParams.page = 1;
            } else if (!finalParams.page) {
                finalParams.page = 1;
            }

            router.get(
                controller.index.url({ query: finalParams }),
                {},
                {
                    preserveState: false,
                    preserveScroll: true,
                    replace: true,
                    only: reloadKeys,
                }
            );
        },
        [controller, reloadKeys]
    );
}

