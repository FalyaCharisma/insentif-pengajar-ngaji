import { ReactNode, useState } from "react";

import AppHeaderLayout from "./app/app-header-layout";
import AppSidebarLayout from "./app/app-sidebar-layout";
import AppContentLayout from "./app/app-content-layout";
import AppFooterLayout from "./app/app-footer-layout";

type Props = {
    children: ReactNode;
};

export default function AdminLayout({ children }: Props) {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Sidebar */}
            <AppSidebarLayout
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Main */}
            <div
                className={`
                    min-h-screen flex flex-col transition-all duration-300
                    ${collapsed ? "lg:ml-20" : "lg:ml-72"}
                `}
            >
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