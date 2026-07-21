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
        Schema::create('dokumen_lembaga', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lembaga_id')
                ->constrained('lembaga')
                ->cascadeOnDelete();

            $table->foreignId('jenis_dokumen_id')
                ->constrained('jenis_dokumen')
                ->cascadeOnDelete();

            $table->string('nama_file');

            $table->string('path');

            $table->enum('status_verifikasi', [
                'pending',
                'disetujui',
                'ditolak'
            ])->default('pending');

            $table->text('catatan_verifikasi')->nullable();

            $table->foreignId('verified_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('verified_at')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_lembaga');
    }
};
