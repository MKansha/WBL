<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    // ✅ Get settings (primary color, email, email2, phone, address, logo)
    public function getSettings() {
        $settings = DB::table('settings')->select('primary_color', 'email', 'email2', 'phone', 'address', 'logo','social_links')->first();

        if (!$settings) {
            return response()->json(['message' => 'No settings found'], 404);
        }

        return response()->json($settings);
    }

    // ✅ Update theme color
    public function updatePrimaryColor(Request $request) {
        $request->validate(['primary_color' => 'required|string']);

        DB::table('settings')->updateOrInsert(
            ['id' => 1],
            ['primary_color' => $request->primary_color]
        );

        return response()->json(['message' => 'Theme updated successfully']);
    }

    // ✅ Get contact details (email, email2, phone, address)
    public function getContactDetails() {
        $contact = DB::table('settings')->select('email', 'email2', 'phone', 'address')->first();

        if (!$contact) {
            return response()->json(['message' => 'No contact found'], 404);
        }

        return response()->json($contact);
    }

    // ✅ Update contact details (email, email2, phone, address)
    public function updateContactDetails(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'email2' => 'nullable|email',
            'phone' => 'required|string',
            'address' => 'required|string'
        ]);

        DB::table('settings')->updateOrInsert(
            ['id' => 1],
            [
                'email' => $request->email,
                'email2' => $request->email2,
                'phone' => $request->phone,
                'address' => $request->address
            ]
        );

        return response()->json(['message' => 'Contact details updated successfully']);
    }

    // ✅ Upload and update logo
    public function updateLogo(Request $request) {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Delete old logo if exists
        $oldLogo = DB::table('settings')->value('logo');
        if ($oldLogo) {
            Storage::disk('public')->delete($oldLogo);
        }

        // Store the new logo
        $path = $request->file('logo')->store('logos', 'public');

        // Update database
        DB::table('settings')->updateOrInsert(['id' => 1], ['logo' => $path]);

        return response()->json(['message' => 'Logo updated successfully', 'logo' => $path]);
    }
    public function updateSocialLinks(Request $request) {
        $request->validate([
            'social_links' => 'array',
            'social_links.facebook' => 'nullable|url',
            'social_links.instagram' => 'nullable|url',
            'social_links.linkedin' => 'nullable|url',
            'social_links.twitter' => 'nullable|url',
        ]);

        // Fetch the settings record
        $settings = DB::table('settings')->first();

        if ($settings) {
            // ✅ Update existing record
            DB::table('settings')->where('id', $settings->id)->update([
                'social_links' => json_encode($request->social_links), // Store as JSON
                'updated_at' => now(),
            ]);
        } else {
            // ✅ Insert new record if none exists
            DB::table('settings')->insert([
                'social_links' => json_encode($request->social_links), // Store as JSON
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return response()->json(['message' => 'Social links updated successfully']);
    }
}
