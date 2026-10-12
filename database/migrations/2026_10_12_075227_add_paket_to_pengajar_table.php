
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengajar', function (Blueprint $table) {
            $table->enum('paket', [
                'Paket A',
                'Paket B',
                'Paket C',
            ])->nullable()->after('jabatan');
        });
    }

    public function down(): void
    {
        Schema::table('pengajar', function (Blueprint $table) {
            $table->dropColumn('paket');
        });
    }
};
