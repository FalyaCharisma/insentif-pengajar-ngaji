import { useEffect } from 'react';

/**
 * Hook untuk mengontrol sidebar size secara global
 */
export const useSidebarControl = () => {
    const toggleSidebarSize = () => {
        if ((window as any).__toggleSidebarSize) {
            (window as any).__toggleSidebarSize();
        }
    };

    const autoToggleOnMount = () => {
        useEffect(() => {
            // Delay sedikit untuk memastikan sidebar sudah ter-render
            const timer = setTimeout(() => {
                toggleSidebarSize();
            }, 100);

            return () => clearTimeout(timer);
        }, []); // Empty dependency array berarti hanya run sekali saat mount
    };

    return {
        toggleSidebarSize,
        autoToggleOnMount,
    };
};