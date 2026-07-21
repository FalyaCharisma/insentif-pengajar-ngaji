<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisDokumen extends Model
{
    use SoftDeletes;

    protected $table = 'jenis_dokumen';

    protected $guarded = [];

    public function dokumen()
    {
        return $this->hasMany(DokumenLembaga::class);
    }
}
