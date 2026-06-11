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
        Schema::create('lembaga', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kategori_id')
                ->constrained('kategori')
                ->onDelete('cascade');

            $table->string('nama');
            $table->text('alamat');
            $table->string('kelurahan_id')->nullable();
            $table->string('kelurahan');
            $table->string('kecamatan_id')->nullable();
            $table->string('kecamatan');
            $table->string('kabkota_id')->nullable();
            $table->string('kabkota')->nullable();

            $table->string('telp')->nullable();
            $table->string('email')->nullable();

            $table->integer('jumlah_guru')->default(0);
            $table->integer('jumlah_siswa')->default(0);

            $table->string('sk')->nullable();
            $table->string('file_pendukung')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lembaga');
    }
};
