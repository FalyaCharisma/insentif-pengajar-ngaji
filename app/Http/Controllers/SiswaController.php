<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Periode;
use App\Models\Lembaga;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\PengajuanProposal;

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
        $siswa = $query
            ->paginate(10)
            ->through(function ($item) {
                $item->proposal_verified = PengajuanProposal::where('lembaga_id', $item->lembaga_id)->where('periode_id', $item->periode_id)->where('status', 'verified')->exists();

                return $item;
            })
            ->withQueryString();

        return Inertia::render('data-siswa/index', [
            'siswa' => $siswa,

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

            'bukti_dukung' => ['nullable', 'file', 'mimes:pdf,xls,xlsx', 'max:2048'],
        ]);

        $user = auth()->user();

        if ($user->hasRole('lembaga')) {
            $validated['lembaga_id'] = $user->lembaga->id;
        } else {
            $request->validate([
                'lembaga_id' => ['required', 'exists:lembaga,id'],
            ]);

            $validated['lembaga_id'] = $request->lembaga_id;
        }

        $exists = Siswa::where('periode_id', $validated['periode_id'])->where('lembaga_id', $validated['lembaga_id'])->exists();

        if ($exists) {
            return back()->withErrors([
                'periode_id' => 'Data jumlah siswa untuk periode ini sudah pernah diinput.',
            ]);
        }

        if ($request->hasFile('bukti_dukung')) {
            $lembaga = Lembaga::findOrFail($validated['lembaga_id']);
            $periode = Periode::findOrFail($validated['periode_id']);
            $namaLembaga = Str::slug($lembaga->nama, '_');
            $tahun = $periode->tahun;
            $extension = $request->file('bukti_dukung')->getClientOriginalExtension();
            $namaFile = "DataSiswa_{$namaLembaga}_{$tahun}_" . now()->format('YmdHis') . ".{$extension}";

            $validated['bukti_dukung'] = $request->file('bukti_dukung')->storeAs('bukti-siswa', $namaFile, 'public');
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

            'bukti_dukung' => ['nullable', 'file', 'mimes:pdf,xls,xlsx', 'max:2048'],
        ]);

        $user = auth()->user();

        if ($user->hasRole('lembaga')) {
            $validated['lembaga_id'] = $user->lembaga->id;
        } else {
            $request->validate([
                'lembaga_id' => ['required', 'exists:lembaga,id'],
            ]);

            $validated['lembaga_id'] = $request->lembaga_id;
        }

        if ($request->hasFile('bukti_dukung')) {
            if ($data_siswa->bukti_dukung && Storage::disk('public')->exists($data_siswa->bukti_dukung)) {
                Storage::disk('public')->delete($data_siswa->bukti_dukung);
            }

            $lembaga = Lembaga::findOrFail($validated['lembaga_id']);
            $periode = Periode::findOrFail($validated['periode_id']);
            $namaLembaga = Str::slug($lembaga->nama, '_');
            $tahun = $periode->tahun;
            $extension = $request->file('bukti_dukung')->getClientOriginalExtension();
            $namaFile = "DataSiswa_{$namaLembaga}_{$tahun}_" . now()->format('YmdHis') . ".{$extension}";

            $validated['bukti_dukung'] = $request->file('bukti_dukung')->storeAs('bukti-siswa', $namaFile, 'public');
        }

        $data_siswa->update($validated);

        return back()->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Siswa $data_siswa)
    {
        if (auth()->user()->hasRole('lembaga') && $data_siswa->lembaga_id !== auth()->user()->lembaga->id) {
            abort(403);
        }

        if ($data_siswa->bukti_dukung && Storage::disk('public')->exists($data_siswa->bukti_dukung)) {
            Storage::disk('public')->delete($data_siswa->bukti_dukung);
        }

        $data_siswa->delete();

        return back()->with('success', 'Data siswa berhasil dihapus.');
    }
}
