<?php

namespace App\Http\Controllers;

use App\Models\Periode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeriodeController extends Controller
{
    public function index(Request $request)
    {
        $query = Periode::query();

        // Search
        if ($request->filled('search')) {
            $query->where('tahun', 'like', '%' . $request->search . '%');
        }

        // Sorting
        $sort = $request->get('sort', 'id');
        $direction = $request->get('direction', 'desc');

        $allowedSort = [
            'id',
            'tahun',
            'mulai_upload',
            'selesai_upload',
            'status',
            'created_at',
        ];

        if (! in_array($sort, $allowedSort)) {
            $sort = 'id';
        }

        $query->orderBy($sort, $direction);

        return Inertia::render('periode/index', [
            'periode' => $query->paginate(10)->withQueryString(),

            'filters' => [
                'search' => $request->search,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tahun' => ['required', 'digits:4'],
            'mulai_upload' => ['required', 'date'],
            'selesai_upload' => ['required', 'date', 'after_or_equal:mulai_upload'],
            'status' => ['required', 'boolean'],
        ]);

        // Hanya boleh satu periode aktif
        if ($validated['status']) {
            Periode::query()->update([
                'status' => false,
            ]);
        }

        Periode::create($validated);

        return back()->with(
            'success',
            'Periode berhasil ditambahkan.'
        );
    }

    public function update(Request $request, Periode $periode)
    {
        $validated = $request->validate([
            'tahun' => ['required', 'digits:4'],
            'mulai_upload' => ['required', 'date'],
            'selesai_upload' => ['required', 'date', 'after_or_equal:mulai_upload'],
            'status' => ['required', 'boolean'],
        ]);

        // Hanya satu periode aktif
        if ($validated['status']) {
            Periode::where('id', '!=', $periode->id)
                ->update([
                    'status' => false,
                ]);
        }

        $periode->update($validated);

        return back()->with(
            'success',
            'Periode berhasil diperbarui.'
        );
    }

    public function destroy(Periode $periode)
    {
        $periode->delete();

        return back()->with(
            'success',
            'Periode berhasil dihapus.'
        );
    }
}