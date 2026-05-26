import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    tone?: 'success' | 'primary' | 'warning' | 'danger';
}

export default function StatCard({ label, value, icon: Icon, tone = 'success' }: StatCardProps) {
    return (
        <div className="card border-0 h-100 portal-stat-card">
            <div className="card-body p-4">
                <div className={`portal-stat-icon portal-stat-icon-${tone} mb-3`}>
                    <Icon size={24} />
                </div>
                <div className="fs-3 fw-black text-dark lh-1 mb-2">{value}</div>
                <div className="text-muted fw-semibold small">{label}</div>
            </div>
        </div>
    );
}