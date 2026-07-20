<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Forum extends Model
{
    use SoftDeletes;

    protected $table = 'forum';

    protected $fillable = [
        'user_id',
        'kategori_id',
        'nama',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kategori()
    {
        return $this->belongsTo(KategoriLembaga::class, 'kategori_id');
    }

    public function lembaga()
    {
        return $this->hasMany(Lembaga::class);
    }
}