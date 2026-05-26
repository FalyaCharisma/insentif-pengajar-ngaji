<?php

namespace App\Http\Controllers;

use App\Models\Pengurus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $validated = $request->validate([
            'nik' => 'required|digits:16|numeric|unique:pengurus,nik',
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:pengurus,email',
            'tempat_lahir' => 'required|string|max:100',
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
            'pas_foto' => 'required|image|mimes:jpg,jpeg,png|max:1048',
            'status_insentif' => 'required|in:aktif,nonaktif',
        ]);

        if ($request->hasFile('pas_foto')) {
            $validated['pas_foto'] = $request->file('pas_foto')
                ->store('pengurus/foto', 'public');
        }

        DB::transaction(function () use ($request) {

            $user = User::create([
                'nik' => $request->nik,
                'name' => $request->nama,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 2, // staff
            ]);

            Pengurus::create([
                'lembaga_id' => $request->lembaga_id,
                'nik' => $user->nik,
                'nama' => $request->nama,
                'tempat_lahir' => $request->tempat_lahir,
                'tgl_lahir' => $request->tgl_lahir,
                'jk' => $request->jk,
                'jabatan' => $request->jabatan,
                'pendidikan_terakhir' => $request->pendidikan_terakhir,
                'jurusan' => $request->jurusan,
                'sekolah_universitas' => $request->sekolah_universitas,
                'tahun_lulus' => $request->tahun_lulus,
                'agama' => $request->agama,
                'alamat' => $request->alamat,
                'kelurahan' => $request->kelurahan,
                'kecamatan' => $request->kecamatan,
                'kabkota' => $request->kabkota,
                'no_hp' => $request->no_hp,
                'bank' => $request->bank,
                'no_rekening' => $request->no_rekening,
                'no_bpjs' => $request->no_bpjs,
                'pas_foto' => $request->pas_foto,
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
        return inertia('Pengurus/Edit', [
            'pengurus' => $pengurus,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengurus $pengurus)
    {
        $request->validate([
            'nama' => 'required',
        ]);

        DB::transaction(function () use ($request, $pengurus) {

            // update pengurus
            $pengurus->update([
                'nama' => $request->nama,
                'jabatan' => $request->jabatan,
                'no_hp' => $request->no_hp,
                'alamat' => $request->alamat,
            ]);

            // update user juga (sync nama)
            if ($pengurus->user) {
                $pengurus->user->update([
                    'name' => $request->nama,
                ]);
            }
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