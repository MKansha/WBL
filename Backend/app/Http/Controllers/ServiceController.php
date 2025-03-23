<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    // Get all services
    public function index()
    {
        $services = Service::all();

        $services->transform(function ($service) {
            return [
                'id' => $service->id,
                'title' => $service->title,
                'description' => $service->description,
                'points' => is_array($service->points) ? $service->points : json_decode($service->points),
                'image' => $service->image, // ✅ Return only the relative path
            ];
        });

        return response()->json($services, 200);
    }


    // Store new service with image
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'points' => 'required|array',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Store image in storage/app/public/services
        $imagePath = $request->file('image')->store('services', 'public');

        $service = Service::create([
            'title' => $request->title,
            'description' => $request->description,
            'points' => json_encode($request->points),
            'image' => $imagePath,
        ]);

        return response()->json($service, 201);
    }


    public function update(Request $request, $id)
    {
        // Find the service by ID
        $service = Service::findOrFail($id);

        // Validate the request
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'points' => 'required|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // image is optional here
        ]);

        // If a new image is uploaded, delete the old one and store the new one
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }

            // Store the new image in 'public/services'
            $imagePath = $request->file('image')->store('services', 'public');
            $service->image = $imagePath; // Store the relative path of the image
        }

        // Update the other fields (title, description, points)
        $service->update([
            'title' => $request->title,
            'description' => $request->description,
            'points' => json_encode($request->points),
        ]);

        // Prepend the full URL for the image path
        $service->image = asset('storage/' . $service->image); // Ensure the URL is correct

        return response()->json($service, 200);
    }


    // Delete service
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        Storage::delete('public/' . $service->image);
        $service->delete();
        return response()->json(['message' => 'Service deleted'], 200);
    }
}
