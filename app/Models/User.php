<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return $this->getRoleNames()->first();
    }

    public function lembaga()
    {
        return $this->hasOne(Lembaga::class);
    }

    public function pengurus()
    {
        return $this->hasOne(Pengurus::class, 'nik', 'nik');
    }

    public function forum()
    {
        return $this->hasOne(Forum::class);
    }

    public function verifikasiPengajuanInsentif()
    {
        return $this->hasMany(PengajuanInsentif::class, 'verified_by');
    }
}
