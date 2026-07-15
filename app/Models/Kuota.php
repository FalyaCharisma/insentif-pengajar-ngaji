<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kuota extends Model
{
    use SoftDeletes;

    protected $table = 'kuota';

    protected $fillable = [
        'periode_id',
        'lembaga_id',
        'estimasi_kuota',
        'kuota_final',
        'keterangan',
    ];

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}