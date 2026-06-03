<?php

namespace App\Http\Controllers;

use App\Models\Pengurus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PengurusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pengurus::with('lembaga', 'user');

        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('nik', 'like', '%' . $request->search . '%');
        }

        $allowedSorts = ['id', 'nama', 'nik', 'created_at'];

        $sort = in_array($request->sort, $allowedSorts)
            ? $request->sort
            : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $pengurus = $query->paginate($perPage)->withQueryString();

        return Inertia::render('pengurus/index', [
            'pengurus' => $pengurus,
            'filters' => [
                'search' => $request->search ?? '',
                'sort' => $sort,
                'order' => $order,
                'per_page' => $perPage,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('pengurus/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all(), $request->lembaga['value']);
        $validated = $request->validate([
            'nik' => 'required|digits:16|numeric|unique:users,nik',
            'nama' => 'required|string|max:255',
            'email' => 'required',
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
            'pas_foto' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'status_insentif' => 'required|in:aktif,nonaktif',
        ]);

        $foto = null;

        if ($request->hasFile('pas_foto')) {
            $extension = $request->file('pas_foto')
                                ->getClientOriginalExtension();
            
            $filename = time() . '_pas_foto.' . $extension;

            $request
            ->file('pas_foto')
            ->storeAs(
                'pengurus',
                $filename,
                'public'
            );

            $foto = $filename;
        }

        DB::transaction(function () use ($request, $foto) {

            $user = User::create([
                'nik' => $request->nik,
                'name' => $request->nama,
                'email' => $request->email,
                'password' => Hash::make('12345678'),
                'role' => 2, // staff
            ]);

            Pengurus::create([
                'lembaga_id' => $request->lembaga['value'],
                'nik' => $user->nik,
                'nama' => $request->nama,
                'tempat_lahir' => $request->tempat_lahir['label'],
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
                'status_insentif' => $request->status_insentif ?? 'aktif',
            ]);
        });

        return redirect()->route('pengurus.index')
            ->with('success', 'Pengurus berhasil ditambahkan beserta akun staff');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengurus $pengurus)
    {
        $pengurus->load('lembaga', 'user');

        return inertia('pengurus/show', [
            'pengurus' => $pengurus,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengurus $pengurus)
    {
        $pengurus->load('user');
        $pengurus->load('lembaga');

        return inertia('pengurus/create', [
            'pengurus' => $pengurus,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengurus $pengurus)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email',
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
            'pas_foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        DB::transaction(function () use ($request, $pengurus) {

            $foto = $pengurus->pas_foto;

            if ($request->hasFile('pas_foto')) {

                // hapus foto lama
                if ($foto) {
                    Storage::disk('public')
                        ->delete('pengurus/' . $foto);
                }

                $extension = $request->file('pas_foto')
                    ->getClientOriginalExtension();

                $filename = time() . '_pas_foto.' . $extension;

                $request->file('pas_foto')->storeAs(
                    'pengurus',
                    $filename,
                    'public'
                );

                $foto = $filename;
            }

            // update user
            $pengurus->user()->update([
                'name'  => $request->nama,
                'email' => $request->email,
            ]);

            // update pengurus
            $pengurus->update([
                'lembaga_id' => $request->lembaga['value'] ?? null,

                'nama' => $request->nama,

                'tempat_lahir' => $request->tempat_lahir['value'] ?? null,

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
            ]);
        });
        
        return redirect()->route('pengurus.index')
            ->with('success', 'Data pengurus berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengurus $pengurus)
    {
        DB::transaction(function () use ($pengurus) {

            // hapus user dulu (biar nik tidak orphan)
            if ($pengurus->user) {
                $pengurus->user->delete();
            }

            // hapus pengurus
            $pengurus->delete();
        });

        return redirect()->route('pengurus.index')
            ->with('success', 'Data berhasil dihapus');
    }
}