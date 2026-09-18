<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Berita extends Model
{
    protected $fillable = ['judul', 'slug', 'kategori', 'excerpt', 'isi', 'gambar', 'published_at', 'is_published'];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->where(function ($query) {
            $query->whereNull('published_at')->orWhere('published_at', '<=', now());
        });
    }
}
