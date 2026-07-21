<?php

namespace App\Http\Controllers;

use App\Models\JenisDokumen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JenisDokumenController extends Controller
{
    public function index(Request $request)
    {
        $query = JenisDokumen::query();

        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%');
        }

        $jenisDokumen = $query
            ->orderBy(
                $request->get('sort', 'nama'),
                $request->get('direction', 'asc')
            )
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('jenis-dokumen/index', [
            'jenisDokumen' => $jenisDokumen,
            'filters' => $request->only('search', 'sort', 'direction'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => [
                'required',
                'string',
                'max:255',
                'unique:jenis_dokumen,nama',
            ],
            'is_required' => [
                'required',
                'boolean',
            ],
        ]);

        JenisDokumen::create($validated);

        return back()->with(
            'success',
            'Jenis dokumen berhasil ditambahkan.'
        );
    }

    public function update(Request $request, JenisDokumen $jenis_dokumen)
    {
        $validated = $request->validate([
            'nama' => [
                'required',
                'string',
                'max:255',
            ],
            'is_required' => [
                'required',
                'boolean',
            ],
        ]);

        $jenis_dokumen->update($validated);

        return back()->with('success', 'Jenis dokumen berhasil diperbarui.');
    }

    public function destroy(JenisDokumen $jenis_dokumen)
    {
        $jenis_dokumen->delete();

        return back()->with(
            'success',
            'Jenis dokumen berhasil dihapus.'
        );
    }
}