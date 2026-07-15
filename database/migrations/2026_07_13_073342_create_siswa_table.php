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
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();

            $table->foreignId('periode_id')
                ->constrained('periode')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->foreignId('lembaga_id')
                ->constrained('lembaga')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->unsignedInteger('jumlah_siswa');

            $table->timestamps();
            $table->softDeletes();

            // Satu lembaga hanya boleh mengisi satu data siswa pada satu periode
            $table->unique(['periode_id', 'lembaga_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};