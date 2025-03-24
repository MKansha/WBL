<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use App\Http\Requests\ResetPassword;
use App\Mail\ForgotPasswordMail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Logged in successfully',
                'user' => $user,
                'token' => $token
            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 404);
    }
 

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email does not exist'], 404);
        }

        // Generate and store token
        $token = Str::random(50);
        $user->remember_token = $token;
        $user->save();

        // Send email with the correct token
        Mail::to($user->email)->send(new ForgotPasswordMail($user, $token));

        return response()->json(['message' => 'Reset link sent to email'], 200);
    }



    public function resetPassword(Request $request, $token)
{
    $request->validate(['password' => 'required|min:6|confirmed']);

    // DEBUG: Check if the token exists
    $user = User::where('remember_token', $token)->first();

    if (!$user) {
        return response()->json([
            'message' => 'Invalid or expired token',
            'provided_token' => $token,  // Debugging: Show token from request
            'stored_token' => User::where('email', $request->email)->first()->remember_token ?? 'No token found'
        ], 400);
    }

    // Update password
    $user->password = Hash::make($request->password);
    $user->remember_token = Str::random(50); // Generate new token
    $user->save();

    return response()->json(['message' => 'Password has been changed successfully'], 200);
}



public function logout(Request $request)
{
    // ✅ Delete only the current token instead of all tokens
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
}


}
