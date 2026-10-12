<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengajar extends Model
{
    protected $table = 'pengajar';

    protected $fillable = [
        'nik',
        'nama',
        'tempat_lahir',
        'tgl_lahir',
        'jk',
        'jabatan',
        'lembaga_id',
        'pendidikan_terakhir',
        'jurusan',
        'sekolah_universitas',
        'tahun_lulus',
        'agama',
        'alamat',
        'provinsi',
        'kabkota',
        'kecamatan',
        'kelurahan',
        'no_hp',
        'bank',
        'no_rekening',
        'no_bpjs',
        'pas_foto',
        'ktp',
        'ijazah',
        'sk_penetapan',
        'status',
    ];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class, 'lembaga_id');
    }
}