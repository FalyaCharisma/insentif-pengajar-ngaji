// Debug Tool untuk memantau perubahan data dan state
// Anda bisa menggunakan ini untuk debugging data table

import { useEffect, useRef } from 'react';

export function useDebugTable<T>(data: T[], params: any, meta: any) {
    const prevData = useRef<T[]>([]);
    const prevParams = useRef<any>({});
    const prevMeta = useRef<any>({});

    useEffect(() => {
        // Check if data changed
        if (prevData.current && prevData.current !== data) {
            console.log('🔄 Data changed:', {
                prevLength: prevData.current.length,
                newLength: data.length,
                prevData: prevData.current.slice(0, 3),
                newData: data.slice(0, 3)
            });
        }

        // Check if params changed
        if (prevParams.current && JSON.stringify(prevParams.current) !== JSON.stringify(params)) {
            console.log('🔄 Params changed:', {
                prev: prevParams.current,
                new: params
            });
        }

        // Check if meta changed
        if (prevMeta.current && JSON.stringify(prevMeta.current) !== JSON.stringify(meta)) {
            console.log('🔄 Meta changed:', {
                prev: prevMeta.current,
                new: meta
            });
        }

        // Update refs
        prevData.current = data;
        prevParams.current = params;
        prevMeta.current = meta;
    });

    return {
        dataLength: data.length,
        currentParams: params,
        currentMeta: meta
    };
}