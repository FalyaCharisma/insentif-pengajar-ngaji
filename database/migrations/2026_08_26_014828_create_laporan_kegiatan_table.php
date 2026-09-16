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
        Schema::create('laporan_kegiatan', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lembaga_id')
                ->constrained('lembaga')
                ->cascadeOnDelete();

            $table->foreignId('periode_id')
                ->constrained('periode')
                ->cascadeOnDelete();

            $table->string('nama_kegiatan');

            $table->date('tanggal_mulai');

            $table->date('tanggal_selesai');

            $table->text('keterangan')->nullable();

            $table->string('file_bukti')->nullable();

            $table->enum('status', [
                'pending',
                'verified',
                'revision',
                'rejected',
            ])->default('pending');

            $table->text('catatan')->nullable();

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
        Schema::dropIfExists('laporan_kegiatan');
    }
};
