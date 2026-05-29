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
    XCircle,
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
            {
                id: 'mojo-001',
                nama: 'PKBM Tunas Bangsa',
                jenis: 'PKBM',
                kelurahan: 'Bandar Lor',
                pendidik: 18,
                status: 'Tervalidasi',
                alamat: 'Jl. Sudirman No. 45, Bandar Lor, Mojoroto',
                latitude: -7.2506,
                longitude: 111.9122,
                daftarPendidik: [
                    { id: 'pd-001', nama: 'Budi Santoso', jabatan: 'Kepala Lembaga', foto: 'https://i.pravatar.cc/150?img=1' },
                    { id: 'pd-002', nama: 'Siti Nurhaliza', jabatan: 'Guru Bahasa Indonesia', foto: 'https://i.pravatar.cc/150?img=2' },
                    { id: 'pd-003', nama: 'Ahmad Wijaya', jabatan: 'Guru Matematika', foto: 'https://i.pravatar.cc/150?img=3' },
                ],
            },
            {
                id: 'mojo-002',
                nama: 'LKP Citra Mandiri',
                jenis: 'LKP',
                kelurahan: 'Mojoroto',
                pendidik: 11,
                status: 'Proses',
                alamat: 'Jl. Diponegoro No. 23, Mojoroto',
                latitude: -7.2480,
                longitude: 111.9145,
                daftarPendidik: [
                    { id: 'pd-004', nama: 'Dewi Kusuma', jabatan: 'Koordinator Program', foto: 'https://i.pravatar.cc/150?img=4' },
                    { id: 'pd-005', nama: 'Roni Hermawan', jabatan: 'Instruktur Komputer', foto: 'https://i.pravatar.cc/150?img=5' },
                ],
            },
            {
                id: 'mojo-003',
                nama: 'TPQ Al Hikmah',
                jenis: 'TPQ',
                kelurahan: 'Sukorame',
                pendidik: 9,
                status: 'Tervalidasi',
                alamat: 'Jl. KH. Achmad Dahlan No. 12, Sukorame',
                latitude: -7.2450,
                longitude: 111.9200,
                daftarPendidik: [
                    { id: 'pd-006', nama: 'H. Abdurrahman', jabatan: 'Pengasuh TPQ', foto: 'https://i.pravatar.cc/150?img=6' },
                    { id: 'pd-007', nama: 'Fatimah Az Zahra', jabatan: 'Pengajar', foto: 'https://i.pravatar.cc/150?img=7' },
                ],
            },
            {
                id: 'mojo-004',
                nama: 'TPQ Al Furqan',
                jenis: 'TPQ',
                kelurahan: 'Sukorame',
                pendidik: 9,
                status: 'Tervalidasi',
                alamat: 'Jl. KH. Achmad Dahlan No. 12, Sukorame',
                latitude: -7.2450,
                longitude: 111.9200,
                daftarPendidik: [
                    { id: 'pd-006', nama: 'H. Abdurrahman', jabatan: 'Pengasuh TPQ', foto: 'https://i.pravatar.cc/150?img=6' },
                    { id: 'pd-007', nama: 'Fatimah Az Zahra', jabatan: 'Pengajar', foto: 'https://i.pravatar.cc/150?img=7' },
                ],
            },
            {
                id: 'mojo-005',
                nama: 'TPQ Al Mujahidin',
                jenis: 'TPQ',
                kelurahan: 'Sukorame',
                pendidik: 9,
                status: 'Tervalidasi',
                alamat: 'Jl. KH. Achmad Dahlan No. 12, Sukorame',
                latitude: -7.2450,
                longitude: 111.9200,
                daftarPendidik: [
                    { id: 'pd-006', nama: 'H. Abdurrahman', jabatan: 'Pengasuh TPQ', foto: 'https://i.pravatar.cc/150?img=6' },
                    { id: 'pd-007', nama: 'Fatimah Az Zahra', jabatan: 'Pengajar', foto: 'https://i.pravatar.cc/150?img=7' },
                ],
            },
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
            {
                id: 'kota-001',
                nama: 'PAUD Harapan Kota',
                jenis: 'PAUD Nonformal',
                kelurahan: 'Kampung Dalem',
                pendidik: 14,
                status: 'Tervalidasi',
                alamat: 'Jl. Ahmad Yani No. 56, Kampung Dalem, Kota',
                latitude: -7.2550,
                longitude: 111.8950,
                daftarPendidik: [
                    { id: 'pd-008', nama: 'Eka Putri', jabatan: 'Kepala PAUD', foto: 'https://i.pravatar.cc/150?img=8' },
                    { id: 'pd-009', nama: 'Lisda Wijaya', jabatan: 'Guru PAUD', foto: 'https://i.pravatar.cc/150?img=9' },
                    { id: 'pd-010', nama: 'Tri Nugroho', jabatan: 'Pendamping', foto: 'https://i.pravatar.cc/150?img=10' },
                    { id: 'pd-011', nama: 'Siti Aisyah', jabatan: 'Pendamping', foto: 'https://i.pravatar.cc/150?img=11' },
                    { id: 'pd-012', nama: 'Andi Prasetyo', jabatan: 'Pendamping', foto: 'https://i.pravatar.cc/150?img=12' },
                    { id: 'pd-013', nama: 'Dewi Sartika', jabatan: 'Pendamping', foto: 'https://i.pravatar.cc/150?img=13' },
                    { id: 'pd-014', nama: 'Budi Santoso', jabatan: 'Pendamping', foto: 'https://i.pravatar.cc/150?img=14' },
                    { id: 'pd-015', nama: 'Ani Permata', jabatan: 'Pendamping', foto: 'https://i.pravatar.cc/150?img=15' },
                ],
            },
            {
                id: 'kota-002',
                nama: 'TBM Literasi Kediri',
                jenis: 'TBM',
                kelurahan: 'Balowerti',
                pendidik: 7,
                status: 'Tervalidasi',
                alamat: 'Jl. Pemuda No. 78, Balowerti',
                latitude: -7.2520,
                longitude: 111.8900,
                daftarPendidik: [
                    { id: 'pd-011', nama: 'Hendra Gunawan', jabatan: 'Pengelola TBM', foto: 'https://i.pravatar.cc/150?img=11' },
                ],
            },
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
            {
                id: 'pst-001',
                nama: 'Kursus Mandiri Kreatif',
                jenis: 'LKP',
                kelurahan: 'Pesantren',
                pendidik: 16,
                status: 'Tervalidasi',
                alamat: 'Jl. Slamet Riyadi No. 34, Pesantren',
                latitude: -7.2600,
                longitude: 111.9300,
                daftarPendidik: [
                    { id: 'pd-012', nama: 'Bambang Sutrisno', jabatan: 'Direktur', foto: 'https://i.pravatar.cc/150?img=12' },
                    { id: 'pd-013', nama: 'Lina Handoko', jabatan: 'Instruktur Kreatif', foto: 'https://i.pravatar.cc/150?img=13' },
                ],
            },
            {
                id: 'pst-002',
                nama: 'PKBM Cerdas Mulia',
                jenis: 'PKBM',
                kelurahan: 'Ketami',
                pendidik: 22,
                status: 'Proses',
                alamat: 'Jl. Merdeka No. 89, Ketami',
                latitude: -7.2650,
                longitude: 111.9350,
                daftarPendidik: [
                    { id: 'pd-014', nama: 'Yusuf Habibie', jabatan: 'Kepala PKBM', foto: 'https://i.pravatar.cc/150?img=14' },
                    { id: 'pd-015', nama: 'Ratna Dewi', jabatan: 'Tutor', foto: 'https://i.pravatar.cc/150?img=15' },
                ],
            },
        ],
    },
];

export const statistik = [
    { label: 'Total Lembaga', value: '129', icon: Building2, tone: 'success' as const },
    { label: 'Total Pendidik', value: '983', icon: GraduationCap, tone: 'primary' as const },
    { label: 'Tervalidasi', value: '843', icon: CheckCircle2, tone: 'success' as const },
    { label: 'Tidak Menerima Insentif', value: '140', icon: XCircle, tone: 'danger' as const },
];

export const layanan = [
    { title: 'Pengajuan Proposal', desc: 'Usulan penerima insentif pendidik non formal.', icon: HandCoins },
    { title: 'Pengajuan Insentif', desc: 'Usulan penerima insentif pendidik non formal.', icon: HandCoins },
    { title: 'Verifikasi Data', desc: 'Verifikasi data penerima insentif pendidik non formal.', icon: HandCoins },
  
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