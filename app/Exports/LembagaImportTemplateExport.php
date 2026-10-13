<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class LembagaImportTemplateExport implements FromArray, WithColumnWidths, WithHeadings, WithStyles
{
    public function array(): array
    {
        return [];
    }

    public function headings(): array
    {
        return ['Nama Forum', 'Nama Lembaga'];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 32,
            'B' => 32,
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
