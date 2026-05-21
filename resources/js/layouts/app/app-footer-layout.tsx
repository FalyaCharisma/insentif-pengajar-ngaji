export default function AppFooterLayout() {
    return (
        <footer
            className="
                mt-auto
                bg-white/80 backdrop-blur-xl
                border-t border-slate-200
                px-4 lg:px-8 py-4
            "
        >
            <div
                className="
                    flex flex-col md:flex-row
                    items-center justify-between
                    gap-2
                    text-center md:text-left
                "
            >
                {/* Left */}
                <p className="text-xs text-slate-500">
                    © 2026 Insentif Pengajar. All rights reserved.
                </p>

                {/* Right */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Built with</span>

                    <span className="font-medium text-slate-700">
                        Laravel
                    </span>

                    <span>+</span>

                    <span className="font-medium text-slate-700">
                        React TSX
                    </span>
                </div>
            </div>
        </footer>
    );
}