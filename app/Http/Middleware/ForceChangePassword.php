<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceChangePassword
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (
            $user &&
            $user->force_change_password &&
            !$request->routeIs('profile.edit') &&
            !$request->routeIs('profile.password') &&
            !$request->routeIs('logout')
        ) {
            return redirect()
                ->route('profile.edit')
                ->with('warning', 'Silakan ubah password terlebih dahulu.');
        }
        
        return $next($request);
    }
}
