<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

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
        ]);
    }
}
