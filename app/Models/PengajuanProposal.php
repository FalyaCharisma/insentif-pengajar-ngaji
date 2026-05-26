<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengajuanProposal extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengajuan_proposal';

    protected $fillable = [
        'lembaga_id',
        'tahun',
        'jumlah_guru',
        'jumlah_siswa',
        'bukti_dukung',
    ];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class, 'lembaga_id');
    }

    public function pengajuanInsentif()
    {
        return $this->hasMany(PengajuanInsentif::class, 'proposal_id');
    }
}