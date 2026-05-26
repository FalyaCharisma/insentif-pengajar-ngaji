import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

import {
    LayoutDashboard,
    FolderKanban,
    Users,
    FileText,
    Settings,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Building2,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

type Props = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
};

export default function AppSidebarLayout({ collapsed, setCollapsed }: Props) {
    const { hasRole } = useAuth();
    const { url } = usePage();

    const isMasterActive =
        url.startsWith("/kategori") ||
        url.startsWith("/lembaga") ||
        url.startsWith("/forum") ||
        url.startsWith("/pengurus");

    const [mobileOpen, setMobileOpen] = useState(false);
    const [masterOpen, setMasterOpen] = useState(isMasterActive);

    useEffect(() => {
        if (isMasterActive) {
            setMasterOpen(true);
        }
    }, [url]);

    const isActive = (path: string) => {
        return url.startsWith(path);
    };

    const menuClass = (path: string) =>
        `
        flex items-center
        ${collapsed ? "justify-center px-2" : "gap-3 px-4"}
        py-3 rounded-2xl transition-all duration-200
        ${
            isActive(path)
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800"
        }
    `;

    return (
        <>
            {/* MOBILE BUTTON */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-xl"
            >
                <Menu size={22} />
            </button>

            {/* OVERLAY */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen
                    bg-slate-950 border-r border-slate-800
                    flex flex-col
                    transition-all duration-300
                    ${collapsed ? "w-20" : "w-72"}
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* HEADER */}
                <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
                    {!collapsed && (
                        <div>
                            <h1 className="font-bold text-white text-lg">
                                Insentif Pengajar
                            </h1>

                            <p className="text-xs text-slate-400">
                                Admin Dashboard
                            </p>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {/* Desktop Collapse */}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hidden lg:flex text-slate-400 hover:text-white"
                        >
                            {collapsed ? (
                                <ChevronRight size={20} />
                            ) : (
                                <ChevronLeft size={20} />
                            )}
                        </button>

                        {/* Mobile Close */}
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="lg:hidden text-slate-400"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* MENU */}
                <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-2">
                    {/* Dashboard */}
                    <Link href="/dashboard" className={menuClass("/dashboard")}>
                        <LayoutDashboard size={20} />

                        {!collapsed && (
                            <span className="font-medium">Dashboard</span>
                        )}
                    </Link>

                    {hasRole("superadmin") && (
                        <>
                            {/* MASTER DATA */}
                            <div>
                                <button
                                    onClick={() => setMasterOpen(!masterOpen)}
                                    className={`
                                        w-full flex items-center
                                        ${collapsed ? "justify-center px-2" : "justify-between px-4"}
                                        py-3 rounded-2xl text-slate-300 hover:bg-slate-800 transition
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <FolderKanban size={20} />

                                        {!collapsed && (
                                            <span className="font-medium">
                                                Master Data
                                            </span>
                                        )}
                                    </div>

                                    {!collapsed && (
                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform ${
                                                masterOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    )}
                                </button>

                                {/* SUBMENU */}
                                {!collapsed && masterOpen && (
                                    <div className="ml-4 mt-2 space-y-2 border-l border-slate-800 pl-3">
                                        <Link
                                            href="/kategori"
                                            className={menuClass("/kategori")}
                                        >
                                            <FolderKanban size={18} />

                                            <span>Kategori</span>
                                        </Link>

                                        <Link
                                            href="/lembaga"
                                            className={menuClass("/lembaga")}
                                        >
                                            <Building2 size={18} />

                                            <span>Lembaga</span>
                                        </Link>

                                        <Link
                                            href="/forum"
                                            className={menuClass("/forum")}
                                        >
                                            <FileText size={18} />

                                            <span>Forum</span>
                                        </Link>
                                        <Link
                                            href="/pengurus"
                                            className={menuClass("/pengurus")}
                                        >
                                            <Users size={18} />
                                            <span>Pengurus</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <Link
                        href="/pengajuan-proposal"
                        className={menuClass("/pengajuan-proposal")}
                    >
                        <FileText size={20} />

                        {!collapsed && (
                            <span className="font-medium">
                                Pengajuan Proposal
                            </span>
                        )}
                    </Link>
                    {/* SETTINGS */}
                    <Link href="/settings" className={menuClass("/settings")}>
                        <Settings size={20} />

                        {!collapsed && (
                            <span className="font-medium">Settings</span>
                        )}
                    </Link>
                </nav>
            </aside>
        </>
    );
}
