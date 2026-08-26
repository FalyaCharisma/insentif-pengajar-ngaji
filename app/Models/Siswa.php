<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Siswa extends Model
{
    use SoftDeletes;

    protected $table = 'siswa';

    protected $fillable = ['periode_id', 'lembaga_id', 'jumlah_siswa', 'bukti_dukung'];

    protected $appends = ['estimasi_kuota', 'bukti_dukung_url'];

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }

    /**
     * Estimasi kuota (sementara menggunakan rasio 10 siswa = 1 kuota)
     */
    public function getEstimasiKuotaAttribute()
    {
        return max(1, floor($this->jumlah_siswa / 10));
    }

    public function getBuktiDukungUrlAttribute()
    {
        return $this->bukti_dukung ? Storage::url($this->bukti_dukung) : null;
    }
    public function pengajuanProposal()
    {
        return $this->hasOne(PengajuanProposal::class, 'lembaga_id', 'lembaga_id')->whereColumn('pengajuan_proposal.periode_id', 'siswa.periode_id');
    }
}
