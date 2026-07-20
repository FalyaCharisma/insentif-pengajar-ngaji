import { useState } from "react";
import { createPortal } from "react-dom";
import { usePage, Link } from "@inertiajs/react";
import { Bell, ChevronDown, LogOut, Key, User } from "lucide-react";

export default function AppHeaderLayout() {
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const { auth } = usePage().props as any;

    const user = auth?.user;

    return (
        <header
            className="
                sticky top-0 z-30
                h-16
                bg-white/80 backdrop-blur-xl
                border-b border-slate-200
                flex items-center justify-end
                px-4 lg:px-8
            "
        >
            <div className="flex items-center gap-3 lg:gap-5">

                {/* NOTIFICATION BUTTON */}
                <button
                    onClick={() => {
                        setNotifOpen(true);
                        setProfileOpen(false);
                    }}
                    className="
                        relative w-11 h-11
                        rounded-2xl bg-slate-100
                        hover:bg-slate-200 transition
                        flex items-center justify-center
                    "
                >
                    <Bell size={20} className="text-slate-700" />

                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* NOTIFICATION DRAWER (PORTAL) */}
                {notifOpen &&
                    createPortal(
                        <div className="fixed inset-0 z-[9999]">
                            <div
                                className="absolute inset-0 bg-black/40"
                                onClick={() => setNotifOpen(false)}
                            />

                            <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl flex flex-col">
                                {/* header */}
                                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-semibold text-slate-800">
                                        Notifications
                                    </h3>

                                    <button
                                        onClick={() => setNotifOpen(false)}
                                        className="text-slate-500 hover:text-slate-700"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* content */}
                                <div className="flex-1 overflow-y-auto">
                                    <div className="px-5 py-4 border-b hover:bg-slate-50">
                                        <p className="text-sm font-medium text-slate-700">
                                            Data pengajar berhasil ditambahkan
                                        </p>
                                        <span className="text-xs text-slate-500">
                                            2 menit yang lalu
                                        </span>
                                    </div>

                                    <div className="px-5 py-4 border-b hover:bg-slate-50">
                                        <p className="text-sm font-medium text-slate-700">
                                            Laporan insentif dibuat
                                        </p>
                                        <span className="text-xs text-slate-500">
                                            1 jam yang lalu
                                        </span>
                                    </div>

                                    <div className="px-5 py-4 hover:bg-slate-50">
                                        <p className="text-sm font-medium text-slate-700">
                                            Sistem diperbarui
                                        </p>
                                        <span className="text-xs text-slate-500">
                                            Kemarin
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>,
                        document.body
                    )}

                {/* PROFILE */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setProfileOpen(!profileOpen);
                            setNotifOpen(false);
                        }}
                        className="
                            flex items-center gap-3
                            pl-3 pr-2 py-2
                            rounded-2xl
                            hover:bg-slate-100
                            transition
                        "
                    >
                        <div className="hidden sm:block text-right leading-tight">
                            <h4 className="font-semibold text-slate-800 text-sm">
                                {user?.name ?? "Guest"}
                            </h4>
                            <p className="text-xs text-slate-500">
                                {user?.role ?? "No Role"}
                            </p>
                        </div>

                        <div
                            className="
                                w-11 h-11
                                rounded-2xl
                                bg-gradient-to-br from-indigo-500 to-cyan-500
                                flex items-center justify-center
                                shadow-lg shadow-indigo-500/20
                            "
                        >
                            <User className="h-5 w-5 text-white" />
                        </div>

                        <ChevronDown
                            size={18}
                            className={`text-slate-500 transition-transform ${
                                profileOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* DROPDOWN */}
                    {profileOpen && (
                        <div
                            className="
                                absolute right-0 mt-3 w-64
                                bg-white border border-slate-200
                                rounded-2xl shadow-xl
                                overflow-hidden
                            "
                        >
                            <div className="px-5 py-4 border-b border-slate-100">
                                <h3 className="font-semibold text-slate-800">
                                    {user?.name ?? "Guest"}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {user?.email ?? "Email"}
                                </p>
                            </div>

                            <div className="p-2">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700"
                                >
                                    <Key size={18} />
                                    <span className="text-sm">Ubah Password</span>
                                </Link>

                                {/* <Link
                                    href="/settings"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700"
                                >
                                    <Settings size={18} />
                                    <span className="text-sm">Pengaturan</span>
                                </Link> */}

                                <div className="border-t border-slate-100 my-2"></div>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600"
                                >
                                    <LogOut size={18} />
                                    <span className="text-sm font-medium">
                                        Logout
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}