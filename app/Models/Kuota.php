<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kuota extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kuota';

    protected $fillable = ['periode_id', 'lembaga_id', 'master_kuota_id', 'estimasi_kuota', 'kuota_final', 'keterangan'];

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }

    public function masterKuota()
    {
        return $this->belongsTo(MasterKuota::class, 'master_kuota_id');
    }
}
