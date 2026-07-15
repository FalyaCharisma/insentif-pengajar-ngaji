<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Periode;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Siswa::with(['periode', 'lembaga']);

        if ($request->filled('search')) {
            $query->whereHas('lembaga', function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%');
            });
        }

        $sort = $request->get('sort', 'id');
        $direction = $request->get('direction', 'desc');

        $allowed = ['id', 'jumlah_siswa', 'created_at'];

        if (!in_array($sort, $allowed)) {
            $sort = 'id';
        }

        $query->orderBy($sort, $direction);

        return Inertia::render('data-siswa/index', [
            'siswa' => $query->paginate(10)->withQueryString(),

            'filters' => [
                'search' => $request->search,
                'sort' => $sort,
                'direction' => $direction,
            ],

            'periodes' => Periode::where('status', true)->orderByDesc('tahun')->get(),

            'lembagas' => Lembaga::orderBy('nama')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],

            'lembaga_id' => ['required', 'exists:lembaga,id'],

            'jumlah_siswa' => ['required', 'integer', 'min:1'],
        ]);

        Siswa::create($validated);

        return back()->with('success', 'Data siswa berhasil ditambahkan.');
    }

    public function update(Request $request, Siswa $data_siswa)
    {
        $validated = $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],

            'lembaga_id' => ['required', 'exists:lembaga,id'],

            'jumlah_siswa' => ['required', 'integer', 'min:1'],
        ]);

        $data_siswa->update($validated);

        return back()->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Siswa $data_siswa)
    {
        $data_siswa->delete();

        return back()->with('success', 'Data siswa berhasil dihapus.');
    }
}
