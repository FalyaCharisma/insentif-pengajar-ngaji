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

        $proposal = $query
            ->paginate($perPage)
            ->through(function ($item) {
                if ($item->diajukan_count == 0) {
                    $item->status_pengajuan = 'belum';
                } elseif ($item->revision_count > 0) {
                    $item->status_pengajuan = 'revision';
                } elseif ($item->pending_count > 0) {
                    $item->status_pengajuan = 'pending';
                } elseif ($item->verified_count == $item->diajukan_count && $item->diajukan_count > 0) {
                    $item->status_pengajuan = 'verified';
                } else {
                    $item->status_pengajuan = 'pending';
                }

                return $item;
            })
            ->withQueryString();

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

        $usulan = PengajuanInsentif::where('proposal_id', $proposal->id)->get()->keyBy('pengajar_id');

        $pengajar = Pengajar::where('lembaga_id', $proposal->lembaga_id)
            ->where('status', 'aktif')
            ->orderBy('nama')
            ->get()
            ->map(function ($item) use ($usulan) {
                $pengajuan = $usulan->get($item->id);

                return [
                    'id' => $item->id,
                    'nama' => $item->nama,
                    'nik' => $item->nik,
                    'tempat_lahir' => $item->tempat_lahir,
                    'tgl_lahir' => $item->tgl_lahir,
                    'pendidikan_terakhir' => $item->pendidikan_terakhir,

                    // status usulan
                    'selected' => $pengajuan !== null,
                    'status_pengajuan' => $pengajuan?->status,
                    'catatan' => $pengajuan?->catatan,

                    // dipakai forum nanti
                    'pengajuan_insentif_id' => $pengajuan?->id,
                    'verified_by' => $pengajuan?->verified_by,
                    'verified_at' => $pengajuan?->verified_at,
                ];
            });

        return Inertia::render('pengajuan-insentif/usulan', [
            'proposal' => $proposal,
            'pengajar' => $pengajar,
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

        if ($proposal->lembaga_id != auth()->user()->lembaga->id) {
            abort(403);
        }

        if ($proposal->status !== 'verified') {
            return back()->withErrors([
                'proposal' => 'Proposal belum diverifikasi.',
            ]);
        }

        if (count($request->pengajar) > $proposal->jumlah_guru) {
            return back()->withErrors([
                'pengajar' => 'Jumlah pengajar melebihi kuota yang diajukan.',
            ]);
        }

        $validPengajar = Pengajar::where('lembaga_id', $proposal->lembaga_id)->where('status', 'aktif')->whereIn('id', $request->pengajar)->count();

        if ($validPengajar != count($request->pengajar)) {
            abort(403);
        }

        $existing = PengajuanInsentif::where('proposal_id', $proposal->id)->get();

        $verifiedPengajar = $existing->where('status', 'verified')->pluck('pengajar_id');

        foreach ($verifiedPengajar as $pengajarId) {
            if (!in_array($pengajarId, $request->pengajar)) {
                return back()->withErrors([
                    'pengajar' => 'Pengajar yang sudah diverifikasi tidak dapat dihapus.',
                ]);
            }
        }

        DB::transaction(function () use ($proposal, $request, $existing) {
            $selectedIds = collect($request->pengajar);

            foreach ($existing as $item) {
                if (!$selectedIds->contains($item->pengajar_id) && $item->status !== 'verified') {
                    $item->delete();
                }
            }

            foreach ($selectedIds as $pengajarId) {
                $exists = $existing->where('pengajar_id', $pengajarId)->first();

                if (!$exists) {
                    PengajuanInsentif::create([
                        'proposal_id' => $proposal->id,
                        'pengajar_id' => $pengajarId,
                        'status' => 'pending',
                    ]);
                } elseif ($exists->status === 'revision') {
                    $exists->update([
                        'status' => 'pending',
                        'catatan' => null,
                        'verified_by' => null,
                        'verified_at' => null,
                    ]);
                }
            }
        });

        return back()->with('success', 'Usulan penerima berhasil disimpan.');
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

    public function verify(PengajuanInsentif $pengajuan)
    {
        $this->authorize('verify', $pengajuan);

        if ($pengajuan->status !== 'pending') {
            return back()->withErrors([
                'error' => 'Pengajuan sudah diproses.',
            ]);
        }

        $pengajuan->update([
            'status' => 'verified',
            'catatan' => null,
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with('success', 'Pengajuan berhasil diverifikasi.');
    }

    public function reject(Request $request, PengajuanInsentif $pengajuan)
    {
        $this->authorize('verify', $pengajuan);

        if ($pengajuan->status !== 'pending') {
            return back()->withErrors([
                'error' => 'Pengajuan sudah diproses.',
            ]);
        }

        $request->validate([
            'catatan' => ['required', 'string', 'max:255'],
        ]);

        $pengajuan->update([
            'status' => 'revision',
            'catatan' => $request->catatan,
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with('success', 'Pengajar dikembalikan untuk revisi.');
    }

    public function verifySelected(Request $request)
    {
        $request->validate([
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['exists:pengajuan_insentif,id'],
        ]);

        DB::transaction(function () use ($request) {
            PengajuanInsentif::whereIn('id', $request->ids)
                ->where('status', 'pending')
                ->update([
                    'status' => 'verified',
                    'catatan' => null,
                    'verified_by' => auth()->id(),
                    'verified_at' => now(),
                ]);
        });

        return back()->with('success', 'Pengajuan berhasil diverifikasi.');
    }
    public function rejectSelected(Request $request)
    {
        $request->validate([
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['exists:pengajuan_insentif,id'],
            'catatan' => ['required', 'string'],
        ]);

        DB::transaction(function () use ($request) {
            PengajuanInsentif::whereIn('id', $request->ids)
                ->where('status', 'pending')
                ->update([
                    'status' => 'revision',
                    'catatan' => $request->catatan,
                    'verified_by' => auth()->id(),
                    'verified_at' => now(),
                ]);
        });

        return back()->with('success', 'Pengajuan berhasil dikembalikan untuk revisi.');
    }
}
