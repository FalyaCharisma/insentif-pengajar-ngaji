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
        Schema::table('profil_lembaga', function (Blueprint $table) {
            $table->string('kode_provinsi')
                ->nullable()
                ->after('provinsi');

            $table->string('kode_kabupaten')
                ->nullable()
                ->after('kabupaten');

            $table->string('kode_kecamatan')
                ->nullable()
                ->after('kecamatan');

            $table->string('kode_kelurahan')
                ->nullable()
                ->after('kelurahan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profil_lembaga', function (Blueprint $table) {
            $table->dropColumn([
                'kode_provinsi',
                'kode_kabupaten',
                'kode_kecamatan',
                'kode_kelurahan',
            ]);
        });
    }
};
