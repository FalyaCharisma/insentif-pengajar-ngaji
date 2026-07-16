<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MappingKategoriController extends Controller
{
    public function index(Request $request)
    {
        $kategori = Kategori::orderBy('nama')->get();

        $selectedKategori = $request->filled('kategori_id') ? (int) $request->kategori_id : null;

        if (!$selectedKategori && $kategori->isNotEmpty()) {
            $selectedKategori = $kategori->first()->id;
        }

        $query = Lembaga::with(['kategori', 'forum']);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')->orWhere('kode', 'like', '%' . $request->search . '%');
            });
        }

        return Inertia::render('mapping-kategori/index', [
            'kategori' => $kategori,

            'selectedKategori' => $selectedKategori,

            'lembagas' => $query
                ->orderBy('nama')
                ->paginate($request->per_page ?? 25)
                ->withQueryString(),

            'filters' => [
                'search' => $request->search,

                'per_page' => $request->per_page ?? 25,

                'kategori_id' => $selectedKategori,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'kategori_id' => ['required', 'exists:kategori,id'],

            'lembaga_ids' => ['array'],

            'lembaga_ids.*' => ['exists:lembaga,id'],
        ]);

        DB::transaction(function () use ($validated) {
            if (!empty($validated['lembaga_ids'])) {
                Lembaga::whereIn('id', $validated['lembaga_ids'])->update([
                    'kategori_id' => $validated['kategori_id'],
                ]);
            }
        });

        return back()->with('success', 'Mapping kategori berhasil disimpan.');
    }
}
