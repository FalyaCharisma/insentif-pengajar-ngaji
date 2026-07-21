import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useAuth } from "@/lib/auth";
import { sidebarMenus } from "@/data/sidebarMenus";
import type { SidebarMenu } from "@/types/sidebar";

import {
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";

type Props = {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
};

export default function AppSidebarLayout({ collapsed, setCollapsed }: Props) {
    const { hasRole } = useAuth();
    const { url, props } = usePage<any>();

    const lembagaId = props.auth?.user?.lembaga_id;

    const menus = sidebarMenus(lembagaId);

    const [mobileOpen, setMobileOpen] = useState(false);

    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const isParentActive = (menu: SidebarMenu) => {
        return menu.children?.some(child => isActive(child));
    };

    const toggleMenu = (title: string) => {
        setOpenMenus((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        );
    };

    const isActive = (menu: SidebarMenu) => {
        if (!menu.href) return false;

        const matches = menu.activeMatch ?? [menu.href];

        return matches.some(match => url.startsWith(match));
    };

    const menuClass = (menu: SidebarMenu) =>
        `
        flex items-center
        ${collapsed ? "justify-center px-2" : "gap-3 px-4"}
        py-3 rounded-2xl transition-all duration-200
        ${
            isActive(menu)
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800"
        }
    `;

    useEffect(() => {
        const activeParents = menus
            .filter(menu =>
                menu.children?.some(child => isActive(child))
            )
            .map(menu => menu.title);

        setOpenMenus(prev => {
            const merged = [...new Set([...prev, ...activeParents])];
            return merged;
        });
    }, [url]);

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
                    {menus
                        .filter((menu) => menu.roles.some((role) => hasRole(role)))
                        .map((menu) => {
                            const Icon = menu.icon;
                            const isOpen = openMenus.includes(menu.title);

                            // Parent Menu
                            if (menu.children) {
                                return (
                                    <div key={menu.title}>
                                        <button
                                            onClick={() => toggleMenu(menu.title)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-slate-300 hover:bg-slate-800 ${
                                                isParentActive(menu) ? "bg-slate-800" : ""
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {Icon && <Icon size={20} />}
                                                {!collapsed && <span>{menu.title}</span>}
                                            </div>

                                            {!collapsed && (
                                                <ChevronRight
                                                    size={18}
                                                    className={`transition ${
                                                        isOpen ? "rotate-90" : ""
                                                    }`}
                                                />
                                            )}
                                        </button>

                                        {!collapsed && isOpen && (
                                            <div className="ml-5 mt-2 space-y-1 border-l border-slate-800 pl-3">
                                                {menu.children
                                                    .filter((child) =>
                                                        child.roles.some((role) =>
                                                            hasRole(role)
                                                        )
                                                    )
                                                    .map((child) => (
                                                        <Link
                                                            key={child.title}
                                                            href={child.href!}
                                                            className={menuClass(child)}
                                                        >
                                                            {child.icon && (
                                                                <child.icon size={18} />
                                                            )}
                                                            <span>{child.title}</span>
                                                        </Link>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            // Menu Biasa
                            return (
                                <Link
                                    key={menu.title}
                                    href={menu.href!}
                                    className={menuClass(menu)}
                                >
                                    {Icon && <Icon size={20} />}
                                    {!collapsed && <span>{menu.title}</span>}
                                </Link>
                            );
                        })}
                </nav>
            </aside>
        </>
    );
}