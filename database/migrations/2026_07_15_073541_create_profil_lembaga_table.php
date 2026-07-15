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
        Schema::create('profil_lembaga', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lembaga_id')
                ->constrained('lembaga')
                ->cascadeOnDelete();

            // Informasi Lembaga
            $table->string('nomor_registrasi')->nullable();
            $table->year('tahun_berdiri')->nullable();

            // Alamat
            $table->text('alamat')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('kode_pos')->nullable();

            // Kontak
            $table->string('telepon')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();

            // Pimpinan Lembaga
            $table->string('nama_pimpinan')->nullable();
            $table->string('jabatan_pimpinan')->nullable();

            // Operator
            $table->string('nama_operator')->nullable();
            $table->string('no_hp_operator')->nullable();

            // Rekening Bantuan
            $table->string('nama_bank')->nullable();
            $table->string('nomor_rekening')->nullable();
            $table->string('atas_nama_rekening')->nullable();

            // Status Verifikasi Profil
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
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profil_lembaga');
    }
};
