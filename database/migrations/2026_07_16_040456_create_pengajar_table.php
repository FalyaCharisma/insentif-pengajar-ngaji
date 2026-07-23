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
        Schema::create('pengajar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lembaga_id')->constrained('lembaga')->cascadeOnDelete();
            $table->string('nik',16)->unique();
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
            $table->string('id_kelurahan')->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('id_kecamatan')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('id_kabkota')->nullable();
            $table->string('kabkota')->nullable();
            $table->string('id_provinsi')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('no_hp')->nullable();
            $table->string('bank')->nullable();
            $table->string('no_rekening')->nullable();
            $table->string('no_bpjs')->nullable();
            $table->string('pas_foto')->nullable();
            $table->string('status_insentif')->nullable();
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
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
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajar');
    }
};
