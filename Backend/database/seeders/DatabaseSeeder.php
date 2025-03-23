<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\ServicesTableSeeder;
use Database\Seeders\SettingsTableSeeder;
use Database\Seeders\SuperAdminSeeder;
class DatabaseSeeder extends Seeder
{

    public function run(): void
    {

        $this->call(SuperAdminSeeder::class);
        $this->call(ServicesTableSeeder::class);
        $this->call(SettingsTableSeeder::class);

    }
}
