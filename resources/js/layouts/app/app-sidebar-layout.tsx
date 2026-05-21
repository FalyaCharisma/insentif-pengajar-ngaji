import { Link } from "@inertiajs/react";

import {
    LayoutDashboard,
    FolderKanban,
    Users,
    FileText,
    Settings,
} from "lucide-react";

export default function AppSidebarLayout() {
    return (
        <aside className="w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col shadow-2xl">
            {/* Logo */}
            <div className="h-16 flex items-center px-8 border-b border-slate-800">
                <div>
                    <h1 className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        Insentif Pengajar Ngaji
                    </h1>

                    <p className="text-xs text-slate-400 mt-1">
                        Admin Dashboard
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-5 py-6 space-y-2">
                <p className="text-xs uppercase tracking-widest text-slate-500 px-4 mb-3">
                    Main Menu
                </p>

                <Link
                    href="/dashboard"
                    className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-500/20"
                >
                    <LayoutDashboard size={20} />
                    <span className="font-medium">
                        Dashboard
                    </span>
                </Link>

                <Link
                    href="/kategori"
                    className="flex items-center gap-4 px-4 py-2.5 rounded-2xl hover:bg-slate-800/80 transition-all duration-200"
                >
                    <FolderKanban size={20} />
                    <span className="font-medium">
                        Kategori
                    </span>
                </Link>
            </nav>
        </aside>
    );
}