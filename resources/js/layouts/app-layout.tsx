import { ReactNode, useState } from "react";

import AppHeaderLayout from "./app/app-header-layout";
import AppSidebarLayout from "./app/app-sidebar-layout";
import AppContentLayout from "./app/app-content-layout";
import AppFooterLayout from "./app/app-footer-layout";

import { usePage, router } from "@inertiajs/react";
import ForceChangePasswordModal from "@/Components/ForceChangePasswordModal";

type Props = {
    children: ReactNode;
};

export default function AdminLayout({ children }: Props) {

    const [collapsed, setCollapsed] = useState(false);

    const auth = usePage<any>().props.auth;
    const currentUrl = usePage().url;

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
            
            {auth?.user?.force_change_password &&
                !currentUrl.startsWith("/profile") && (
                    <ForceChangePasswordModal />
            )}
        </div>
    );
}