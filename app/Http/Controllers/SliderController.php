<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slider;
use Illuminate\Support\Facades\Storage;
class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::all()->map(function ($slider) {
            $slider->image = asset("storage/sliders/" . basename($slider->image));
            return $slider;
        });

        return response()->json($sliders);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        $imagePath = $request->file('image')->store('sliders', 'public');

        $slider = Slider::create([
            'title' => $request->input('title'),
            'subtitle' => $request->input('subtitle'),
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'Image uploaded successfully!', 'slider' => $slider]);
    }
    public function update(Request $request, $id)
    {
        $slider = Slider::findOrFail($id);

        // ✅ Ensure title & subtitle are received
        $title = $request->input('title');
        $subtitle = $request->input('subtitle');

        if (!$title) {
            return response()->json(['error' => 'Title is required'], 422);
        }

        $slider->title = $title;
        $slider->subtitle = $subtitle;

        // ✅ Handle image upload
        if ($request->hasFile('image')) {
            // Delete the old image
            Storage::disk('public')->delete(str_replace('/storage/', '', $slider->image));

            // Upload new image
            $path = $request->file('image')->store('sliders', 'public');
            $slider->image = "/storage/" . $path;
        }

        $slider->save();
        return response()->json($slider);
    }
    public function destroy($id)
    {
        $slider = Slider::findOrFail($id);
        if ($slider->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $slider->image));
        }
        $slider->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
