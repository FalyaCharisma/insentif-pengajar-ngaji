<?php

namespace App\Http\Controllers;

use App\Models\Pengajar;
use App\Models\Lembaga;
use App\Models\PendidikanTerakhir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Models\Bank;

class PengajarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pengajar::with('lembaga');

        $user = auth()->user();

        if ($user->hasRole('lembaga') && $user->lembaga) {
            $query->where('lembaga_id', $user->lembaga->id);
        }

        if ($user->hasRole('forum') && $user->forum) {
            $query->whereHas('lembaga', function ($q) use ($user) {
                $q->where('forum_id', $user->forum->id);
            });
        }

        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%')->orWhere('nik', 'like', '%' . $request->search . '%');
        }

        $allowedSorts = ['id', 'nama', 'nik', 'created_at'];

        $sort = in_array($request->sort, $allowedSorts) ? $request->sort : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $pengajar = $query->paginate($perPage)->withQueryString();

        return Inertia::render('pengajar/index', [
            'pengajar' => $pengajar,
            'filters' => [
                'search' => $request->search ?? '',
                'sort' => $sort,
                'order' => $order,
                'per_page' => $perPage,
            ],
            'lembaga' => $user->hasRole(['superadmin', 'dindik']) ? Lembaga::orderBy('nama')->get() : [],
        ]);
    }

    public function cekNik(Request $request)
    {
        $request->validate([
            'nik' => ['required', 'digits:16'],
        ]);

        $response = Http::get('https://walidata.kedirikota.go.id/api/dtks/check', [
            'nik' => $request->nik,
        ]);

        if (!$response->successful()) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'Gagal mengambil data.',
                ],
                500,
            );
        }

        return response()->json([
            'success' => true,
            'data' => $response->json(),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pengajar/create', [
            'lembaga' => Lembaga::orderBy('nama')->get(),
            'pendidikanTerakhir' => PendidikanTerakhir::orderBy('urutan')->get([
                'id',
                'nama',
            ]),
            'bank' => Bank::orderBy('urutan')->get([
                'id',
                'nama',
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|digits:16|numeric|unique:pengajar,nik',
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required|max:100',
            'tgl_lahir' => 'required|date',
            'jk' => 'required|in:L,P',
            'jabatan' => 'required|string|max:100',
            'pendidikan_terakhir' => 'required|string|max:100',
            'jurusan' => 'required|string|max:100',
            'sekolah_universitas' => 'required|string|max:255',
            'tahun_lulus' => 'required|digits:4',
            'agama' => 'required|string|max:50',
            'provinsi' => 'required',
            'kabkota' => 'required',
            'kecamatan' => 'required',
            'kelurahan' => 'required',
            'alamat' => 'required|string',
            'no_hp' => 'required|string|max:20',
            'bank' => 'required|string|max:100',
            'no_rekening' => 'required|string|max:50',
            'no_bpjs' => 'required|string|max:50',
            'pas_foto' => 'required|image|mimes:jpg,jpeg,png|max:1024',
            'ktp' => 'nullable|mimes:jpg,jpeg,png,pdf|max:1024',
            'ijazah' => 'nullable|mimes:jpg,jpeg,png,pdf|max:1024',
            'sk_penetapan' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:1024',
            'paket' => 'nullable|in:Paket A,Paket B,Paket C',
        ]);

        $foto = null;
        $ktp = null;
        $ijazah = null;
        $skP = null;

        if ($request->hasFile('pas_foto')) {
            $extension = $request->file('pas_foto')->getClientOriginalExtension();
            $filename = time() . '_pas_foto.' . $extension;
            $request->file('pas_foto')->storeAs('pengajar/foto', $filename, 'public');
            $foto = $filename;
        }

        if ($request->hasFile('ktp')) {
            $extension = $request->file('ktp')->getClientOriginalExtension();
            $filename = time() . '_ktp.' . $extension;
            $request->file('ktp')->storeAs('pengajar/ktp', $filename, 'public');
            $ktp = $filename;
        }

        if ($request->hasFile('ijazah')) {
            $extension = $request->file('ijazah')->getClientOriginalExtension();
            $filename = time() . '_ijazah.' . $extension;
            $request->file('ijazah')->storeAs('pengajar/ijazah', $filename, 'public');
            $ijazah = $filename;
        }

        if ($request->hasFile('sk_penetapan')) {
            $extension = $request->file('sk_penetapan')->getClientOriginalExtension();
            $filename = time() . '_sk_penetapan.' . $extension;
            $request->file('sk_penetapan')->storeAs('pengajar/sk_penetapan', $filename, 'public');
            $skP = $filename;
        }

        $user = auth()->user();

        if ($user->hasRole('lembaga')) {
            $validated['lembaga_id'] = $user->lembaga->id;
        } else {
            $validated['lembaga_id'] = $request->lembaga_id;
        }

        DB::transaction(function () use ($request, $foto, $ktp, $ijazah, $skP, $validated) {
            Pengajar::create([
                'lembaga_id' => $validated['lembaga_id'],
                'nik' => $request->nik,
                'nama' => $request->nama,
                'tempat_lahir' => $request->tempat_lahir['label'] ?? null,
                'tgl_lahir' => $request->tgl_lahir,
                'jk' => $request->jk,
                'jabatan' => $request->jabatan,
                'pendidikan_terakhir' => $request->pendidikan_terakhir,
                'jurusan' => $request->jurusan,
                'sekolah_universitas' => $request->sekolah_universitas,
                'tahun_lulus' => $request->tahun_lulus,
                'agama' => $request->agama,
                'alamat' => $request->alamat,
                'id_provinsi' => $request->provinsi['value'] ?? null,
                'provinsi' => $request->provinsi['label'] ?? null,
                'id_kabkota' => $request->kabkota['value'] ?? null,
                'kabkota' => $request->kabkota['label'] ?? null,
                'id_kecamatan' => $request->kecamatan['value'] ?? null,
                'kecamatan' => $request->kecamatan['label'] ?? null,
                'id_kelurahan' => $request->kelurahan['value'] ?? null,
                'kelurahan' => $request->kelurahan['label'] ?? null,
                'no_hp' => $request->no_hp,
                'bank' => $request->bank,
                'no_rekening' => $request->no_rekening,
                'no_bpjs' => $request->no_bpjs,
                'pas_foto' => $foto,
                'ktp' => $ktp,
                'ijazah' => $ijazah,
                'sk_penetapan' => $skP,
                'paket' => $request->paket,
            ]);
        });

        return redirect()->route('pengajar.index')->with('success', 'Pengajar berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengajar $pengajar)
    {
        $pengajar->load('lembaga', 'verifier');

        return inertia('pengajar/show', [
            'pengajar' => $pengajar,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengajar $pengajar)
    {
        return Inertia::render('pengajar/create', [
            'pengajar' => $pengajar->load('lembaga'),
            'lembaga' => Lembaga::orderBy('nama')->get(),
            'pendidikanTerakhir' => PendidikanTerakhir::orderBy('urutan')->get([
                'id',
                'nama',
            ]),
            'bank' => Bank::orderBy('urutan')->get([
                'id',
                'nama',
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengajar $pengajar)
    {
        if (auth()->user()->hasRole('lembaga') && $pengajar->lembaga_id !== auth()->user()->lembaga->id) {
            abort(403);
        }

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required',
            'tgl_lahir' => 'required|date',
            'jk' => 'required|in:L,P',
            'jabatan' => 'required|string|max:100',
            'pendidikan_terakhir' => 'required|string|max:100',
            'jurusan' => 'required|string|max:100',
            'sekolah_universitas' => 'required|string|max:255',
            'tahun_lulus' => 'required|digits:4',
            'agama' => 'required|string|max:50',
            'provinsi' => 'required',
            'kabkota' => 'required',
            'kecamatan' => 'required',
            'kelurahan' => 'required',
            'alamat' => 'required|string',
            'no_hp' => 'required|string|max:20',
            'bank' => 'required|string|max:100',
            'no_rekening' => 'required|string|max:50',
            'no_bpjs' => 'required|string|max:50',
            'pas_foto' => 'nullable|image|mimes:jpg,jpeg,png|max:1048',
            'ktp' => 'nullable|mimes:jpg,jpeg,png,pdf|max:1024',
            'ijazah' => 'nullable|mimes:jpg,jpeg,png,pdf|max:1024',
            'sk_penetapan' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:1024',
            'paket' => 'nullable|in:Paket A,Paket B,Paket C',
        ]);

        DB::transaction(function () use ($request, $pengajar) {
            $foto = $pengajar->pas_foto;
            $ktp = $pengajar->ktp;
            $ijazah = $pengajar->ijazah;
            $skP = $pengajar->sk_penetapan;

            if ($request->hasFile('pas_foto')) {
                if ($foto) {
                    Storage::disk('public')->delete('pengajar/foto/' . $foto);
                }

                $extension = $request->file('pas_foto')->getClientOriginalExtension();
                $filename = time() . '_pas_foto.' . $extension;
                $request->file('pas_foto')->storeAs('pengajar/foto', $filename, 'public');
                $foto = $filename;
            }

            if ($request->hasFile('ktp')) {
                if ($ktp) {
                    Storage::disk('public')->delete('pengajar/ktp/' . $ktp);
                }

                $extension = $request->file('ktp')->getClientOriginalExtension();
                $filename = time() . '_ktp.' . $extension;
                $request->file('ktp')->storeAs('pengajar/ktp', $filename, 'public');
                $ktp = $filename;
            }

            if ($request->hasFile('ijazah')) {
                if ($ijazah) {
                    Storage::disk('public')->delete('pengajar/ijazah/' . $ijazah);
                }

                $extension = $request->file('ijazah')->getClientOriginalExtension();
                $filename = time() . '_ijazah.' . $extension;
                $request->file('ijazah')->storeAs('pengajar/ijazah', $filename, 'public');
                $ijazah = $filename;
            }

            if ($request->hasFile('sk_penetapan')) {
                if ($skP) {
                    Storage::disk('public')->delete('pengajar/sk_penetapan/' . $skP);
                }

                $extension = $request->file('sk_penetapan')->getClientOriginalExtension();
                $filename = time() . '_sk_penetapan.' . $extension;
                $request->file('sk_penetapan')->storeAs('pengajar/sk_penetapan', $filename, 'public');
                $skP = $filename;
            }

            $user = auth()->user();

            if ($user->hasRole('lembaga')) {
                $validated['lembaga_id'] = $user->lembaga->id;
            } else {
                $validated['lembaga_id'] = $request->lembaga_id;
            }

            $pengajar->update([
                'lembaga_id' => $validated['lembaga_id'],

                'nama' => $request->nama,

                'tempat_lahir' => $request->tempat_lahir['label'] ?? null,

                'tgl_lahir' => $request->tgl_lahir,
                'jk' => $request->jk,

                'jabatan' => $request->jabatan,

                'pendidikan_terakhir' => $request->pendidikan_terakhir,
                'jurusan' => $request->jurusan,
                'sekolah_universitas' => $request->sekolah_universitas,
                'tahun_lulus' => $request->tahun_lulus,

                'agama' => $request->agama,

                'alamat' => $request->alamat,

                'id_provinsi' => $request->provinsi['value'] ?? null,
                'provinsi' => $request->provinsi['label'] ?? null,

                'id_kabkota' => $request->kabkota['value'] ?? null,
                'kabkota' => $request->kabkota['label'] ?? null,

                'id_kecamatan' => $request->kecamatan['value'] ?? null,
                'kecamatan' => $request->kecamatan['label'] ?? null,

                'id_kelurahan' => $request->kelurahan['value'] ?? null,
                'kelurahan' => $request->kelurahan['label'] ?? null,

                'no_hp' => $request->no_hp,
                'bank' => $request->bank,
                'no_rekening' => $request->no_rekening,
                'no_bpjs' => $request->no_bpjs,

                'pas_foto' => $foto,
                'ktp' => $ktp,
                'ijazah' => $ijazah,
                'sk_penetapan' => $skP,
                'paket' => $request->paket,
            ]);
        });

        return redirect()->route('pengajar.index')->with('success', 'Data pengajar berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengajar $pengajar)
    {
        if (auth()->user()->hasRole('lembaga') && $pengajar->lembaga_id !== auth()->user()->lembaga->id) {
            abort(403);
        }
        DB::transaction(function () use ($pengajar) {
            // hapus pengajar
            $pengajar->delete();
        });

        return redirect()->route('pengajar.index')->with('success', 'Data berhasil dihapus');
    }

    public function toggleStatus(Pengajar $pengajar)
    {
        $pengajar->update([
            'status' => $pengajar->status === 'aktif' ? 'nonaktif' : 'aktif',
        ]);

        return back()->with('success', 'Status pengajar berhasil diperbarui.');
    }

    public function verifikasi(Request $request, Pengajar $pengajar)
    {
        $validated = $request->validate([
            'status_verifikasi' => 'required|in:disetujui,ditolak',
            'catatan_verifikasi' => 'nullable|string',
        ]);

        if ($validated['status_verifikasi'] === 'ditolak' && empty($validated['catatan_verifikasi'])) {
            return back()->withErrors([
                'catatan_verifikasi' => 'Catatan verifikasi wajib diisi jika pengajuan ditolak.',
            ]);
        }

        $pengajar->update([
            'status_verifikasi' => $validated['status_verifikasi'],
            'catatan_verifikasi' => $validated['catatan_verifikasi'],
            'verified_by' => Auth::id(),
            'verified_at' => now(),
        ]);

        return back()->with('success', 'Verifikasi pengajar berhasil disimpan.');
    }
}
