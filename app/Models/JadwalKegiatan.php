<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JadwalKegiatan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'jadwal_kegiatan';

    protected $guarded = [];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }
}