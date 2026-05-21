<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lembaga extends Model
{
    protected $table = 'lembaga';

    protected $fillable = [
        'kategori_id',
        'nama',
        'alamat',
        'kelurahan',
        'kecamatan', 
        'kabkota',
        'telp',
        'email',
        'jumlah_guru',
        'jumlah_siswa',
        'sk',
        'file_pendukung'
    ];

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
