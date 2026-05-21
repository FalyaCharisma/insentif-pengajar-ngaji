import { ReactNode } from "react";

import AppHeaderLayout from "./app/app-header-layout";
import AppSidebarLayout from "./app/app-sidebar-layout";
import AppContentLayout from "./app/app-content-layout";
import AppFooterLayout from "./app/app-footer-layout";      

type Props = {
    children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
    return (
        <div className="min-h-screen flex bg-slate-100">
            {/* Sidebar */}
            <AppSidebarLayout />

            {/* Main */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <AppHeaderLayout />

                {/* Content */}
                <AppContentLayout>
                    {children}
                </AppContentLayout>

                {/* Footer */}
                <AppFooterLayout />
            </div>
        </div>
    );
}