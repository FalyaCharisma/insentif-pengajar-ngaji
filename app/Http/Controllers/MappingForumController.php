<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Lembaga;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MappingForumController extends Controller
{
    public function index(Request $request)
    {
        $forums = Forum::orderBy('nama')->get();

        $selectedForum = $request->filled('forum_id') ? (int) $request->forum_id : null;

        if (!$selectedForum && $forums->isNotEmpty()) {
            $selectedForum = $forums->first()->id;
        }

        if (!$selectedForum && $forums->count()) {
            $selectedForum = $forums->first()->id;
        }

        $query = Lembaga::with(['kategori', 'forum']);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')->orWhere('kode', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        return Inertia::render('mapping-forum/index', [
            'forums' => $forums,
            'kategori' => Kategori::orderBy('nama')->get(),
            'selectedForum' => $selectedForum,

            'lembagas' => $query
                ->orderBy('nama')
                ->paginate($request->per_page ?? 25)
                ->withQueryString(),

            'filters' => [
                'search' => $request->search,

                'kategori_id' => $request->kategori_id,

                'per_page' => $request->per_page ?? 25,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'forum_id' => ['required', 'exists:forum,id'],

            'lembaga_ids' => ['array'],

            'lembaga_ids.*' => ['exists:lembaga,id'],
        ]);

        DB::transaction(function () use ($validated) {
            // lepas semua lembaga pada forum ini

            Lembaga::where('forum_id', $validated['forum_id'])->update([
                'forum_id' => null,
            ]);

            // assign ulang

            if (!empty($validated['lembaga_ids'])) {
                Lembaga::whereIn('id', $validated['lembaga_ids'])->update([
                    'forum_id' => $validated['forum_id'],
                ]);
            }
        });

        return back()->with('success', 'Mapping forum berhasil disimpan.');
    }
}
