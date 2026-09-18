<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BeritaController extends Controller
{
    /**
     * Menampilkan daftar berita.
     */
    public function index(Request $request)
    {
        $query = Berita::query();

        // Search
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")->orWhere('kategori', 'like', "%{$search}%");
            });
        }

        // Filter status
        if ($request->filled('status')) {
            $query->where('is_published', $request->status);
        }

        $berita = $query->latest('created_at')->paginate(10)->withQueryString();

        return Inertia::render('berita/index', [
            'berita' => $berita,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
        ]);
    }

    /**
     * Form tambah berita.
     */
    public function create()
    {
        return Inertia::render('berita/form');
    }

    /**
     * Menyimpan berita baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'kategori' => ['required', 'string', 'max:100'],
            'excerpt' => ['nullable', 'string'],
            'isi' => ['required', 'string'],
            'gambar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['boolean'],
        ]);

        // Generate slug
        $slug = Str::slug($validated['judul']);

        // Pastikan slug unik
        $originalSlug = $slug;
        $counter = 1;

        while (Berita::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter++;
        }

        // Upload gambar
        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('berita', 'public');
        }

        $validated['slug'] = $slug;

        $validated['is_published'] = $request->boolean('is_published');

        // Kalau langsung dipublish dan tanggal kosong
        if ($validated['is_published'] && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        Berita::create($validated);

        return redirect()->route('berita.index')->with('success', 'Berita berhasil ditambahkan.');
    }

    /**
     * Menampilkan detail berita.
     */
    public function show(Berita $berita)
    {
        return Inertia::render('Berita/Show', [
            'berita' => $berita,
        ]);
    }

    /**
     * Form edit berita.
     */
    public function edit($id)
    {
        $berita = Berita::findOrFail($id);

        return Inertia::render('berita/form', [
            'berita' => $berita,
        ]);
    }
    /**
     * Update berita.
     */
    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'kategori' => ['required', 'string', 'max:100'],
            'excerpt' => ['nullable', 'string'],
            'isi' => ['required', 'string'],
            'gambar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['boolean'],
        ]);

        /*
    |--------------------------------------------------------------------------
    | Slug
    |--------------------------------------------------------------------------
    */

        if ($berita->judul !== $validated['judul']) {
            $slug = Str::slug($validated['judul']);

            $originalSlug = $slug;
            $counter = 1;

            while (Berita::where('slug', $slug)->where('id', '!=', $berita->id)->exists()) {
                $slug = $originalSlug . '-' . $counter++;
            }

            $validated['slug'] = $slug;
        }

        /*
    |--------------------------------------------------------------------------
    | GAMBAR
    |--------------------------------------------------------------------------
    */

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama
            if ($berita->gambar) {
                Storage::disk('public')->delete($berita->gambar);
            }

            // Simpan gambar baru
            $validated['gambar'] = $request->file('gambar')->store('berita', 'public');
        } else {
            // JANGAN ubah gambar lama
            unset($validated['gambar']);
        }

        /*
    |--------------------------------------------------------------------------
    | STATUS PUBLIKASI
    |--------------------------------------------------------------------------
    */

        $validated['is_published'] = $request->boolean('is_published');

        if ($validated['is_published'] && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        if (!$validated['is_published']) {
            $validated['published_at'] = null;
        }

        /*
    |--------------------------------------------------------------------------
    | UPDATE DATABASE
    |--------------------------------------------------------------------------
    */

        $berita->update($validated);

        return redirect()->route('berita.index')->with('success', 'Berita berhasil diperbarui.');
    }

    /**
     * Menghapus berita.
     */
    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);

        // Hapus gambar jika ada
        if ($berita->gambar) {
            Storage::disk('public')->delete($berita->gambar);
        }

        // Hapus data berita
        $berita->delete();

        return redirect()->route('berita.index')->with('success', 'Berita berhasil dihapus.');
    }

    public function frontend(Request $request)
    {
        $query = Berita::published()->latest('published_at');

        // Search
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('kategori', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $berita = $query->paginate(9)->withQueryString();

        return Inertia::render('frontend/Berita', [
            'berita' => $berita,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function frontendShow($slug)
    {
        $berita = Berita::published()->where('slug', $slug)->firstOrFail();

        return Inertia::render('frontend/BeritaShow', [
            'berita' => $berita,
        ]);
    }
}
