<?php

namespace App\Http\Controllers;

use App\Models\Kuota;
use App\Models\Periode;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KuotaController extends Controller
{
    public function index(Request $request)
    {
        $query = Kuota::with(['periode', 'lembaga']);

        if ($request->filled('search')) {
            $query->whereHas('lembaga', function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%');
            });
        }
        if ($request->filled('periode_id')) {
            $query->where('periode_id', $request->periode_id);
        }

        $sort = $request->get('sort', 'id');
        $direction = $request->get('direction', 'desc');

        $allowed = ['id', 'estimasi_kuota', 'kuota_final', 'created_at'];

        if (!in_array($sort, $allowed)) {
            $sort = 'id';
        }

        $query->orderBy($sort, $direction);

        return Inertia::render('kuota/index', [
            'kuota' => $query->paginate(10)->withQueryString(),

            'filters' => [
                'search' => $request->search,
                'sort' => $sort,
                'direction' => $direction,
                'per_page' => $request->per_page,
                'periode_id' => $request->periode_id,
            ],

            'periodes' => Periode::orderByDesc('tahun')->get(),
        ]);
    }

    /**
     * Generate kuota berdasarkan data siswa
     */
    public function generate(Request $request)
    {
        $periode = Periode::where('status', true)->first();

        if (!$periode) {
            return back()->withErrors([
                'generate' => 'Belum ada periode yang aktif.',
            ]);
        }

        $periodeId = $periode->id;

        if (Kuota::where('periode_id', $periodeId)->exists()) {
            return back()->withErrors([
                'generate' => 'Kuota periode tersebut sudah pernah dibuat.',
            ]);
        }

        $dataSiswa = Siswa::where('periode_id', $periodeId)->get();

        if ($dataSiswa->isEmpty()) {
            return back()->withErrors([
                'generate' => 'Belum ada data siswa pada periode tersebut.',
            ]);
        }

        DB::transaction(function () use ($dataSiswa, $periodeId) {
            foreach ($dataSiswa as $item) {
                $estimasi = $this->hitungEstimasi($item->jumlah_siswa);

                Kuota::create([
                    'periode_id' => $periodeId,

                    'lembaga_id' => $item->lembaga_id,

                    'estimasi_kuota' => $estimasi,

                    // default sama
                    'kuota_final' => $estimasi,

                    'keterangan' => null,
                ]);
            }
        });

        return back()->with('success', 'Generate kuota berhasil.');
    }

    /**
     * Update kuota
     */
    public function update(Request $request, Kuota $kuota)
    {
        $validated = $request->validate([
            'kuota_final' => ['required', 'integer', 'min:0'],

            'keterangan' => ['nullable', 'string'],
        ]);

        $kuota->update($validated);

        return back()->with('success', 'Kuota berhasil diperbarui.');
    }

    /**
     * Hapus satu kuota
     */
    public function destroy(Kuota $kuota)
    {
        $kuota->delete();

        return back()->with('success', 'Kuota berhasil dihapus.');
    }

    /**
     * Hapus semua kuota pada satu periode
     * digunakan jika ingin generate ulang
     */
    public function destroyPeriode(Periode $periode)
    {
        Kuota::where('periode_id', $periode->id)->delete();

        return back()->with('success', 'Seluruh kuota periode berhasil dihapus.');
    }

    /**
     * Rumus estimasi
     */
    private function hitungEstimasi(int $jumlahSiswa): int
    {
        return max(1, floor($jumlahSiswa / 10));
    }
}
