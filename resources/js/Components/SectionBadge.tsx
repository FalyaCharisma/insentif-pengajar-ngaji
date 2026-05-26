import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'primary' | 'info' | 'danger' | 'dark';

interface SectionBadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export default function SectionBadge({ children, variant = 'success', className = '' }: SectionBadgeProps) {
    return (
        <span className={`portal-section-badge portal-section-badge-${variant} ${className}`}>
            {children}
        </span>
    );
}