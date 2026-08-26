<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('master_kuota', function (Blueprint $table) {
            $table->id();

            $table->foreignId('periode_id')->constrained('periode')->cascadeOnDelete();

            $table->foreignId('forum_id')->constrained('forum')->cascadeOnDelete();

            $table->foreignId('kategori_id')->constrained('kategori_lembaga')->cascadeOnDelete();

            $table->unsignedInteger('jumlah_kuota');

            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['periode_id', 'forum_id', 'kategori_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_kuota');
    }
};
