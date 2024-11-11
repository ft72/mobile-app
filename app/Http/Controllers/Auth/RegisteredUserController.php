<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\OtpMail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;
use App\Jobs\DisableUserVerification;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        // Validate the request, including phone number
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => ['required', 'string', 'max:15', 'unique:users', 'regex:/^\+\d{10,15}$/'], // E.164 format
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone, // Retain phone number
            'password' => Hash::make($request->password),
            'user_type' => 'user', // Set user_type to 'user'
            'verified' => 'trial', // Set verified to 'trial'
        ]);

        // Generate OTP using a secure method
        $otpCode = random_int(100000, 999999);
        $user->otp_code = $otpCode;
        $user->otp_expires_at = Carbon::now()->addMinutes(10);
        $user->save();

        // Send OTP via Email
        Mail::to($user->email)->send(new OtpMail($otpCode));

        // Dispatch a job to disable verification after 24 hours if not verified
        DisableUserVerification::dispatch($user)->delay(now()->addHours(24));

        // Redirect to OTP verification page with user ID as query parameter
        return Redirect::route('otp.verify.form', ['userId' => $user->id])
                        ->with('status', 'An OTP has been sent to your email address. Please verify within 24 hours.');
    }
}
