<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PengajuanInsentif extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengajuan_insentif';

    protected $fillable = [
        'proposal_id',
        'pengurus_id',
        'tanggal',
        'status',
    ];

    public function proposal()
    {
        return $this->belongsTo(PengajuanProposal::class, 'proposal_id');
    }

    public function pengurus()
    {
        return $this->belongsTo(Pengurus::class, 'pengurus_id');
    }
}
