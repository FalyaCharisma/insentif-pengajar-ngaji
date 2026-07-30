<?php

namespace App\Http\Controllers;

use App\Models\KategoriLembaga;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MappingKategoriController extends Controller
{
    public function index(Request $request)
    {
        $kategori = KategoriLembaga::orderBy('nama')->get();

        // Kategori tujuan (kanan)
        $targetKategori = $request->filled('target_kategori') ? (int) $request->target_kategori : $kategori->first()?->id;

        // Kategori asal (kiri)
        $sourceKategori = $request->source_kategori ?? 'null';

        $query = Lembaga::with(['kategori', 'forum']);

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')->orWhere('kode', 'like', '%' . $request->search . '%');
            });
        }

        return Inertia::render('mapping-kategori/index', [
            'kategori' => $kategori,

            // semua lembaga
            'lembagas' => $query->orderBy('nama')->get(),

            'filters' => [
                'search' => $request->search,

                'source_kategori' => $sourceKategori,

                'target_kategori' => $targetKategori,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mappings' => ['required', 'array'],
            'mappings.*.id' => ['required', 'exists:lembaga,id'],
            'mappings.*.kategori_id' => ['nullable', 'exists:kategori_lembaga,id'],
        ]);

        DB::transaction(function () use ($validated) {
            foreach ($validated['mappings'] as $mapping) {
                Lembaga::where('id', $mapping['id'])->update([
                    'kategori_id' => $mapping['kategori_id'],
                ]);
            }
        });

        return back()->with('success', 'Mapping kategori berhasil disimpan.');
    }
}
