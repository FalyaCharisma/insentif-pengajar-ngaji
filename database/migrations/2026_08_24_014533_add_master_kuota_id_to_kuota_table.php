<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kuota', function (Blueprint $table) {
            $table->foreignId('master_kuota_id')
                ->nullable()
                ->after('lembaga_id')
                ->constrained('master_kuota')
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('kuota', function (Blueprint $table) {
            $table->dropForeign(['master_kuota_id']);
            $table->dropColumn('master_kuota_id');
        });
    }
};