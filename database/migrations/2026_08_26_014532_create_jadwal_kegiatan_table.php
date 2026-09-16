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
        Schema::create('jadwal_kegiatan', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lembaga_id')
                ->constrained('lembaga')
                ->cascadeOnDelete();

            $table->foreignId('periode_id')
                ->constrained('periode')
                ->cascadeOnDelete();

            $table->string('file_jadwal');

            $table->enum('status', [
                'belum_upload',
                'sudah_upload',
                'perlu_revisi',
            ])->default('sudah_upload');

            $table->text('catatan')->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Satu lembaga hanya memiliki satu jadwal untuk satu periode
            $table->unique([
                'lembaga_id',
                'periode_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_kegiatan');
    }
};
