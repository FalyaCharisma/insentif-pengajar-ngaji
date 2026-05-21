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
        Schema::create('pengurus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lembaga_id')->constrained('lembaga')->cascadeOnDelete();
            $table->string('nik');
            $table->foreign('nik')->references('nik')->on('users')->cascadeOnDelete();
            $table->string('nama');
            $table->string('tempat_lahir')->nullable();
            $table->date('tgl_lahir')->nullable();
            $table->string('jk')->nullable();
            $table->string('jabatan')->nullable();
            $table->string('pendidikan_terakhir')->nullable();
            $table->string('jurusan')->nullable();
            $table->string('sekolah_universitas')->nullable();
            $table->year('tahun_lulus')->nullable();
            $table->string('agama')->nullable();
            $table->text('alamat')->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabkota')->nullable();
            $table->string('no_hp')->nullable();
            $table->string('bank')->nullable();
            $table->string('no_rekening')->nullable();
            $table->string('no_bpjs')->nullable();
            $table->string('pas_foto')->nullable();
            $table->string('status_insentif')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengurus');
    }
};
