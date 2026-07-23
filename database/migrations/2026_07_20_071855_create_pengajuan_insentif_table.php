<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pengajuan_insentif', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained('pengajuan_proposal')->cascadeOnDelete();
            $table->foreignId('pengajar_id')->constrained('pengajar')->cascadeOnDelete();
            $table->enum('status', ['pending', 'verified', 'rejected', 'revision'])->default('pending');
            $table->text('catatan')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengajuan_insentif');
    }
};
