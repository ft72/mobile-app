<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Carbon\Carbon;

class DisableUserVerification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;

    /**
     * Create a new job instance.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        // Reload user to ensure up-to-date data
        $user = User::find($this->user->id);

        // If user is still in 'trial' status and not verified
        if ($user && $user->verified === 'trial' && !$user->email_verified_at) {
            $user->verified = 'disabled';
            $user->save();

            // Optionally, notify the user about the status change
            // Mail::to($user->email)->send(new \App\Mail\VerificationDisabledMail());

            Log::info("User ID {$user->id} has been disabled due to unverified status.");
        }
    }
}
