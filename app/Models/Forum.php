<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Forum extends Model
{
    use SoftDeletes;

    protected $table = 'forum';

    protected $fillable = [
        'user_id',
        'kode',
        'nama',
        'telepon',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function lembaga()
    {
        return $this->hasMany(Lembaga::class);
    }

    public static function generateKode(): string
    {
        $last = self::withTrashed()
            ->orderByDesc('id')
            ->first();

        $number = 1;

        if ($last) {
            $number = (int) substr($last->kode, 3) + 1;
        }

        return 'FRM' . str_pad($number, 5, '0', STR_PAD_LEFT);
    }
}