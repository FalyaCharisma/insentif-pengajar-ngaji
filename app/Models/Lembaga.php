<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lembaga extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'lembaga';
    protected $guarded = [];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function pengurus()
    {
        return $this->hasMany(Pengurus::class);
    }

    public function pengajuanProposal()
    {
        return $this->hasMany(PengajuanProposal::class);
    }
}
