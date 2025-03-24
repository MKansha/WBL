<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('services')->insert([
            [
                'title' => 'Logistics Solutions',
                'description' => 'We provide seamless logistics solutions for global trade.',
                'points' => json_encode([
                    'Fast and reliable delivery',
                    'Real-time tracking',
                    'Customs clearance assistance'
                ]),
                'image' => 'storage/services/logistics.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Warehousing',
                'description' => 'Safe and secure warehousing facilities for your goods.',
                'points' => json_encode([
                    '24/7 security',
                    'Inventory management',
                    'Temperature-controlled storage'
                ]),
                'image' => 'storage/services/warehousing.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Freight Forwarding',
                'description' => 'Expert freight forwarding services for businesses.',
                'points' => json_encode([
                    'Sea, air, and land transportation',
                    'Competitive pricing',
                    'Door-to-door service'
                ]),
                'image' => 'storage/services/freight.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
