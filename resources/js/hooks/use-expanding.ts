// Advanced hook untuk managing expanding state dengan lebih baik

import { useState, useCallback, useMemo } from "react";
import { ExpandedState } from "@tanstack/react-table";

interface UseExpandingProps {
    defaultExpanded?: Record<string, boolean>;
    multipleExpansion?: boolean;
}

interface UseExpandingReturn {
    expanded: ExpandedState;
    toggleExpanded: (rowId: string) => void;
    expandAll: () => void;
    collapseAll: () => void;
    isExpanded: (rowId: string) => boolean;
    expandedCount: number;
}

export function useExpanding({
    defaultExpanded = {},
    multipleExpansion = true
}: UseExpandingProps = {}): UseExpandingReturn {
    const [expanded, setExpanded] = useState<ExpandedState>(defaultExpanded);

    const toggleExpanded = useCallback((rowId: string) => {
        setExpanded(prev => {
            // Handle case when prev is boolean (true means all expanded)
            if (typeof prev === 'boolean') {
                if (!multipleExpansion) {
                    return { [rowId]: !prev };
                }
                // If prev is true (all expanded), create object with current row toggled
                return prev ? { [rowId]: false } : { [rowId]: true };
            }

            if (!multipleExpansion) {
                // Jika single expansion, tutup semua yang lain
                return { [rowId]: !prev[rowId] };
            }

            // Multiple expansion
            return {
                ...prev,
                [rowId]: !prev[rowId]
            };
        });
    }, [multipleExpansion]);

    const expandAll = useCallback(() => {
        setExpanded(true); // TanStack Table menggunakan true untuk expand all
    }, []);

    const collapseAll = useCallback(() => {
        setExpanded({});
    }, []);

    const isExpanded = useCallback((rowId: string) => {
        if (typeof expanded === 'boolean') {
            return expanded;
        }
        return !!expanded[rowId];
    }, [expanded]);

    const expandedCount = useMemo(() => {
        if (typeof expanded === 'boolean') return expanded ? Infinity : 0;
        return Object.values(expanded).filter(Boolean).length;
    }, [expanded]);

    return {
        expanded,
        toggleExpanded,
        expandAll,
        collapseAll,
        isExpanded,
        expandedCount
    };
}

// Contoh penggunaan di component:
/*
const { expanded, toggleExpanded, expandAll, collapseAll, expandedCount } = useExpanding({
    multipleExpansion: true
});

// Di table config:
const table = useReactTable({
    // ... other configs
    state: {
        expanded,
        // ... other states
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
});

// Di UI controls:
<div className="d-flex gap-2 mb-3">
    <Button variant="outline-primary" size="sm" onClick={expandAll}>
        Expand All
    </Button>
    <Button variant="outline-secondary" size="sm" onClick={collapseAll}>
        Collapse All
    </Button>
    {expandedCount > 0 && (
        <small className="text-muted align-self-center">
            {expandedCount} row(s) expanded
        </small>
    )}
</div>
*/