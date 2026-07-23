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
            $table->enum('status_verifikasi', [
                'pending',
                'disetujui',
                'ditolak',
            ])->default('pending');

            $table->text('catatan_verifikasi')->nullable();

            $table->foreignId('verified_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('verified_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengajar', function (Blueprint $table) {
            //
        });
    }
};
