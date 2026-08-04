<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\PengajuanProposal;
use App\Models\PengajuanInsentif;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'success' => fn() => session('success'),
                'error' => fn() => session('error'),
            ],

            'auth' => [
                'user' => fn() => auth()->user()
                    ? [
                        'id' => auth()->id(),
                        'name' => auth()->user()->name,
                        'email' => auth()->user()->email,
                        'role' => $request->user()->getRoleNames()->first(),
                        'lembaga_id' => optional($request->user()->lembaga)->id,
                        'force_change_password' => auth()->user()->force_change_password,
                    ]
                    : null,
            ],

            'badge' => [
                'pengajuan_belum_verifikasi' => fn() => $this->getPengajuanBelumVerifikasi($request),
                'insentif_belum_verifikasi' => fn() => $this->getInsentifBelumVerifikasi($request),
            ],
        ]);
    }
    private function getPengajuanBelumVerifikasi(Request $request): int
    {
        $user = $request->user();

        if (!$user || !$user->hasRole('forum')) {
            return 0;
        }

        // Kalau user forum belum memiliki relasi forum
        if (!$user->forum) {
            return 0;
        }

        return PengajuanProposal::query()

            // Hanya lembaga yang berada di bawah forum login
            ->whereHas('lembaga', function ($q) use ($user) {
                $q->where('forum_id', $user->forum->id);
            })

            // Belum diverifikasi forum
            ->where('status', 'pending')

            ->count();
    }
    private function getInsentifBelumVerifikasi(Request $request): int
    {
        $user = $request->user();

        if (!$user || !$user->hasRole('forum')) {
            return 0;
        }

        if (!$user->forum) {
            return 0;
        }

        return PengajuanInsentif::query()

            // Hanya yang masih menunggu verifikasi forum
            ->where('status', 'pending')

            // Hanya pengajuan dari lembaga di bawah forum login
            ->whereHas('proposal.lembaga', function ($q) use ($user) {
                $q->where('forum_id', $user->forum->id);
            })

            ->count();
    }
}
