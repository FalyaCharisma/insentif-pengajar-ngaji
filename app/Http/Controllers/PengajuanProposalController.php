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

            $q->where('tahun', 'like', '%' . $request->search . '%')

                ->orWhereHas('lembaga', function ($qq) use ($request) {

                    $qq->where(
                        'nama',
                        'like',
                        '%' . $request->search . '%'
                    );
                });
        });
    }

    // Sorting
    $allowedSorts = [
        'id',
        'tahun',
        'jumlah_guru',
        'jumlah_siswa',
        'created_at',
    ];

    $sort = in_array(
        $request->sort,
        $allowedSorts
    )
        ? $request->sort
        : 'id';

    $order =
        $request->order === 'asc'
            ? 'asc'
            : 'desc';

    $query->orderBy($sort, $order);

    // Per Page
    $perPage = (int) $request->per_page;

    if (!in_array($perPage, [10, 25, 50, 100])) {
        $perPage = 10;
    }

    // Pagination
    $pengajuanProposal = $query
        ->paginate($perPage)
        ->withQueryString();

    return Inertia::render(
        'pengajuan-proposal/index',
        [

            'pengajuanProposal' =>
                $pengajuanProposal,

            'filters' => [
                'search' =>
                    $request->search ?? '',

                'sort' => $sort,

                'order' => $order,

                'per_page' => $perPage,
            ],

            'lembaga' => Lembaga::orderBy('nama')->get(),
        ]
    );
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
