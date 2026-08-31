<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\KategoriLembaga as Kategori;
use App\Models\MasterKuota;
use App\Models\Periode;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MasterKuotaController extends Controller
{
    public function index(Request $request)
    {
        $query = MasterKuota::with(['periode', 'forum', 'kategori']);

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->whereHas('forum', function ($forum) use ($search) {
                    $forum->where('nama', 'like', "%{$search}%");
                })
                    ->orWhereHas('kategori', function ($kategori) use ($search) {
                        $kategori->where('nama', 'like', "%{$search}%");
                    })
                    ->orWhereHas('periode', function ($periode) use ($search) {
                        $periode->where('tahun', 'like', "%{$search}%");
                    });
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Filter
        |--------------------------------------------------------------------------
        */

        if ($request->filled('periode_id')) {
            $query->where('periode_id', $request->periode_id);
        }

        if ($request->filled('forum_id')) {
            $query->where('forum_id', $request->forum_id);
        }

        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        /*
        |--------------------------------------------------------------------------
        | Sorting
        |--------------------------------------------------------------------------
        */

        $allowedSorts = ['id', 'jumlah_kuota', 'created_at'];

        $sort = in_array($request->input('sort'), $allowedSorts) ? $request->input('sort') : 'id';

        $direction = $request->input('direction') === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $direction);

        /*
        |--------------------------------------------------------------------------
        | Pagination
        |--------------------------------------------------------------------------
        */

        $masterKuota = $query->paginate($request->integer('per_page', 10))->withQueryString();

        /*
        |--------------------------------------------------------------------------
        | Dropdown
        |--------------------------------------------------------------------------
        */

        $periodes = Periode::query()
            ->orderByDesc('tahun')
            ->get(['id', 'tahun']);

        $forums = Forum::query()
            ->orderBy('nama')
            ->get(['id', 'nama']);

        $kategoris = Kategori::query()
            ->orderBy('nama')
            ->get(['id', 'nama']);

        return Inertia::render('master-kuota/index', [
            'masterKuota' => $masterKuota,
            'filters' => [
                'search' => $request->input('search'),
                'periode_id' => $request->input('periode_id'),
                'forum_id' => $request->input('forum_id'),
                'kategori_id' => $request->input('kategori_id'),
                'sort' => $sort,
                'direction' => $direction,
                'per_page' => $request->input('per_page', 10),
            ],
            'periodes' => $periodes,
            'forums' => $forums,
            'kategoris' => $kategoris,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'periode_id' => ['required', 'integer', 'exists:periode,id'],

            'forum_id' => ['required', 'integer', 'exists:forum,id'],

            'kategori_id' => ['required', 'integer', 'exists:kategori_lembaga,id'],

            'jumlah_kuota' => ['required', 'integer', 'min:0'],

            'keterangan' => ['nullable', 'string', 'max:1000'],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Cek kombinasi sudah ada
        |--------------------------------------------------------------------------
        */

        $exists = MasterKuota::where('periode_id', $validated['periode_id'])->where('forum_id', $validated['forum_id'])->where('kategori_id', $validated['kategori_id'])->exists();

        if ($exists) {
            return back()
                ->withErrors([
                    'periode_id' => 'Master kuota untuk periode, forum, dan kategori tersebut sudah tersedia.',
                ])
                ->withInput();
        }

        MasterKuota::create($validated);

        return redirect()->route('master-kuota.index')->with('success', 'Master kuota berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $masterKuota = MasterKuota::findOrFail($id);

        $validated = $request->validate([
            'periode_id' => ['required', 'integer', 'exists:periode,id'],

            'forum_id' => ['required', 'integer', 'exists:forum,id'],

            'kategori_id' => ['required', 'integer', 'exists:kategori_lembaga,id'],

            'jumlah_kuota' => ['required', 'integer', 'min:0'],

            'keterangan' => ['nullable', 'string', 'max:1000'],
        ]);

        $masterKuota->update([
            'periode_id' => $validated['periode_id'],
            'forum_id' => $validated['forum_id'],
            'kategori_id' => $validated['kategori_id'],
            'jumlah_kuota' => $validated['jumlah_kuota'],
            'keterangan' => $validated['keterangan'] ?? null,
        ]);

        return redirect()->route('master-kuota.index')->with('success', 'Master kuota berhasil diperbarui.');
    }
    public function destroy($id)
    {
        $masterKuota = MasterKuota::findOrFail($id);

        $masterKuota->delete();

        return redirect()->route('master-kuota.index')->with('success', 'Master kuota berhasil dihapus.');
    }
}
