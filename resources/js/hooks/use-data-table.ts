import { useCallback, useMemo, useState } from "react";
import {
    getCoreRowModel,
    useReactTable,
    ColumnDef,
    PaginationState,
    SortingState,
    getExpandedRowModel,
    ExpandedState,
    Row,
    OnChangeFn,
} from "@tanstack/react-table";
import { QueryParams } from "./use-query-params";

interface UseDataTableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    pageCount: number;
    currentPage: number;
    pageSize: number;
    params: QueryParams;
    onSort: (columnId: string) => void;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
    enableExpanding?: boolean;
    getRowCanExpand?: (row: Row<T>) => boolean;
    expanded?: ExpandedState;
    onExpandedChange?: OnChangeFn<ExpandedState>;
}

interface UseDataTableReturn<T> {
    table: ReturnType<typeof useReactTable<T>>;
    handleSort: (columnId: string) => void;
    handlePageChange: (page: number) => void;
    handlePerPageChange: (perPage: number) => void;
}

export function useDataTable<T>({
    data,
    columns,
    pageCount,
    currentPage,
    pageSize,
    params,
    onSort,
    onPageChange,
    onPerPageChange,
    enableExpanding = false,
    getRowCanExpand,
    expanded,
    onExpandedChange,
}: UseDataTableProps<T>): UseDataTableReturn<T> {
    // Memoize pagination state
    const paginationState = useMemo<PaginationState>(
        () => ({
            pageIndex: Math.max(0, (currentPage || 1) - 1),
            pageSize: pageSize || 10,
        }),
        [currentPage, pageSize],
    );

    // Memoize sorting state
    const sortingState = useMemo<SortingState>(() => {
        return params.sort
            ? [
                  {
                      id: params.sort,
                      desc: params.order === "desc",
                  },
              ]
            : [];
    }, [params.sort, params.order]);

    // State untuk expanding - gunakan external state jika disediakan, atau internal state
    const [internalExpandedState, setInternalExpandedState] =
        useState<ExpandedState>({});
    const expandedState =
        expanded !== undefined ? expanded : internalExpandedState;
    const setExpandedState =
        onExpandedChange !== undefined
            ? onExpandedChange
            : setInternalExpandedState;

    // Memoized table instance - tambahkan data, pageCount sebagai dependency untuk reactive update
    const table = useReactTable({
        data,
        columns,
        manualSorting: true,
        manualFiltering: true,
        manualPagination: true,
        pageCount,
        state: {
            pagination: paginationState,
            sorting: sortingState,
            expanded: expandedState,
        },
        onExpandedChange: setExpandedState, // Handler untuk mengubah expanded state
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        // Force update ketika data berubah
        getRowId: (row, index) => String(index), // Ensure unique row IDs
        getRowCanExpand: enableExpanding
            ? getRowCanExpand || (() => true)
            : () => false,
        enableExpanding,
    });

    // Optimized handlers
    const handleSort = useCallback(
        (columnId: string) => {
            onSort(columnId);
        },
        [onSort],
    );

    const handlePageChange = useCallback(
        (page: number) => {
            onPageChange(page);
        },
        [onPageChange],
    );

    const handlePerPageChange = useCallback(
        (perPage: number) => {
            onPerPageChange(perPage);
        },
        [onPerPageChange],
    );

    return {
        table,
        handleSort,
        handlePageChange,
        handlePerPageChange,
    };
}
