<?php

namespace App\Http\Controllers;
use App\Models\Inquiry;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function index()
    {

        // Fetch the latest 6 inquiries
        $inquiries = Inquiry::latest()->take(9)->get();


        // Get counts for each category
        $contactsCount = Inquiry::where('category', 'contacts')->count();
        $customersCount = Inquiry::where('category', 'customers')->count();
        $leadsCount = Inquiry::where('category', 'lead')->count();
        $totalInquiries = Inquiry::count(); // Get the total count of all inquiries

        // Return inquiries with counts
        return response()->json([
            'inquiries' => $inquiries,
            'counts' => [
                'contacts' => $contactsCount,
                'customers' => $customersCount,
                'total_leads' =>  $totalInquiries,
                'leads' =>$leadsCount
            ],
        ]);
    }
}
