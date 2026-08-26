<?php

namespace App\Http\Controllers;

use App\Models\Kuota;
use App\Models\Periode;
use App\Models\Siswa;
use App\Models\MasterKuota;
use App\Models\Forum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KuotaController extends Controller
{
    public function index(Request $request)
    {
        $query = Kuota::with([
            'periode',
            'lembaga',
            'masterKuota' => function ($query) {
                $query->withSum('kuota as total_terpakai', 'kuota_final');
            },
        ]);

        if ($request->filled('search')) {
            $search = $request->search;

            $query->whereHas('lembaga', function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%");
            });
        }

        if ($request->filled('periode_id')) {
            $query->where('periode_id', $request->periode_id);
        }
        if ($request->filled('forum_id')) {
            $query->whereHas('lembaga', function ($q) use ($request) {
                $q->where('forum_id', $request->forum_id);
            });
        }

        $sort = $request->get('sort', 'id');
        $direction = $request->get('direction', 'desc');
        $allowed = ['id', 'estimasi_kuota', 'kuota_final', 'created_at'];

        if (!in_array($sort, $allowed)) {
            $sort = 'id';
        }

        $query->orderBy($sort, $direction === 'asc' ? 'asc' : 'desc');

        $kuota = $query->paginate($request->integer('per_page', 10))->withQueryString();

        $periodeId = $request->input('periode_id') ?? Periode::where('status', true)->value('id');

        $masterKuotaStats = MasterKuota::query()
            ->where('periode_id', $periodeId)
            ->with(['forum:id,nama', 'kategori:id,nama'])
            ->withSum('kuota as total_terpakai', 'kuota_final')
            ->get()
            ->map(function ($master) {
                $jumlahKuota = (int) $master->jumlah_kuota;
                $totalTerpakai = (int) ($master->total_terpakai ?? 0);
                $sisa = $jumlahKuota - $totalTerpakai;

                return [
                    'id' => $master->id,
                    'forum' => $master->forum?->nama ?? '-',
                    'forum_id' => $master->forum_id,
                    'kategori' => $master->kategori?->nama ?? '-',
                    'jumlah_kuota' => $jumlahKuota,
                    'total_terpakai' => $totalTerpakai,
                    'sisa' => $sisa,
                    'melebihi' => $totalTerpakai > $jumlahKuota,
                    'persentase' => $jumlahKuota > 0 ? round(($totalTerpakai / $jumlahKuota) * 100, 1) : 0,
                ];
            });

        return Inertia::render('kuota/index', [
            'kuota' => $kuota,
            'masterKuotaStats' => $masterKuotaStats,
            'filters' => [
                'search' => $request->input('search'),
                'sort' => $sort,
                'direction' => $direction,
                'per_page' => $request->input('per_page', 10),
                'periode_id' => $request->input('periode_id'),
                'forum_id' => $request->input('forum_id'),
            ],
            'periodes' => Periode::query()
                ->orderByDesc('tahun')
                ->get(['id', 'tahun']),
            'forums' => Forum::orderBy('nama')->get(['id', 'nama']),
        ]);
    }

    public function generate(Request $request)
    {
        /*
    |--------------------------------------------------------------------------
    | Ambil periode aktif
    |--------------------------------------------------------------------------
    */

        $periode = Periode::where('status', true)->first();

        if (!$periode) {
            return back()->withErrors([
                'generate' => 'Belum ada periode yang aktif.',
            ]);
        }

        $periodeId = $periode->id;

        /*
    |--------------------------------------------------------------------------
    | Ambil data siswa beserta lembaga
    |--------------------------------------------------------------------------
    */

        $dataSiswa = Siswa::with(['lembaga:id,nama,forum_id,kategori_id'])
            ->where('periode_id', $periodeId)
            ->get();

        if ($dataSiswa->isEmpty()) {
            return back()->withErrors([
                'generate' => 'Belum ada data siswa pada periode tersebut.',
            ]);
        }

        /*
    |--------------------------------------------------------------------------
    | Ambil seluruh master kuota periode aktif
    |--------------------------------------------------------------------------
    */

        $masterKuota = MasterKuota::where('periode_id', $periodeId)->get();

        /*
    |--------------------------------------------------------------------------
    | Buat index master kuota
    |--------------------------------------------------------------------------
    */

        $masterMap = $masterKuota->keyBy(function ($item) {
            return $item->forum_id . '-' . $item->kategori_id;
        });

        /*
    |--------------------------------------------------------------------------
    | Statistik
    |--------------------------------------------------------------------------
    */

        $jumlahGenerate = 0;

        $jumlahTanpaMaster = 0;

        DB::transaction(function () use ($dataSiswa, $periodeId, $masterMap, &$jumlahGenerate, &$jumlahTanpaMaster) {
            foreach ($dataSiswa as $item) {
                /*
            |--------------------------------------------------------------------------
            | Pastikan lembaga tersedia
            |--------------------------------------------------------------------------
            */

                if (!$item->lembaga) {
                    continue;
                }

                /*
            |--------------------------------------------------------------------------
            | Cari master berdasarkan forum + kategori
            |--------------------------------------------------------------------------
            */

                $key = $item->lembaga->forum_id . '-' . $item->lembaga->kategori_id;

                $master = $masterMap->get($key);

                /*
            |--------------------------------------------------------------------------
            | Jika belum ada master
            |--------------------------------------------------------------------------
            */

                if (!$master) {
                    $jumlahTanpaMaster++;

                    continue;
                }

                /*
            |--------------------------------------------------------------------------
            | Cek apakah kuota sudah ada
            |--------------------------------------------------------------------------
            */

                $sudahAda = Kuota::where('periode_id', $periodeId)->where('lembaga_id', $item->lembaga_id)->exists();

                if ($sudahAda) {
                    continue;
                }

                /*
            |--------------------------------------------------------------------------
            | Hitung estimasi
            |--------------------------------------------------------------------------
            */

                $estimasi = $this->hitungEstimasi($item->jumlah_siswa);

                /*
            |--------------------------------------------------------------------------
            | Simpan kuota
            |--------------------------------------------------------------------------
            */

                Kuota::create([
                    'periode_id' => $periodeId,

                    'lembaga_id' => $item->lembaga_id,

                    'master_kuota_id' => $master->id,

                    'estimasi_kuota' => $estimasi,

                    'kuota_final' => $estimasi,

                    'keterangan' => null,
                ]);

                $jumlahGenerate++;
            }
        });

        /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

        if ($jumlahGenerate === 0) {
            if ($jumlahTanpaMaster > 0) {
                return back()->withErrors([
                    'generate' => 'Tidak ada kuota yang dapat dibuat karena beberapa lembaga belum memiliki Master Kuota yang sesuai.',
                ]);
            }

            return back()->with('info', 'Seluruh lembaga pada periode ini sudah memiliki data kuota.');
        }

        $message = "Berhasil membuat {$jumlahGenerate} data kuota.";

        if ($jumlahTanpaMaster > 0) {
            $message .= " {$jumlahTanpaMaster} lembaga tidak dibuat karena Master Kuota untuk forum dan kategori tersebut belum tersedia.";
        }

        return back()->with('success', $message);
    }

    /**
     * Update kuota
     */
    public function update(Request $request, Kuota $kuota)
    {
        $validated = $request->validate([
            'kuota_final' => ['required', 'integer', 'min:0',  'max:' . $kuota->estimasi_kuota,],

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
