<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class LembagaAccountsExport implements
    FromCollection,
    WithHeadings,
    WithStyles,
    ShouldAutoSize,
    WithColumnFormatting
{
    public function __construct(private Collection $lembaga) {}

    public function collection(): Collection
    {
        return $this->lembaga->map(fn ($item) => [
            $item->forum?->nama ?? '-',
            $item->nama,
            $item->user?->email ?? strtolower($item->kode) . '@mail.com',
            $item->kode . '@kdr',
        ]);
    }

    public function headings(): array
    {
        return [
            'Nama Forum',
            'Nama Lembaga',
            'Email / Username',
            'Password (Awal/Reset)',
        ];
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_TEXT,
            'B' => NumberFormat::FORMAT_TEXT,
            'C' => NumberFormat::FORMAT_TEXT,
            'D' => NumberFormat::FORMAT_TEXT,
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        $lastRow = $sheet->getHighestRow();

        // Header
        $sheet->getStyle('A1:D1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 11,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '0F766E'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
        ]);

        // Seluruh tabel
        $sheet->getStyle("A1:D{$lastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'D1D5DB'],
                ],
            ],
            'alignment' => [
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        // Header dibuat lebih tinggi
        $sheet->getRowDimension(1)->setRowHeight(30);

        // Data rata kiri dan tidak terpotong
        if ($lastRow > 1) {
            $sheet->getStyle("A2:D{$lastRow}")
                ->getAlignment()
                ->setHorizontal(Alignment::HORIZONTAL_LEFT);
        }

        // Lebar minimum kolom
        foreach (['A' => 20, 'B' => 25, 'C' => 30, 'D' => 25] as $column => $width) {
            $sheet->getColumnDimension($column)
                ->setWidth(max(
                    $sheet->getColumnDimension($column)->getWidth(),
                    $width
                ));
        }

        // Filter pada header
        $sheet->setAutoFilter("A1:D{$lastRow}");

        return [];
    }
}