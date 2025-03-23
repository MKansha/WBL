<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Storage;
class ProfileController extends Controller
{
    // Get Profile Details (API Endpoint)
    public function index()
    {

    $profile = Profile::first();

    if ($profile) {
        // Append full URL to image fields
        $profile->profile_image = $profile->profile_image ? asset('storage/' . $profile->profile_image) : null;
    }

    return response()->json($profile);
    }


    // Update or Create Profile (API Endpoint)
    public function update(Request $request)
    {
    // Validate the form data

    $request->validate([

    'company_name' => 'nullable|string|max:255',

    'gst' => 'nullable|string|max:100',

    'contact_person' => 'nullable|string|max:255',

    'mobile' => 'nullable|regex:/^\+?[0-9]{10,15}$/',

    'email' => 'nullable|email|max:255',

    'address' => 'nullable|string|max:255',

    'city' => 'nullable|string|max:100',

    'district' => 'nullable|string|max:100',

    'state' => 'nullable|string|max:100',

    'postal_code' => 'nullable|string|max:20',

    'country' => 'nullable|string|max:100',

    'profile_image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:5048',


    ]);



    // Find or create profile

    $profile = Profile::first() ?? new Profile();


    // Manually update attributes

    $profile->company_name = $request->company_name;

    $profile->gst = $request->gst;

    $profile->contact_person = $request->contact_person;

    $profile->mobile = $request->mobile;

    $profile->email = $request->email;

    $profile->address = $request->address;

    $profile->city = $request->city;

    $profile->district = $request->district;

    $profile->state = $request->state;

    $profile->postal_code = $request->postal_code;

    $profile->country = $request->country;


    $filePath = $profile->profile_image ?? null; // Assign existing profile image if no new file is uploaded


    if ($request->hasFile('profile_image')) {

    if ($profile->profile_image) {

    Storage::disk('public')->delete($profile->profile_image);

    }

    $filePath = $request->file('profile_image')->store('images', 'public');

    }


    $profile->profile_image = $filePath;

    $profile->save();


    return response()->json([

    'message' => 'Profile updated successfully',

    'profile_image' => asset('storage/' . $filePath),
    ]);



    }
}
