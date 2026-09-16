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
        Schema::table('pengajuan_proposal', function (Blueprint $table) {
            $table->dropColumn('jumlah_guru');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengajuan_proposal', function (Blueprint $table) {
            $table->unsignedInteger('jumlah_guru')->nullable();
        });
    }
};