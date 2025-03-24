<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        Service::create([
            'title' => 'Air Freight',
            'description' => 'Fast and reliable air freight services for global shipping.',
            'points' => json_encode([
                "Fast international delivery",
                "Cost-effective shipping",
                "Real-time tracking",
                "Secure handling"
            ]),
            'image' => 'services/airfreight.png', // Image file stored in storage/app/public/services/
        ]);

        Service::create([
            'title' => 'Sea Freight',
            'description' => 'Safe and cost-effective sea transport solutions.',
            'points' => json_encode([
                "Bulk cargo transport",
                "Reliable port handling",
                "Low-cost long-distance shipping"
            ]),
            'image' => 'services/seafreight.png',
        ]);

        Service::create([
            'title' => 'Warehousing',
            'description' => 'Secure storage and inventory management.',
            'points' => json_encode([
                "24/7 security monitoring",
                "Climate-controlled storage",
                "Advanced inventory tracking"
            ]),
            'image' => 'services/warehousing.png',
        ]);
    }
}
