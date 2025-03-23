<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('service');
            $table->text('message');
            $table->string('company_name')->nullable();
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->text('notes')->nullable();
            $table->string('category')->default('lead');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('inquiries');
    }
};
