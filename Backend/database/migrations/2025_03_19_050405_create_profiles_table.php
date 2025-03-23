<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('profiles')) {
            Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('gst');
            $table->string('contact_person');
            $table->string('mobile');
            $table->string('email');
            $table->string('address');
            $table->string('city');
            $table->string('district');
            $table->string('state');
            $table->string('postal_code');
            $table->string('country');
            $table->string('profile_image')->nullable();
            // $table->string('logo')->nullable();
            $table->timestamps();
        });
    }
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
