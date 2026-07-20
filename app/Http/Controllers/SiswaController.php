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

        $user = auth()->user();

        // Jika login sebagai lembaga
        if ($user->hasRole('lembaga') && $user->lembaga) {
            $query->where('lembaga_id', $user->lembaga->id);
        }

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

            'lembagas' => $user->hasRole(['superadmin', 'dindik']) ? Lembaga::orderBy('nama')->get() : [],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],

            'jumlah_siswa' => ['required', 'integer', 'min:1'],
        ]);

        $user = auth()->user();

        if ($user->hasRole('lembaga')) {
            $validated['lembaga_id'] = $user->lembaga->id;
        } else {
            $validated['lembaga_id'] = $request->lembaga_id;
        }
        $exists = Siswa::where('periode_id', $validated['periode_id'])->where('lembaga_id', $validated['lembaga_id'])->exists();

        if ($exists) {
            return back()->withErrors([
                'periode_id' => 'Data jumlah siswa untuk periode ini sudah pernah diinput.',
            ]);
        }

        Siswa::create($validated);

        return back()->with('success', 'Data siswa berhasil ditambahkan.');
    }

    public function update(Request $request, Siswa $data_siswa)
    {
        if (auth()->user()->hasRole('lembaga') && $data_siswa->lembaga_id !== auth()->user()->lembaga->id) {
            abort(403);
        }
        $validated = $request->validate([
            'periode_id' => ['required', 'exists:periode,id'],
            'jumlah_siswa' => ['required', 'integer', 'min:1'],
        ]);

        $user = auth()->user();

        if ($user->hasRole('lembaga')) {
            $validated['lembaga_id'] = $user->lembaga->id;
        } else {
            $validated['lembaga_id'] = $request->lembaga_id;
        }

        $data_siswa->update($validated);

        return back()->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Siswa $data_siswa)
    {
        if (auth()->user()->hasRole('lembaga') && $data_siswa->lembaga_id !== auth()->user()->lembaga->id) {
            abort(403);
        }
        $data_siswa->delete();

        return back()->with('success', 'Data siswa berhasil dihapus.');
    }
}
