<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class CheckVerifiedStatus
{
    /**
     * Handle an incoming request.
     *
     * Block users who are 'disabled' from accessing protected routes.
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->verified === 'disabled') {
                Auth::logout();

                return redirect()->route('login')->withErrors(['error' => 'Your account has been disabled. Please contact support.']);
            }

            if ($user->verified === 'trial' && $user->created_at < Carbon::now()->subHours(24)) {
                Auth::logout();

                return redirect()->route('login')->withErrors(['error' => 'Your free trial has ended. Please contact support.']);
            } else {
                return $next($request);
            }
        }

        return $next($request);
    }
}
