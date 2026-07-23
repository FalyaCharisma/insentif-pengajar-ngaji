<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PengajuanInsentif extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengajuan_insentif';

    protected $fillable = ['proposal_id', 'pengajar_id', 'status', 'catatan', 'verified_by', 'verified_at'];

    public function proposal()
    {
        return $this->belongsTo(PengajuanProposal::class, 'proposal_id');
    }

    public function pengajar()
    {
        return $this->belongsTo(Pengajar::class, 'pengajar_id');
    }

    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
