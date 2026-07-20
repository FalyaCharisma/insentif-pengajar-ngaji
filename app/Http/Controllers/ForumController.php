<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Forum;
use App\Models\KategoriLembaga;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index(Request $request)
    {
        $query = Forum::with('kategori');

        // SEARCH
        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                  ->orWhere('nik', 'like', '%' . $request->search . '%');
        }

        // SORTING
        $allowedSorts = ['id', 'nama', 'nik', 'created_at'];

        $sort = in_array($request->sort, $allowedSorts)
            ? $request->sort
            : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        // PER PAGE
        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        // PAGINATION
        $forum = $query->paginate($perPage)->withQueryString();

        return Inertia::render('forum/index', [
            'forum' => $forum,
            'kategori' => KategoriLembaga::all(),

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
            'kategori_id' => 'required|exists:kategori,id',
            'nik' => 'required|string|max:20',
        ]);

        Forum::create($validated);

        return back()->with('success', 'Forum berhasil ditambahkan');
    }

    public function update(Request $request, Forum $forum)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategori,id',
            'nik' => 'required|string|max:20',
        ]);

        $forum->update($validated);

        return back()->with('success', 'Forum berhasil diperbarui');
    }

    public function destroy(Forum $forum)
    {
        $forum->delete();

        return back()->with('success', 'Forum berhasil dihapus');
    }
}