<?php
namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonial::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'feedback' => 'required|string',
        ]);

        $testimonial = Testimonial::create($request->all());

        return response()->json($testimonial, 201);
    }
    public function update(Request $request, $id)
{
    $testimonial = Testimonial::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'district' => 'required|string|max:255',
        'feedback' => 'required|string',
    ]);

    $testimonial->update($request->all());

    return response()->json($testimonial, 200);
}

public function destroy($id)
{
    $testimonial = Testimonial::findOrFail($id);
    $testimonial->delete();

    return response()->json(null, 204);  // 204 No Content
}
}
