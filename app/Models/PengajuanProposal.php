<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Siswa;
use App\Models\Kuota;

class PengajuanProposal extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengajuan_proposal';

    protected $fillable = [
        'lembaga_id',
        'periode_id',
        'bukti_dukung',
        'jumlah_guru',
        'status',
        'catatan',
    ];

    protected $appends = [
        'jumlah_siswa',
        'estimasi_kuota',
    ];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class, 'lembaga_id');
    }

    public function pengajuanInsentif()
    {
        return $this->hasMany(PengajuanInsentif::class, 'proposal_id');
    }

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }

    public function getJumlahSiswaAttribute()
    {
        return Siswa::where('lembaga_id', $this->lembaga_id)
            ->where('periode_id', $this->periode_id)
            ->value('jumlah_siswa') ?? 0;
    }

    public function getEstimasiKuotaAttribute()
    {
        return Kuota::where('lembaga_id', $this->lembaga_id)
            ->where('periode_id', $this->periode_id)
            ->value('estimasi_kuota') ?? 0;
    }

}