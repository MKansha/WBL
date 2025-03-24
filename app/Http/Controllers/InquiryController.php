<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inquiry;

class InquiryController extends Controller {
    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'service' => 'required|string|max:255',
            'message' => 'required|string',
            'company_name' => 'nullable|string|max:255',
            'origin' => 'nullable|string|max:255',
            'destination' => 'nullable|string|max:255',
        ]);

        $inquiry = Inquiry::create($validatedData);

        return response()->json(['message' => 'Inquiry submitted successfully!'], 201);
    }
    public function leads()
    {
        $inquiries = Inquiry::where('category', 'lead')->latest()->get();
        return response()->json($inquiries);
    }
public function saveNote(Request $request, $id)
    {
        $lead =  Inquiry::findOrFail($id);
        $lead->notes = $request->notes;
        $lead->save();

        return response()->json(['message' => 'Note saved successfully!']);
    }

public function moveLead(Request $request, $id)
    {
        $lead =  Inquiry::findOrFail($id);

        if ($request->category == "contacts") {
            $lead->category = "contacts";
        } elseif ($request->category == "customers") {
            $lead->category = "customers";
        }
        $lead->save();

        return response()->json(['message' => 'Lead moved successfully!']);
    }

public function contacts()
    {
        $contacts = Inquiry::where('category', 'contacts')->latest()->get();
        return response()->json($contacts);
    }
public function customers()
    {
        $customers = Inquiry::where('category', 'customers')->latest()->get();
        return response()->json($customers);
    }
}
