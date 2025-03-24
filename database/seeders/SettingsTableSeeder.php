<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class SettingsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('settings')->insert([
            'primary_color' => '#007bff',
            'email' => 'admin@example.com',
            'email2' => 'support@example.com',
            'phone' => '1234567890',
            'address' => '123, Main Street, City, Country',
            'logo' => 'logo.png', // Adjust the path if stored in storage/app/public
            'social_links' => json_encode([
                'facebook' => 'https://facebook.com/example',
                'twitter' => 'https://twitter.com/example',
                'instagram' => 'https://instagram.com/example',
                'linkedin' => 'https://www.linkedin.com/',
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
