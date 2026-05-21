import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function AppContentLayout({ children }: Props) {
    return (
        <main
            className="
                flex-1
                p-4 sm:p-5 lg:p-6
                overflow-x-hidden
            "
        >
            <div
                className="
                    w-full
                    max-w-full
                    mx-auto
                    bg-white
                    border border-slate-200
                    rounded-3xl
                    shadow-sm
                    p-4 sm:p-5 lg:p-6
                    min-h-[calc(100vh-160px)]
                "
            >
                {children}
            </div>
        </main>
    );
}