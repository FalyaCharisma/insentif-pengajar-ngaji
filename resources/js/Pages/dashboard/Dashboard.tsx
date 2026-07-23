import { useAuth } from "@/lib/auth";
import { DashboardData } from "@/types/dashboard";

import DindikDashboard from "./DindikDashboard";
import LembagaDashboard from "./LembagaDashboard";
import ForumDashboard from "./ForumDashboard";
import SuperadminDashboard from "./SuperadminDashboard";

export default function Dashboard(props: DashboardData) {
    const { hasRole } = useAuth();

    if (hasRole("superadmin")) {
        return <SuperadminDashboard />;
    }

    if (hasRole("dindik")) {
        return <DindikDashboard {...props} />;
    }

    if (hasRole("forum")) {
        return <ForumDashboard />;
    }

    return <LembagaDashboard />;
}