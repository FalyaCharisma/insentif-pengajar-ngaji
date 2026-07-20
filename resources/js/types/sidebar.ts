import { Circle, LucideIcon } from "lucide-react";

export interface SidebarMenu {
    title: string;
    href?: string;
    icon?: LucideIcon;
    roles: string[];
    activeMatch?: string[];
    children?: SidebarMenu[];
}