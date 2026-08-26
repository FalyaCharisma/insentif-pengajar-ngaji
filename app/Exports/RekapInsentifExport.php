<?php

namespace App\Exports;

use App\Models\PengajuanInsentif;
use App\Models\Periode;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class RekapInsentifExport implements FromCollection, WithHeadings, WithEvents
{
    public function __construct(
        protected int $periodeId
    ) {}

    public function collection(): Collection
    {
        $data = PengajuanInsentif::with([
            'pengajar.lembaga',
            'pengajar.lembaga.profil',
            'proposal',
        ])
            ->whereHas('proposal', function ($query) {
                $query->where('periode_id', $this->periodeId);
            })
            ->get()
            ->sortBy(function ($item) {
                return match ($item->status) {
                    'verified' => 1,
                    'pending' => 2,
                    'revision' => 3,
                    'rejected' => 4,
                    default => 5,
                };
            })
            ->values();

        return $data->map(function ($item, $index) {

            $pengajar = $item->pengajar;
            $lembaga = $pengajar?->lembaga;
            $profil = $lembaga?->profil;

            return [
                'no' => $index + 1,

                'status' => match ($item->status) {
                    'verified' => 'Menerima',
                    'pending' => 'Menunggu Verifikasi',
                    'revision' => 'Perlu Revisi',
                    'rejected' => 'Tidak Menerima',
                    default => ucfirst($item->status),
                },

                'nama_lembaga' => $lembaga?->nama ?? '-',

                'alamat' => $profil?->alamat ?? '-',

                'kelurahan' => $profil?->kelurahan ?? '-',

                'kecamatan' => $profil?->kecamatan ?? '-',

                'kode_pos' => $profil?->kode_pos ?? '-',

                'pimpinan' => $profil?->nama_pimpinan ?? '-',

                'nik_guru' => $pengajar?->nik ?? '-',

                'no_rekening' => $pengajar?->no_rekening ?? '-',

                'no_telepon' => $pengajar?->no_hp ?? '-',
            ];
        });
    }

    public function headings(): array
    {
        return [
            'No',
            'Status Insentif',
            'Nama Lembaga',
            'Alamat',
            'Kelurahan',
            'Kecamatan',
            'Kode Pos',
            'Pimpinan',
            'NIK Pengajar',
            'No. Rekening',
            'No. Telepon',
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $sheet = $event->sheet->getDelegate();

                /*
                |--------------------------------------------------------------------------
                | JUDUL
                |--------------------------------------------------------------------------
                */

                // Sisipkan 2 baris di atas tabel
                $sheet->insertNewRowBefore(1, 2);

                // Merge judul
                $sheet->mergeCells('A1:K1');

                $sheet->setCellValue(
                    'A1',
                    'REKAP DATA INSENTIF PENGAJAR PERIODE ' .
                    $this->getTahunPeriode()
                );

                $sheet->getStyle('A1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 16,
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                ]);

                $sheet->getRowDimension(1)->setRowHeight(30);

                /*
                |--------------------------------------------------------------------------
                | HEADER
                |--------------------------------------------------------------------------
                */

                $sheet->getStyle('A3:K3')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'color' => [
                            'rgb' => 'FFFFFF',
                        ],
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => [
                            'rgb' => '334155',
                        ],
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                ]);

                /*
                |--------------------------------------------------------------------------
                | FREEZE HEADER
                |--------------------------------------------------------------------------
                */

                $sheet->freezePane('A4');

                /*
                |--------------------------------------------------------------------------
                | FILTER
                |--------------------------------------------------------------------------
                */

                $highestRow = $sheet->getHighestRow();

                $sheet->getAutoFilter()
                    ->setRange("A3:K{$highestRow}");

                /*
                |--------------------------------------------------------------------------
                | AUTO WIDTH
                |--------------------------------------------------------------------------
                */

                foreach (range('A', 'K') as $column) {
                    $sheet->getColumnDimension($column)
                        ->setAutoSize(true);
                }

                /*
                |--------------------------------------------------------------------------
                | WARNA STATUS
                |--------------------------------------------------------------------------
                */

                for ($row = 4; $row <= $highestRow; $row++) {

                    $status = $sheet
                        ->getCell("B{$row}")
                        ->getValue();

                    $color = match ($status) {
                        'Menerima' => 'DCFCE7',
                        'Menunggu Verifikasi' => 'FEF3C7',
                        'Perlu Revisi' => 'FFEDD5',
                        'Tidak Menerima' => 'FEE2E2',
                        default => 'FFFFFF',
                    };

                    $textColor = match ($status) {
                        'Menerima' => '166534',
                        'Menunggu Verifikasi' => '92400E',
                        'Perlu Revisi' => '9A3412',
                        'Tidak Menerima' => '991B1B',
                        default => '000000',
                    };

                    $sheet->getStyle("B{$row}")->applyFromArray([
                        'font' => [
                            'bold' => true,
                            'color' => [
                                'rgb' => $textColor,
                            ],
                        ],
                        'fill' => [
                            'fillType' => Fill::FILL_SOLID,
                            'startColor' => [
                                'rgb' => $color,
                            ],
                        ],
                        'alignment' => [
                            'horizontal' => Alignment::HORIZONTAL_CENTER,
                            'vertical' => Alignment::VERTICAL_CENTER,
                        ],
                    ]);
                }

                /*
                |--------------------------------------------------------------------------
                | TINGGI BARIS DATA
                |--------------------------------------------------------------------------
                */

                for ($row = 4; $row <= $highestRow; $row++) {
                    $sheet->getRowDimension($row)->setRowHeight(22);
                }
            },
        ];
    }

    private function getTahunPeriode(): int
    {
        return Periode::find($this->periodeId)?->tahun
            ?? $this->periodeId;
    }
}