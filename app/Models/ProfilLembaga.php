<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilLembaga extends Model
{
    use HasFactory;
    protected $table = 'profil_lembaga';
    protected $guarded = [];

    public function lembaga()
    {
        return $this->belongsTo(Lembaga::class);
    }
}
