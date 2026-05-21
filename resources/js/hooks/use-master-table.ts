import { useCallback } from "react";
import { useDataTable } from "./use-data-table";
import { useSearch } from "./use-search";
import { QueryParams } from "./use-query-params";

interface UseMasterTableOptions<T> {
    resource: {
        data: T[];
        meta: {
            current_page: number;
            per_page: number;
            last_page: number;
        };
    };
    columns: any[];
    params: QueryParams;
    setParamsWithWayfinder: (params: Partial<QueryParams>) => void;
    searchPlaceholder?: string;
}

export function useMasterTable<T>({
    resource,
    columns,
    params,
    setParamsWithWayfinder,
    searchPlaceholder = "Cari...",
}: UseMasterTableOptions<T>) {
    const { searchValue, handleSearch } = useSearch({
        initialValue: params.search || "",
        onSearch: useCallback(
            (value: string) => {
                setParamsWithWayfinder({
                    search: value.trim() || undefined,
                    page: 1,
                });
            },
            [setParamsWithWayfinder],
        ),
        debounceMs: 500,
    });

    const handleSort = useCallback(
        (columnId: string) => {
            const isCurrentSort = params.sort === columnId;
            const isDesc = isCurrentSort && params.order === "desc";
            const newOrder = isDesc ? "asc" : "desc";

            setParamsWithWayfinder({
                sort: columnId,
                order: newOrder,
            });
        },
        [params.sort, params.order, setParamsWithWayfinder],
    );

    const handlePageChange = useCallback(
        (page: number) => {
            setParamsWithWayfinder({ page });
        },
        [setParamsWithWayfinder],
    );

    const handlePerPageChange = useCallback(
        (perPage: number) => {
            setParamsWithWayfinder({ per_page: perPage });
        },
        [setParamsWithWayfinder],
    );

    const { table, handleSort: onSort, handlePageChange: onPageChange, handlePerPageChange: onPerPageChange } = useDataTable({
        data: resource.data,
        columns,
        pageCount: resource.meta.last_page,
        currentPage: resource.meta.current_page,
        pageSize: resource.meta.per_page,
        params,
        onSort: handleSort,
        onPageChange: handlePageChange,
        onPerPageChange: handlePerPageChange,
    });

    return {
        searchValue,
        handleSearch,
        table,
        onSort,
        onPageChange,
        onPerPageChange,
        searchPlaceholder,
    };
}

