<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Siswa extends Model
{
    use SoftDeletes;

    protected $table = 'siswa';

    protected $fillable = [
        'periode_id',
        'lembaga_id',
        'jumlah_siswa',
    ];

    protected $appends = [
        'estimasi_kuota',
    ];

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
}