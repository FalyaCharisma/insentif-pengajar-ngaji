import { LucideIcon } from "lucide-react";

export interface SidebarMenu {
    title: string;
    href?: string;
    icon?: LucideIcon;
    roles: string[];
    children?: SidebarMenu[];
}

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

export const sidebarMenus: SidebarMenu[] = [
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
                icon: FolderKanban,
                roles: ["superadmin"],
            },
            {
                title: "Lembaga",
                href: "/lembaga",
                icon: Building2,
                roles: ["superadmin", "dindik"],
            },
            {
                title: "Forum",
                href: "/forum",
                icon: Users,
                roles: ["superadmin"],
            },
            {
                title: "Pengurus",
                href: "/pengurus",
                icon: Users,
                roles: ["superadmin"],
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
                href: "/profil-lembaga",
                roles: ["lembaga"],
            },
            {
                title: "Dokumen Lembaga",
                href: "/dokumen-lembaga",
                roles: ["lembaga"],
            },
        ],
    },

    {
        title: "Pengajar",
        icon: GraduationCap,
        roles: ["dindik", "lembaga", "forum"],
        children: [
            {
                title: "Data Pengajar",
                href: "/pengajar",
                roles: ["dindik", "lembaga"],
            },
            {
                title: "Verifikasi Pengajar",
                href: "/verifikasi-pengajar",
                roles: ["forum"],
            },
        ],
    },

    {
        title: "Data Siswa",
        icon: BookOpen,
        href: "/data-siswa",
        roles: ["lembaga"],
    },

    {
        title: "Proposal",
        icon: FileText,
        roles: ["superadmin", "dindik", "lembaga", "forum"],
        children: [
            {
                title: "Pengajuan Proposal",
                href: "/pengajuan-proposal",
                roles: ["lembaga"],
            },
            {
                title: "Data Proposal",
                href: "/proposal",
                roles: ["dindik", "superadmin"],
            },
            {
                title: "Verifikasi Proposal",
                href: "/verifikasi-proposal",
                roles: ["forum"],
            },
            {
                title: "Status Proposal",
                href: "/status-proposal",
                roles: ["lembaga", "dindik"],
            },
            {
                title: "Catatan Revisi",
                href: "/catatan-revisi",
                roles: ["lembaga"],
            },
        ],
    },

    {
        title: "Pengajuan Insentif",
        icon: UserStar,
        roles: ["lembaga", "forum", "dindik"],
        children: [
            {
                title: "Pengajuan",
                href: "/pengajuan-insentif",
                roles: ["lembaga"],
            },
            {
                title: "Usulan Penerima",
                href: "/usulan-penerima",
                roles: ["lembaga"],
            },
            {
                title: "Verifikasi Penerima",
                href: "/verifikasi-penerima",
                roles: ["forum"],
            },
            {
                title: "Finalisasi",
                href: "/finalisasi",
                roles: ["forum"],
            },
            {
                title: "Kuota Estimasi",
                href: "/kuota-estimasi",
                roles: ["lembaga"],
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
                roles: ["dindik", "forum"],
            },
            {
                title: "Lembaga Belum Diverifikasi",
                href: "/belum-verifikasi",
                roles: ["dindik"],
            },
            {
                title: "Progress Lembaga",
                href: "/progress-lembaga",
                roles: ["forum"],
            },
            {
                title: "Kuota Terpakai",
                href: "/kuota-terpakai",
                roles: ["forum"],
            },
            {
                title: "Audit Log",
                href: "/audit-log",
                roles: ["superadmin"],
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