<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PengajuanProposal;
use App\Models\Lembaga;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PengajuanProposalController extends Controller
{
    public function index(Request $request)
    {
        $query = PengajuanProposal::with('lembaga');

        // Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('tahun', 'like', '%' . $request->search . '%')->orWhereHas('lembaga', function ($qq) use ($request) {
                    $qq->where('nama', 'like', '%' . $request->search . '%');
                });
            });
        }

        // Sorting
        $allowedSorts = ['id', 'tahun', 'jumlah_guru', 'jumlah_siswa', 'created_at'];

        $sort = in_array($request->sort, $allowedSorts) ? $request->sort : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        // Per Page
        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        // Pagination
        $pengajuanProposal = $query->paginate($perPage)->withQueryString();

        return Inertia::render('pengajuan-proposal/index', [
            'pengajuanProposal' => $pengajuanProposal,
            'filters' => [
                'search' => $request->search ?? '',
                'sort' => $sort,
                'order' => $order,
                'per_page' => $perPage,
            ],

            'lembaga' => auth()->user()->pengurus ? [auth()->user()->pengurus->lembaga] : [],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lembaga_id' => ['required', 'exists:lembaga,id'],

            'tahun' => ['required', 'digits:4'],

            'jumlah_guru' => ['required', 'integer', 'min:0'],

            'jumlah_siswa' => ['required', 'integer', 'min:0'],

            'bukti_dukung' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:2048'],
        ]);

        if ($request->hasFile('bukti_dukung')) {
            $file = $request->file('bukti_dukung');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->storeAs('files/proposal', $filename, 'public');

            $validated['bukti_dukung'] = $filename;
        }

        PengajuanProposal::create($validated);

        return back()->with('success', 'Pengajuan proposal berhasil ditambahkan');
    }

    public function update(Request $request, PengajuanProposal $pengajuanProposal)
    {
        $validated = $request->validate([
            'lembaga_id' => ['required', 'exists:lembaga,id'],
            'tahun' => ['required', 'digits:4'],
            'jumlah_guru' => ['required', 'integer', 'min:0'],
            'jumlah_siswa' => ['required', 'integer', 'min:0'],
            'bukti_dukung' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:2048'],
        ]);

        if ($request->hasFile('bukti_dukung')) {
            // Hapus file lama
            if ($pengajuanProposal->bukti_dukung && Storage::disk('public')->exists('files/proposal/' . $pengajuanProposal->bukti_dukung)) {
                Storage::disk('public')->delete('files/proposal/' . $pengajuanProposal->bukti_dukung);
            }

            // Upload file baru
            $file = $request->file('bukti_dukung');

            $filename = time() . '_' . $file->getClientOriginalName();

            $file->storeAs('files/proposal', $filename, 'public');

            $validated['bukti_dukung'] = $filename;
        }

        if (!$request->hasFile('bukti_dukung')) {
            unset($validated['bukti_dukung']);
        }

        $pengajuanProposal->update($validated);

        return back()->with('success', 'Pengajuan proposal berhasil diperbarui');
    }

    public function destroy(PengajuanProposal $pengajuanProposal)
    {
        if ($pengajuanProposal->bukti_dukung && Storage::disk('public')->exists('files/proposal/' . $pengajuanProposal->bukti_dukung)) {
            Storage::disk('public')->delete('files/proposal/' . $pengajuanProposal->bukti_dukung);
        }

        $pengajuanProposal->delete();

        return back()->with('success', 'Pengajuan proposal berhasil dihapus');
    }
}
