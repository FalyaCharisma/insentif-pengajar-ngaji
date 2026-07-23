<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KategoriLembaga;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index(Request $request)
    {
        $query = KategoriLembaga::query();

        // Search
        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%');
        }

        // Sorting
        $allowedSorts = ['id', 'nama', 'created_at'];

        $sort = in_array($request->sort, $allowedSorts) ? $request->sort : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        // Per Page
        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        // Pagination
        $kategori = $query->paginate($perPage)->withQueryString();

        return Inertia::render('kategori/index', [
            'kategori' => $kategori,

            'filters' => [
                'search' => $request->search ?? '',
                'sort' => $sort,
                'order' => $order,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        KategoriLembaga::create($validated);

        return back()->with('success', 'Kategori berhasil ditambahkan');
    }

    public function update(Request $request, KategoriLembaga $kategori)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $kategori->update($validated);

        return back()->with('success', 'Kategori berhasil diperbarui');
    }

    public function destroy(KategoriLembaga $kategori)
    {
        $jumlah = $kategori->lembaga()->count();

        if ($jumlah > 0) {
            return back()->with(
                'error',
                "Kategori tidak dapat dihapus karena masih digunakan oleh {$jumlah} lembaga."
            );
        }

        $kategori->delete();

        return back()->with(
            'success',
            'Kategori berhasil dihapus.'
        );
    }
}
