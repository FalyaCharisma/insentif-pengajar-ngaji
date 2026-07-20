
import type { SidebarMenu } from "@/types/sidebar"; 
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Building2,
    FileText,
    UserStar,
    Settings,
    Shield,
    BookOpen,
    GraduationCap,
    ClipboardCheck,
    BarChart3,
    Wallet,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";


export const sidebarMenus = (lembagaId?: number): SidebarMenu[] => [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        roles: ["superadmin", "dindik", "lembaga", "forum"],
    },

    {
        title: "Manajemen User",
        icon: Shield,
        roles: ["superadmin"],
        children: [
            {
                title: "User",
                href: "/users",
                roles: ["superadmin"],
            },
            {
                title: "Role & Permission",
                href: "/roles",
                roles: ["superadmin"],
            },
        ],
    },

    {
        title: "Master Data",
        icon: FolderKanban,
        roles: ["superadmin", "dindik"],
        children: [
            {
                title: "Kategori Lembaga",
                href: "/kategori",
                roles: ["superadmin", "dindik"],
            },
            {
                title: "Lembaga",
                href: "/lembaga",
                activeMatch: [
                    "/lembaga",
                    "/dokumen/lembaga",
                ],
                roles: ["superadmin", "dindik"],
            },
            {
                title: "Forum",
                href: "/forum",
                roles: ["superadmin", "dindik"],
            },
            // {
            //     title: "Pengurus",
            //     href: "/pengurus",
            //     roles: ["superadmin"],
            // },
            {
                title: "Jenis Dokumen",
                href: "/jenis-dokumen",
                roles: ["superadmin", "dindik"],
            },
        ],
    },
    {
        title: "Program Insentif",
        icon: Wallet,
        roles: ["superadmin", "dindik"],
        children: [
            {
                title: "Periode Pengajuan",
                href: "/periode",
                roles: ["superadmin", "dindik"],
            },
            {
                title: "Kuota Penerima",
                href: "/kuota",
                roles: ["superadmin", "dindik"],
            },
            {
                title: "Mapping Forum",
                href: "/mapping-forum",
                roles: ["superadmin", "dindik"],
            },
            {
                title: "Mapping Kategori",
                href: "/mapping-kategori",
                roles: ["superadmin", "dindik"],
            },
        ],
    },

    {
        title: "Profil Lembaga",
        icon: Building2,
        roles: ["lembaga"],
        children: [
            {
                title: "Profil",
                href: lembagaId
                    ? `/lembaga/${lembagaId}/profil`
                    : "#",
                roles: ["lembaga"],
            },
            {
                title: "Dokumen Lembaga",
                href: lembagaId
                    ? `/dokumen/lembaga/${lembagaId}`
                    : "#",
                roles: ["lembaga"],
            },
        ],
    },

    {
        title: "Pengajar",
        icon: GraduationCap,
        roles: ["superadmin", "dindik", "lembaga", "forum"],
        children: [
            {
                title: "Data Pengajar",
                href: "/pengajar",
                roles: ["superadmin", "dindik", "lembaga"],
            },
            {
                title: "Verifikasi Pengajar",
                href: "/verifikasi-pengajar",
                roles: ["superadmin", "forum"],
            },
        ],
    },

    {
        title: "Data Siswa",
        icon: BookOpen,
        href: "/data-siswa",
        roles: ["superadmin", "lembaga"],
    },

    {
        title: "Proposal",
        icon: FileText,
        roles: ["superadmin", "dindik", "lembaga", "forum"],
        children: [
            {
                title: "Pengajuan Proposal",
                href: "/pengajuan-proposal",
                roles: ["superadmin", "lembaga"],
            },
            // {
            //     title: "Data Proposal",
            //     href: "/proposal",
            //     roles: ["superadmin", "dindik", "superadmin"],
            // },
            // {
            //     title: "Verifikasi Proposal",
            //     href: "/verifikasi-proposal",
            //     roles: ["superadmin", "forum"],
            // },
            // {
            //     title: "Status Proposal",
            //     href: "/status-proposal",
            //     roles: ["superadmin", "lembaga", "dindik"],
            // },
            // {
            //     title: "Catatan Revisi",
            //     href: "/catatan-revisi",
            //     roles: ["superadmin", "lembaga"],
            // },
        ],
    },

    {
        title: "Pengajuan Insentif",
        icon: UserStar,
        roles: ["superadmin", "lembaga", "forum", "dindik"],
        children: [
            {
                title: "Pengajuan",
                href: "/pengajuan-insentif",
                roles: ["superadmin", "lembaga"],
            },
            {
                title: "Usulan Penerima",
                href: "/usulan-penerima",
                roles: ["superadmin", "lembaga"],
            },
            {
                title: "Verifikasi Penerima",
                href: "/verifikasi-penerima",
                roles: ["superadmin", "forum"],
            },
            {
                title: "Finalisasi",
                href: "/finalisasi",
                roles: ["superadmin", "forum"],
            },
            {
                title: "Kuota Estimasi",
                href: "/kuota-estimasi",
                roles: ["superadmin", "lembaga"],
            },
        ],
    },

    {
        title: "Monitoring",
        icon: BarChart3,
        roles: ["superadmin", "dindik", "forum"],
        children: [
            {
                title: "Monitoring Verifikasi",
                href: "/monitoring",
                roles: ["superadmin", "dindik", "forum"],
            },
            {
                title: "Lembaga Belum Diverifikasi",
                href: "/belum-verifikasi",
                roles: ["superadmin", "dindik"],
            },
            {
                title: "Progress Lembaga",
                href: "/progress-lembaga",
                roles: ["superadmin", "forum"],
            },
            {
                title: "Kuota Terpakai",
                href: "/kuota-terpakai",
                roles: ["superadmin", "forum"],
            },
            {
                title: "Audit Log",
                href: "/audit-log",
                roles: ["superadmin", "superadmin"],
            },
        ],
    },

    {
        title: "Settings",
        icon: Settings,
        href: "/settings",
        roles: ["superadmin", "dindik", "lembaga", "forum"],
    },
];