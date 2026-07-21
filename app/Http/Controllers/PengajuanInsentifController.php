<?php

namespace App\Http\Controllers;

use App\Models\Pengajar;
use App\Models\PengajuanInsentif;
use App\Models\PengajuanProposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class PengajuanInsentifController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', PengajuanInsentif::class);

        $user = auth()->user();

        $query = PengajuanProposal::with(['lembaga', 'periode'])
            ->withCount([
                'pengajuanInsentif as diajukan_count',

                'pengajuanInsentif as pending_count' => function (Builder $q) {
                    $q->where('status', 'pending');
                },

                'pengajuanInsentif as verified_count' => function (Builder $q) {
                    $q->where('status', 'verified');
                },

                'pengajuanInsentif as revision_count' => function (Builder $q) {
                    $q->where('status', 'revision');
                },
            ])
            ->where('status', 'verified');

        /* Filter Role */

        if ($user->hasRole('lembaga')) {
            $query->where('lembaga_id', $user->lembaga->id);
        }

        if ($user->hasRole('forum')) {
            $query->whereHas('lembaga', function ($q) use ($user) {
                $q->where('forum_id', $user->forum->id);
            });
        }

        /* Search */

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->whereHas('lembaga', function ($x) use ($search) {
                    $x->where('nama', 'like', "%{$search}%");
                });

                $q->orWhereHas('periode', function ($x) use ($search) {
                    $x->where('tahun', 'like', "%{$search}%");
                });
            });
        }

        /* Sorting */

        $allowedSort = ['id', 'jumlah_guru', 'created_at'];

        $sort = in_array($request->sort, $allowedSort) ? $request->sort : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        /* Pagination */

        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $proposal = $query->paginate($perPage)->withQueryString();

        return Inertia::render('pengajuan-insentif/index', [
            'pengajuanProposal' => $proposal,

            'filters' => [
                'search' => $request->search ?? '',
                'sort' => $sort,
                'order' => $order,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function usulan(PengajuanProposal $proposal)
    {
        $proposal->load(['periode', 'lembaga']);

        $pengajar = Pengajar::query()->where('lembaga_id', $proposal->lembaga_id)->where('status', 'aktif')->orderBy('nama')->get();

        $selectedPengajar = PengajuanInsentif::where('proposal_id', $proposal->id)->pluck('pengajar_id');

        return Inertia::render('pengajuan-insentif/usulan', [
            'proposal' => $proposal,
            'pengajar' => $pengajar,
            'selectedPengajar' => $selectedPengajar,
        ]);

    }

    public function store(Request $request)
    {
        $this->authorize('create', PengajuanInsentif::class);

        $request->validate([
            'proposal_id' => ['required', 'exists:pengajuan_proposal,id'],
            'pengajar' => ['required', 'array', 'min:1'],
            'pengajar.*' => ['required', 'exists:pengajar,id'],
        ]);

        $proposal = PengajuanProposal::findOrFail($request->proposal_id);

        /*
        |--------------------------------------------------------------------------
        | Pastikan proposal milik lembaga login
        |--------------------------------------------------------------------------
        */

        if ($proposal->lembaga_id != auth()->user()->lembaga->id) {
            abort(403);
        }

        /*
        |--------------------------------------------------------------------------
        | Proposal harus sudah diverifikasi
        |--------------------------------------------------------------------------
        */

        if ($proposal->status !== 'verified') {
            return back()->withErrors([
                'proposal' => 'Proposal belum diverifikasi.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Maksimal guru sesuai proposal
        |--------------------------------------------------------------------------
        */

        if (count($request->pengajar) > $proposal->jumlah_guru) {
            return back()->withErrors([
                'pengajar' => 'Jumlah pengajar melebihi kuota yang diajukan.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Pastikan semua pengajar milik lembaga tersebut
        |--------------------------------------------------------------------------
        */

        $validPengajar = Pengajar::where('lembaga_id', $proposal->lembaga_id)->where('status', 'aktif')->whereIn('id', $request->pengajar)->count();

        if ($validPengajar != count($request->pengajar)) {
            abort(403);
        }

        /*
        |--------------------------------------------------------------------------
        | Simpan
        |--------------------------------------------------------------------------
        */

        DB::transaction(function () use ($proposal, $request) {
            PengajuanInsentif::where('proposal_id', $proposal->id)->delete();

            foreach ($request->pengajar as $pengajarId) {
                PengajuanInsentif::create([
                    'proposal_id' => $proposal->id,

                    'pengajar_id' => $pengajarId,

                    'status' => 'pending',
                ]);
            }
        });

        return back()->with('success', 'Pengajuan insentif berhasil disimpan.');
    }

    public function show(PengajuanProposal $proposal)
    {
        $user = auth()->user();

        /*
        |--------------------------------------------------------------------------
        | Authorization
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('lembaga')) {
            abort_if($proposal->lembaga_id != $user->lembaga->id, 403);
        } elseif ($user->hasRole('forum')) {
            abort_if(optional($proposal->lembaga)->forum_id != optional($user->forum)->id, 403);
        } elseif (!$user->hasRole(['superadmin', 'dindik'])) {
            abort(403);
        }

        /*
        |--------------------------------------------------------------------------
        | Load Relation
        |--------------------------------------------------------------------------
        */

        $proposal->load(['lembaga', 'periode', 'pengajuanInsentif.pengajar', 'pengajuanInsentif.verifier']);

        /*
        |--------------------------------------------------------------------------
        | Semua pengajar aktif milik lembaga
        |--------------------------------------------------------------------------
        */

        $pengajar = Pengajar::where('lembaga_id', $proposal->lembaga_id)->where('status', 'aktif')->orderBy('nama')->get();

        /*
        |--------------------------------------------------------------------------
        | Pengajar yang dipilih
        |--------------------------------------------------------------------------
        */

        $selectedPengajar = $proposal->pengajuanInsentif->pluck('pengajar_id')->toArray();

        return response()->json([
            'proposal' => $proposal,

            'pengajar' => $pengajar,

            'selectedPengajar' => $selectedPengajar,
        ]);
    }

    public function verify(PengajuanInsentif $pengajuanInsentif)
    {
        $this->authorize('verify', $pengajuanInsentif);

        $pengajuanInsentif->update([
            'status' => 'verified',

            'catatan' => null,

            'verified_by' => auth()->id(),

            'verified_at' => now(),
        ]);

        return back()->with('success', 'Pengajar berhasil diverifikasi.');
    }

    public function reject(Request $request, PengajuanInsentif $pengajuanInsentif)
    {
        $this->authorize('verify', $pengajuanInsentif);

        $request->validate([
            'catatan' => ['required', 'string', 'max:255'],
        ]);

        $pengajuanInsentif->update([
            'status' => 'revision',

            'catatan' => $request->catatan,

            'verified_by' => auth()->id(),

            'verified_at' => now(),
        ]);

        return back()->with('success', 'Pengajar dikembalikan untuk revisi.');
    }
}
