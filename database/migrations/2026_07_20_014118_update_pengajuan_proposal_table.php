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
        Schema::table('pengajuan_proposal', function (Blueprint $table) {
            // Hapus kolom lama
            $table->dropColumn([
                'jumlah_siswa',
                'tahun',
            ]);

            // Tambah kolom baru
            $table->foreignId('periode_id')
                ->after('lembaga_id')
                ->constrained('periode')
                ->cascadeOnDelete();

            $table->text('catatan')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengajuan_proposal', function (Blueprint $table) {
            // Hapus kolom baru
            $table->dropForeign(['periode_id']);
            $table->dropColumn([
                'periode_id',
                'catatan',
            ]);

            // Kembalikan kolom lama
            $table->year('tahun')->after('lembaga_id');
            $table->integer('jumlah_siswa')->default(0)->after('jumlah_guru');
        });
    }
};