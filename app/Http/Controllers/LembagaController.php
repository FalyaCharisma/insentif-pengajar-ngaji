<?php

namespace App\Http\Controllers;
use App\Models\Lembaga;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LembagaController extends Controller
{
    public function index(Request $request)
    {
        $query = Lembaga::with('kategori');

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')
                    ->orWhere('alamat', 'like', '%' . $request->search . '%')
                    ->orWhere('kelurahan', 'like', '%' . $request->search . '%')
                    ->orWhere('kecamatan', 'like', '%' . $request->search . '%')
                    ->orWhere('kabkota', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%')
                    ->orWhere('telp', 'like', '%' . $request->search . '%');
            });
        }

        // Filter kategori
        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        // Sorting
        $allowedSorts = ['id', 'nama', 'jumlah_guru', 'jumlah_siswa', 'created_at'];

        $sort = in_array($request->sort, $allowedSorts) ? $request->sort : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        // Per Page
        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        // Pagination
        $lembaga = $query->paginate($perPage)->withQueryString();

        return Inertia::render('lembaga/index', [
            'lembaga' => $lembaga,

            'filters' => [
                'search' => $request->search ?? '',
                'kategori_id' => $request->kategori_id ?? '',
                'sort' => $sort,
                'order' => $order,
                'per_page' => $perPage,
            ],
            'kategori' => Kategori::orderBy('nama')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategori,id',
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'kelurahan' => 'nullable|string|max:255',
            'kecamatan' => 'nullable|string|max:255',
            'kabkota' => 'nullable|string|max:255',
            'telp' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'jumlah_guru' => 'nullable|integer|min:0',
            'jumlah_siswa' => 'nullable|integer|min:0',
            'sk' => 'nullable|string|max:255',

            'file_pendukung' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:2048',
        ]);

        // Upload file
        if ($request->hasFile('file_pendukung')) {
            $file = $request->file('file_pendukung');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->storeAs('files/lembaga', $filename, 'public');

            $validated['file_pendukung'] = $filename;
        }

        Lembaga::create($validated);

        return back()->with('success', 'Data lembaga berhasil ditambahkan');
    }

    public function update(Request $request, Lembaga $lembaga)
    {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategori,id',
            'nama' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'kelurahan' => 'nullable|string|max:255',
            'kecamatan' => 'nullable|string|max:255',
            'kabkota' => 'nullable|string|max:255',
            'telp' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'jumlah_guru' => 'nullable|integer|min:0',
            'jumlah_siswa' => 'nullable|integer|min:0',
            'sk' => 'nullable|string|max:255',

            'file_pendukung' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:2048',
        ]);

        // Upload file baru
        if ($request->hasFile('file_pendukung')) {
            // Hapus file lama
            if ($lembaga->file_pendukung && Storage::disk('public')->exists('images/lembaga/' . $lembaga->file_pendukung)) {
                Storage::disk('public')->delete('images/lembaga/' . $lembaga->file_pendukung);
            }

            $file = $request->file('file_pendukung');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->storeAs('images/lembaga', $filename, 'public');

            $validated['file_pendukung'] = $filename;
        }

        $lembaga->update($validated);

        return back()->with('success', 'Data lembaga berhasil diperbarui');
    }

    public function destroy(lembaga $lembaga)
    {
        // Hapus file pendukung
        if ($lembaga->file_pendukung && Storage::disk('public')->exists('images/lembaga/' . $lembaga->file_pendukung)) {
            Storage::disk('public')->delete('images/lembaga/' . $lembaga->file_pendukung);
        }

        // Hapus data
        $lembaga->delete();

        return back()->with('success', 'Data lembaga berhasil dihapus');
    }
}
