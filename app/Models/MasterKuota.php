<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasterKuota extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'master_kuota';

    protected $fillable = ['periode_id', 'forum_id', 'kategori_id', 'jumlah_kuota', 'keterangan'];

    public function periode()
    {
        return $this->belongsTo(Periode::class);
    }

    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }

    public function kategori()
    {
        return $this->belongsTo(KategoriLembaga::class);
    }
    public function kuota()
    {
        return $this->hasMany(Kuota::class, 'master_kuota_id');
    }
}
