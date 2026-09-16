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
        Schema::table('pengajar', function (Blueprint $table) {
            $table->string('sk_penetapan')->nullable()->after('ijazah');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengajar', function (Blueprint $table) {
            $table->dropColumn('sk_penetapan');
        });
    }
};
