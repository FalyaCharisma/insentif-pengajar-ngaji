<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

abstract class Controller
{
    use AuthorizesRequests;

    /**
     * DataTable Helper
     */
    protected function datatable(
        Builder $query,
        Request $request,
        array $searchable = [],
        array $sortable = [],
        array $filters = [],
        int $defaultPerPage = 10
    ) {
        // Search
        if ($request->filled('search') && !empty($searchable)) {
            $query->where(function ($q) use ($request, $searchable) {
                foreach ($searchable as $column) {
                    $q->orWhere($column, 'like', "%{$request->search}%");
                }
            });
        }

        // Filter
        foreach ($filters as $filter) {
            if ($request->filled($filter)) {
                $query->where($filter, $request->$filter);
            }
        }

        // Sort
        $sort = in_array($request->sort, $sortable)
            ? $request->sort
            : ($sortable[0] ?? 'id');

        $order = $request->order === 'asc'
            ? 'asc'
            : 'desc';

        $query->orderBy($sort, $order);

        // Pagination
        $perPage = (int) $request->input('per_page', $defaultPerPage);

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = $defaultPerPage;
        }

        return $query
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Mengembalikan filter agar tidak perlu ditulis berulang.
     */
    protected function filters(
        Request $request,
        array $additional = []
    ): array {
        return array_merge([
            'search' => $request->search ?? '',
            'sort' => $request->sort ?? '',
            'order' => $request->order ?? '',
            'per_page' => $request->input('per_page', 10),
        ], collect($additional)->mapWithKeys(fn($field) => [
            $field => $request->$field ?? '',
        ])->toArray());
    }
}