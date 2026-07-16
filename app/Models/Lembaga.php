<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lembaga extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'lembaga';
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function profil()
    {
        return $this->belongsTo(ProfilLembaga::class);
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function pengurus()
    {
        return $this->hasMany(Pengurus::class);
    }

    public function pengajuanProposal()
    {
        return $this->hasMany(PengajuanProposal::class);
    }

    public static function generateKode(): string
    {
        $last = self::withTrashed()
            ->orderByDesc('id')
            ->first();

        $number = 1;

        if ($last) {
            $number = (int) substr($last->kode_lembaga, 3) + 1;
        }

        return 'LMB' . str_pad($number, 5, '0', STR_PAD_LEFT);
    }

    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }
}
