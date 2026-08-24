<?php

namespace App\Services;
use App\Models\Lembaga;
use App\Models\ProfilLembaga;
use App\Models\KategoriLembaga;
use App\Models\Pengajar;
use App\Models\Forum;
use App\Models\Siswa;
use App\Models\PengajuanProposal;
use App\Models\PengajuanInsentif;
use App\Models\Periode;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class LembagaDashboardService
{
    public function index(int $periodeId): array
    {
        $data = [
            'statistics' => $this->getStatistics($periodeId),
            'profileProgress' => $this->getProfileProgress(),
            'currentPeriode' => $this->getCurrentPeriode($periodeId),
            'profileSummary'  => $this->getProfileSummary(),
            'teacherChart'     => $this->getTeacherChart(),
        ];

        return $data;
    }

    private function getStatistics(int $periodeId): array
    {
        $user = Auth::user()->load([
            'lembaga.profil',
            'lembaga.pengajuanProposal',
        ]);

        $lembaga = $user->lembaga;

        if (!$lembaga) {
            return [
                'status_profil' => 'pending',
                'total_pengajar' => 0,
                'total_siswa' => 0,
                'status_proposal' => 'belum',
            ];
        }

        $proposal = $lembaga->pengajuanProposal()
            ->where('periode_id', $periodeId)
            ->latest()
            ->first();

        return [
            'status_profil' => $lembaga->profil?->status_verifikasi ?? 'pending',

            'total_pengajar' => $lembaga->pengajar()->count(),

            'total_siswa' => $lembaga->siswa()
                ->where('periode_id', $periodeId)
                ->value('jumlah_siswa') ?? 0,

            'status_proposal' => $proposal?->status ?? 'belum',
        ];
    }
    
    private function getProfileProgress(): array
    {
        $profil = auth()->user()
            ->lembaga
            ->profil;

        if (!$profil) {
            return [
                'progress' => 0,
                'items' => [],
            ];
        }

        $items = [
            [
                'title' => 'Informasi Lembaga',
                'completed' => filled($profil->nomor_registrasi)
                    && filled($profil->tahun_berdiri),
            ],

            [
                'title' => 'Alamat',
                'completed' =>
                    filled($profil->alamat) &&
                    filled($profil->provinsi) &&
                    filled($profil->kabupaten) &&
                    filled($profil->kecamatan) &&
                    filled($profil->kelurahan) &&
                    filled($profil->kode_pos),
            ],

            [
                'title' => 'Kontak',
                'completed' =>
                    filled($profil->telepon) &&
                    filled($profil->email),
            ],

            [
                'title' => 'Pimpinan',
                'completed' =>
                    filled($profil->nama_pimpinan) &&
                    filled($profil->jabatan_pimpinan),
            ],

            [
                'title' => 'Operator',
                'completed' =>
                    filled($profil->nama_operator) &&
                    filled($profil->no_hp_operator),
            ],

            [
                'title' => 'Rekening',
                'completed' =>
                    filled($profil->nama_bank) &&
                    filled($profil->nomor_rekening) &&
                    filled($profil->atas_nama_rekening),
            ],
        ];

        $completed = collect($items)
            ->where('completed', true)
            ->count();

        return [
            'progress' => round(($completed / count($items)) * 100),
            'completed' => $completed,
            'total' => count($items),
            'items' => $items,
        ];
    }

    private function getCurrentPeriode(int $periodeId): array
    {
        $periode = Periode::find($periodeId);

        if (!$periode) {
            return [];
        }

        return [
            'tahun' => $periode->tahun,
            'mulai_upload' => $periode->mulai_upload,
            'selesai_upload' => $periode->selesai_upload,
            'status' => $periode->status,
        ];
    }

    private function getProfileSummary(): array
    {
        $user = auth()->user()->load([
            'lembaga.kategori',
            'lembaga.forum',
            'lembaga.profil',
        ]);

        $lembaga = $user->lembaga;

        return [
            'nama' => $lembaga->nama,

            'kategori' => $lembaga->kategori?->nama ?? '-',

            'forum' => $lembaga->forum?->nama ?? '-',

            'nomor_registrasi' =>
                $lembaga->profil?->nomor_registrasi ?? '-',

            'status' =>
                $lembaga->profil?->status_verifikasi ?? 'pending',
        ];
    }

    private function getTeacherChart(): array
    {
        $lembaga = auth()->user()->lembaga;

        $pendidikan = [
            'SMA',
            'D-III',
            'S1',
            'S2',
        ];

        $male = [];
        $female = [];

        foreach ($pendidikan as $item) {

            $male[] = $lembaga->pengajar()
                ->where('pendidikan_terakhir', $item)
                ->where('jk', 'L')
                ->count();

            $female[] = $lembaga->pengajar()
                ->where('pendidikan_terakhir', $item)
                ->where('jk', 'P')
                ->count();
        }

        return [
            'categories' => $pendidikan,

            'series' => [

                [
                    'name' => 'Laki-laki',
                    'data' => $male,
                ],

                [
                    'name' => 'Perempuan',
                    'data' => $female,
                ],

            ],
        ];
    }
}