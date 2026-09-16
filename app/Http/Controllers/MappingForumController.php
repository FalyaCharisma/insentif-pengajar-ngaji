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
        // Ambil forum aktif beserta kategorinya
        $forums = Forum::with('kategori')->where('status', 'aktif')->orderBy('nama')->get();

        // Forum tujuan
        $targetForum = $request->filled('target_forum') ? (int) $request->target_forum : $forums->first()?->id;

        // Forum asal
        // null = Belum Mapping
        $sourceForum = $request->source_forum ?? 'null';

        // Ambil lembaga beserta forum dan kategorinya
        $query = Lembaga::with(['kategori', 'forum.kategori']);

        // SEARCH
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')->orWhere('kode', 'like', '%' . $request->search . '%');
            });
        }

        // FILTER KATEGORI
        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        // FILTER FORUM ASAL
        if ($sourceForum !== 'null') {
            $query->where('forum_id', (int) $sourceForum);
        }

        return Inertia::render('mapping-forum/index', [
            'forums' => $forums,

            'kategori' => KategoriLembaga::orderBy('nama')->get(),

            'lembagas' => $query->orderBy('nama')->get(),

            'filters' => [
                'search' => $request->search ?? '',
                'kategori_id' => $request->kategori_id ?? '',
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
                $forumId = $mapping['forum_id'];

                /*
                |--------------------------------------------------------------------------
                | BELUM MAPPING
                |--------------------------------------------------------------------------
                */

                if ($forumId === null) {
                    Lembaga::where('id', $mapping['id'])->update([
                        'forum_id' => null,
                        'kategori_id' => null,
                    ]);

                    continue;
                }

                /*
                |--------------------------------------------------------------------------
                | MAPPING KE FORUM
                |--------------------------------------------------------------------------
                */

                $forum = Forum::findOrFail($forumId);

                Lembaga::where('id', $mapping['id'])->update([
                    'forum_id' => $forum->id,

                    // Kategori otomatis mengikuti Forum
                    'kategori_id' => $forum->kategori_id,
                ]);
            }
        });

        return back()->with('success', 'Mapping forum berhasil disimpan.');
    }
}
