<?php

namespace App\Http\Controllers;
use App\Models\Lembaga;
use App\Models\Kategori;
use App\Models\ProfilLembaga;
use App\Models\JenisDokumen;
use App\Models\DokumenLembaga;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class LembagaController extends Controller
{
    public function data(Request $request)
    {
        $query = Lembaga::query();

        if ($request->q) {
            $query->where('nama', 'like', '%' . $request->q . '%');
        }

        return response()->json([
            'data' => $query->limit(20)->get(),
        ]);
    }

    public function index(Request $request)
    {
        $lembaga = $this->datatable(
            query: Lembaga::with([
                'kategori',
                'user',
                'profil',
            ]),
            request: $request,
            searchable: [
                'nama',
                'kode',
            ],
            sortable: [
                'id',
                'nama',
            ],
            filters: [
                'kategori_id',
                'status',
            ]
        );

        return Inertia::render('lembaga/index', [
            'lembaga' => $lembaga,

            'filters' => $this->filters(
                $request,
                [
                    'kategori_id',
                    'status',
                ]
            ),

            'kategori' => Kategori::orderBy('nama')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategori,id',
            'nama' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($validated) {

            // Generate kode lembaga
            $kode = Lembaga::generateKode();

            // Buat user
            $user = User::create([
                'name' => $validated['nama'],
                'email' => strtolower($kode) . '@mail.com',
                'password' => Hash::make($kode . '@kdr'),
                'force_change_password' => true,
                'status' => 'aktif',
            ]);

            // Assign role
            $user->assignRole('lembaga');

            // Simpan lembaga
            Lembaga::create([
                'user_id' => $user->id,
                'kategori_id' => $validated['kategori_id'],
                'kode' => $kode,
                'nama' => $validated['nama'],
            ]);
        });

        return back()->with(
            'success',
            'Data lembaga berhasil ditambahkan'
        );
    }

    public function update(Request $request, Lembaga $lembaga)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategori_lembaga,id',
            'nama' => 'required|string|max:255',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        DB::transaction(function () use ($validated, $lembaga) {

            // Update data lembaga
            $lembaga->update([
                'kategori_id' => $validated['kategori_id'],
                'nama' => $validated['nama'],
            ]);

            // Update nama user
            $lembaga->user()->update([
                'name' => $validated['nama'],
                'status' => $validated['status'],
            ]);
        });

        return back()->with(
            'success',
            'Data lembaga berhasil diperbarui'
        );
    }

    public function destroy(Lembaga $lembaga)
    {
        if ($lembaga->user) {
            $lembaga->user->update([
                'status' => 'nonaktif',
            ]);
        }

        $lembaga->delete();

        return back()->with(
            'success',
            'Data lembaga berhasil dihapus dan akun dinonaktifkan.'
        );
    }

    public function resetPassword(Lembaga $lembaga)
    {
        $lembaga->load('user');

        $lembaga->user->update([
            'password' => Hash::make($lembaga->kode . '@kdr'),
            'force_change_password' => true,
        ]);

        return back()->with(
            'success',
            'Password berhasil direset.'
        );
    }
}
