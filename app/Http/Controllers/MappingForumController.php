<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Lembaga;
use App\Models\KategoriLembaga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MappingForumController extends Controller
{
    public function index(Request $request)
    {
        $forums = Forum::orderBy('nama')->get();

        // Forum tujuan (kanan)
        $targetForum = $request->filled('target_forum') ? (int) $request->target_forum : $forums->first()?->id;

        // Forum asal (kiri)
        // "null" = Belum Mapping
        $sourceForum = $request->source_forum ?? 'null';

        $query = Lembaga::with(['kategori', 'forum']);

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')->orWhere('kode', 'like', '%' . $request->search . '%');
            });
        }

        // Filter kategori
        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        return Inertia::render('mapping-forum/index', [
            'forums' => $forums,

            'kategori' => KategoriLembaga::orderBy('nama')->get(),

            // semua lembaga
            'lembagas' => $query->orderBy('nama')->get(),

            'filters' => [
                'search' => $request->search,

                'kategori_id' => $request->kategori_id,

                'source_forum' => $sourceForum,

                'target_forum' => $targetForum,
            ],
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mappings' => ['required', 'array'],
            'mappings.*.id' => ['required', 'exists:lembaga,id'],
            'mappings.*.forum_id' => ['nullable', 'exists:forum,id'],
        ]);

        DB::transaction(function () use ($validated) {
            foreach ($validated['mappings'] as $mapping) {
                Lembaga::where('id', $mapping['id'])->update([
                    'forum_id' => $mapping['forum_id'],
                ]);
            }
        });

        return back()->with('success', 'Mapping forum berhasil disimpan.');
    }
}
