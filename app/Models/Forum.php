<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Forum extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'forum';

    protected $fillable = [
        'nama',
        'kategori_id',
        'nik',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function lembaga()
    {
        return $this->hasMany(Lembaga::class);
    }
}