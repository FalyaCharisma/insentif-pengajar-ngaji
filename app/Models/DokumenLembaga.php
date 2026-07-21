<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DokumenLembaga extends Model
{
    use SoftDeletes;

    protected $table = 'dokumen_lembaga';

    protected $guarded = [];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }

    public function jenisDokumen()
    {
        return $this->belongsTo(
            JenisDokumen::class,
            'jenis_dokumen_id'
        );
    }

    public function verifier()
    {
        return $this->belongsTo(
            User::class,
            'verified_by'
        );
    }
}
