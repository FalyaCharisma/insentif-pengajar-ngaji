<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pengurus extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengurus';

    protected $fillable = [
        'lembaga_id',
        'nik',
        'nama',
        'tempat_lahir',
        'tgl_lahir',
        'jk',
        'jabatan',
        'pendidikan_terakhir',
        'jurusan',
        'sekolah_universitas',
        'tahun_lulus',
        'agama',
        'alamat',
        'kelurahan',
        'kecamatan',
        'kabkota',
        'no_hp',
        'bank',
        'no_rekening',
        'no_bpjs',
        'pas_foto',
        'status_insentif',
    ];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'nik', 'nik');
    }
}