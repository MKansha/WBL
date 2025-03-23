<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() {
        Schema::table('settings', function (Blueprint $table) {
            $table->string('email2')->nullable()->after('email');
            $table->text('address')->nullable()->after('phone');
        });
    }

    public function down() {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['email2', 'address']);
        });
    }
};
