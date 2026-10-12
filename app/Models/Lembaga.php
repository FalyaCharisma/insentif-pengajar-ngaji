<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lembaga extends Model
{
    protected $table = 'lembaga';

    protected $fillable = [
        'nama',
        'alamat',
        'email',
    ];
}
