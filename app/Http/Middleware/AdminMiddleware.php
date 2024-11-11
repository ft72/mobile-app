<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * Allow access only to users with 'admin' user_type.
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->user_type === 'admin') {
            return $next($request);
        }

        abort(403, 'Unauthorized access.');
    }

    public function share(Request $request): array
    {
        return [
            'admin' => [
                'admin' => Auth::user(),
            ],
        ];
    }
}
