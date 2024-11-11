<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class OtpVerificationController extends Controller
{
    /**
     * Show the OTP verification form.
     */
    public function show(Request $request)
    {
        $userId = $request->query('userId');

        if (!$userId) {
            return redirect()->route('register')->withErrors(['error' => 'Invalid verification request.']);
        }

        $user = User::find($userId);

        if (!$user) {
            return redirect()->route('register')->withErrors(['error' => 'User not found.']);
        }

        return Inertia::render('Auth/OtpVerify', ['userId' => $user->id]);
    }

    /**
     * Verify the OTP submitted by the user.
     */
    public function verify(Request $request)
    {
        // Validate the input
        $request->validate([
            'otp_code' => 'required|digits:6',
            'user_id' => 'required|exists:users,id',
        ]);

        // Find the user
        $user = User::where('id', $request->user_id)
                    ->where('otp_code', $request->otp_code)
                    ->where('otp_expires_at', '>', Carbon::now())
                    ->first();

        if (!$user) {
            return back()->withErrors(['otp_code' => 'The OTP is invalid or has expired.']);
        }

        // Clear OTP fields and mark email as verified
        $user->otp_code = null;
        $user->otp_expires_at = null;
        $user->email_verified_at = Carbon::now();
        $user->save();

        // Log the user in
        Auth::login($user);

        return redirect()->route('dashboard')->with('status', 'Your email has been verified successfully!');
    }

    /**
     * Resend the OTP to the user's email.
     */
    public function resend(Request $request)
    {
        // Validate the input
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::find($request->user_id);

        // Implement rate limiting (e.g., 1 resend per minute)
        // if ($user->otp_expires_at && $user->otp_expires_at->diffInSeconds(Carbon::now()) < 60) {
        //     return back()->withErrors(['resend' => 'Please wait before requesting another OTP.']);
        // }

        // Generate a new OTP
        $otpCode = random_int(100000, 999999);
        $user->otp_code = $otpCode;
        $user->otp_expires_at = Carbon::now()->addMinutes(10);
        $user->save();

        // Send OTP via Email
        Mail::to($user->email)->send(new OtpMail($otpCode));

        \Log::info('Resent OTP to ' . $user->email . ' at ' . Carbon::now() . ' with code: ' . $otpCode, );

        return back()->with('status', 'A new OTP has been sent to your email address.');
    }
}
