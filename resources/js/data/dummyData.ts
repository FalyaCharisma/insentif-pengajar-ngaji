import {
    Building2,
    CheckCircle2,
    FileText,
    GraduationCap,
    HandCoins,
    HelpCircle,
    Landmark,
    MonitorCheck,
    Newspaper,
    Phone,
    ShieldCheck,
    Users,
} from 'lucide-react';
import { BeritaItem, KecamatanItem } from '@/types/index';

export const kecamatanData: KecamatanItem[] = [
    {
        id: 'mojoroto',
        name: 'Mojoroto',
        path: 'M95,45 C60,55 42,82 45,122 C48,164 76,192 114,205 C126,176 130,143 124,113 C118,82 120,60 95,45 Z',
        label: { x: 80, y: 128 },
        stats: {
            lembaga: 42,
            pendidik: 318,
            tervalidasi: 271,
            insentif: 'Rp 477 Jt',
        },
        lembaga: [
            { nama: 'PKBM Tunas Bangsa', jenis: 'PKBM', kelurahan: 'Bandar Lor', pendidik: 18, status: 'Tervalidasi' },
            { nama: 'LKP Citra Mandiri', jenis: 'LKP', kelurahan: 'Mojoroto', pendidik: 11, status: 'Proses' },
            { nama: 'TPQ Al Hikmah', jenis: 'TPQ', kelurahan: 'Sukorame', pendidik: 9, status: 'Tervalidasi' },
        ],
    },
    {
        id: 'kota',
        name: 'Kota',
        path: 'M126,48 C158,36 194,48 206,80 C217,111 196,140 167,151 C146,160 132,145 125,120 C119,94 112,64 126,48 Z',
        label: { x: 158, y: 102 },
        stats: {
            lembaga: 36,
            pendidik: 264,
            tervalidasi: 228,
            insentif: 'Rp 396 Jt',
        },
        lembaga: [
            { nama: 'PAUD Harapan Kota', jenis: 'PAUD Nonformal', kelurahan: 'Kampung Dalem', pendidik: 14, status: 'Tervalidasi' },
            { nama: 'TBM Literasi Kediri', jenis: 'TBM', kelurahan: 'Balowerti', pendidik: 7, status: 'Tervalidasi' },
            { nama: 'Sanggar Belajar Satria', jenis: 'Sanggar', kelurahan: 'Semampir', pendidik: 10, status: 'Perbaikan' },
        ],
    },
    {
        id: 'pesantren',
        name: 'Pesantren',
        path: 'M184,150 C221,138 251,154 264,189 C277,225 255,263 216,270 C177,277 146,252 140,214 C134,181 154,159 184,150 Z',
        label: { x: 202, y: 215 },
        stats: {
            lembaga: 51,
            pendidik: 401,
            tervalidasi: 344,
            insentif: 'Rp 601 Jt',
        },
        lembaga: [
            { nama: 'Kursus Mandiri Kreatif', jenis: 'LKP', kelurahan: 'Pesantren', pendidik: 16, status: 'Tervalidasi' },
            { nama: 'PKBM Cerdas Mulia', jenis: 'PKBM', kelurahan: 'Ketami', pendidik: 22, status: 'Proses' },
            { nama: 'TPQ Nurul Ilmi', jenis: 'TPQ', kelurahan: 'Tempurejo', pendidik: 12, status: 'Tervalidasi' },
        ],
    },
];

export const statistik = [
    { label: 'Total Lembaga', value: '129', icon: Building2, tone: 'success' as const },
    { label: 'Total Pendidik', value: '983', icon: GraduationCap, tone: 'primary' as const },
    { label: 'Tervalidasi', value: '843', icon: CheckCircle2, tone: 'success' as const },
    { label: 'Estimasi Insentif', value: 'Rp 1,47 M', icon: HandCoins, tone: 'warning' as const },
];

export const layanan = [
    { title: 'Pengajuan Insentif', desc: 'Usulan penerima insentif pendidik non formal.', icon: HandCoins },
    { title: 'Validasi Lembaga', desc: 'Pemeriksaan data profil dan legalitas lembaga.', icon: ShieldCheck },
    { title: 'Data Pendidik', desc: 'Pendataan pengajar, tutor, dan tenaga pendidikan.', icon: Users },
    { title: 'Berkas Persyaratan', desc: 'Unggah dan cek kelengkapan dokumen program.', icon: FileText },
    { title: 'Monitoring Program', desc: 'Pantau rekap data per kecamatan dan status validasi.', icon: MonitorCheck },
    { title: 'Pusat Bantuan', desc: 'Panduan, kontak admin, dan bantuan teknis layanan.', icon: HelpCircle },
];

export const berita: BeritaItem[] = [
    {
        title: 'Pendataan Penerima Insentif Pendidik Non Formal Dibuka',
        date: '25 Mei 2026',
        category: 'Pengumuman',
        excerpt: 'Dinas Pendidikan Kota Kediri membuka periode verifikasi data lembaga dan pendidik non formal tahun berjalan.',
    },
    {
        title: 'Sosialisasi Validasi Data Lembaga Pendidikan Non Formal',
        date: '22 Mei 2026',
        category: 'Berita',
        excerpt: 'Kegiatan sosialisasi dilaksanakan untuk meningkatkan ketepatan data penerima bantuan dan insentif.',
    },
    {
        title: 'Integrasi Layanan Digital Pendidikan Kota Kediri',
        date: '18 Mei 2026',
        category: 'Info Layanan',
        excerpt: 'Portal ini disiapkan sebagai pusat informasi, layanan, dan monitoring program pendidikan masyarakat.',
    },
];

export const quickLinks = [
    { label: 'Status Validasi', value: 'Realtime', icon: MonitorCheck },
    { label: 'Legalitas Lembaga', value: 'Terdata', icon: Landmark },
    { label: 'Berita Resmi', value: 'Aktif', icon: Newspaper },
    { label: 'Bantuan Admin', value: 'Siaga', icon: Phone },
];