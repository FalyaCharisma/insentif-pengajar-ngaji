import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string;
    icon: string;
    tone: string;
}

export default function StatCard({ label, value, icon, tone }: StatCardProps) {
    const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as React.ComponentType<LucideProps>;
    return (
        <>

            <div className="card border-0 h-100 portal-stat-card">
                <div className="card-body p-4">
                    <div className={`portal-stat-icon portal-stat-icon-${tone} mb-3`}>
                        {IconComponent && <IconComponent size={24} />}
                    </div>
                    <div className="fs-3 fw-black text-dark lh-1 mb-2">{value}</div>
                    <div className="text-muted fw-semibold small">{label}</div>
                </div>
            </div>
        </>
    );
}