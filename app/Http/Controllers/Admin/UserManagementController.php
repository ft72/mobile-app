<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::where('user_type', 'user')->get(['id', 'name', 'email', 'phone', 'verified', 'created_at']);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    /**
     * Update the verified status of a user.
     */
    public function updateStatus(Request $request, User $user)
    {
        \Log::info('Updating user status: ' . json_encode($request->all()));

        // Validate the 'verified' field
        $validated = $request->validate([
            'verified' => 'required|in:trial,verified,disabled',
        ]);

        // Update the user's verified status
        $user->verified = $validated['verified'];
        $user->save();

        // Return an Inertia response or redirect with a success message
        return redirect()->back()->with('status', 'User status updated successfully.');
    }

}
