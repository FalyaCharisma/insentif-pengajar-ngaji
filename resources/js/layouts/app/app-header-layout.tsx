import { Bell, Search } from "lucide-react";

export default function AppHeaderLayout() {
    return (
        <header className="h-16 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            {/* Search */}
            <div className="relative w-[420px]">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-full bg-slate-100 border border-slate-200 rounded-2xl pl-12 pr-4 py-2.5.5 outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
                <button className="relative w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center">
                    <Bell size={22} className="text-slate-700" />

                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <h4 className="font-semibold text-slate-800">
                            Admin
                        </h4>

                        <p className="text-xs text-slate-500">
                            Super Administrator
                        </p>
                    </div>

                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}