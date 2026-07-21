<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Forum;
use App\Models\KategoriLembaga;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Models\User;

class ForumController extends Controller
{

    public function index(Request $request)
    {
        $query = Forum::with('user');

        // SEARCH
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('kode', 'like', '%' . $request->search . '%')
                ->orWhere('nama', 'like', '%' . $request->search . '%')
                ->orWhere('telepon', 'like', '%' . $request->search . '%');
            });
        }

        // SORTING
        $allowedSorts = [
            'id',
            'kode',
            'nama',
            'telepon',
            'status',
            'created_at'
        ];

        $sort = in_array($request->sort, $allowedSorts)
            ? $request->sort
            : 'id';

        $order = $request->order === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sort, $order);

        // PER PAGE
        $perPage = (int) $request->per_page;

        if (!in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        // PAGINATION
        $forum = $query->paginate($perPage)->withQueryString();

        return Inertia::render('forum/index', [
            'forum' => $forum,

            'filters' => [
                'search' => $request->search ?? '',
                'sort' => $sort,
                'order' => $order,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'telepon' => 'nullable|string|max:20',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        DB::transaction(function () use ($validated) {

            // Generate kode forum
            $kode = Forum::generateKode();

            // Buat user
            $user = User::create([
                'name' => $validated['nama'],
                'email' => strtolower($kode) . '@mail.com',
                'password' => Hash::make($kode . '@kdr'),
                'force_change_password' => true,
                'status' => 'aktif',
            ]);

            // Assign role
            $user->assignRole('forum');

            // Simpan forum
            Forum::create([
                'user_id' => $user->id,
                'kode' => $kode,
                'nama' => $validated['nama'],
                'telepon' => $validated['telepon'],
                'status' => 'aktif',
            ]);
        });

        return back()->with(
            'success',
            'Data forum berhasil ditambahkan'
        );
    }

    public function update(Request $request, Forum $forum)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'telepon' => 'nullable|string|max:20',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        DB::transaction(function () use ($forum, $validated) {

            // Update user
            $forum->user->update([
                'name' => $validated['nama'],
                'status' => $validated['status'],
            ]);

            // Update forum
            $forum->update([
                'nama' => $validated['nama'],
                'telepon' => $validated['telepon'],
                'status' => $validated['status'],
            ]);
        });

        return back()->with(
            'success',
            'Data forum berhasil diperbarui'
        );
    }

    public function destroy(Forum $forum)
    {
        $forum->delete();

        return back()->with('success', 'Forum berhasil dihapus');
    }

    public function resetPassword(Forum $forum)
    {
        $forum->load('user');

        $forum->user->update([
            'password' => Hash::make($forum->kode . '@kdr'),
            'force_change_password' => true,
        ]);

        return back()->with(
            'success',
            'Password berhasil direset.'
        );
    }
}