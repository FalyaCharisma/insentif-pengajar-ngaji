import { useState, useCallback, useEffect, useMemo } from "react";
import { debounce } from "lodash";

interface UseSearchProps {
    initialValue?: string;
    onSearch: (value: string) => void;
    debounceMs?: number;
}

interface UseSearchReturn {
    searchValue: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSearchValue: (value: string) => void;
    clearSearch: () => void;
    isSearching: boolean;
}

export function useSearch({
    initialValue = '',
    onSearch,
    debounceMs = 500
}: UseSearchProps): UseSearchReturn {
    const [searchValue, setSearchValue] = useState(initialValue);
    const [isSearching, setIsSearching] = useState(false);

    // Sync with initial value when it changes
    useEffect(() => {
        setSearchValue(initialValue);
    }, [initialValue]);

    // Memoized debounced search function
    const debouncedSearch = useMemo(
        () => debounce((value: string) => {
            onSearch(value);
            setIsSearching(false);
        }, debounceMs),
        [onSearch, debounceMs]
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        // Set searching state
        setIsSearching(true);

        // Jika value kosong (user menghapus semua text), langsung trigger search
        // tanpa debounce untuk responsiveness yang lebih baik
        if (value.trim() === '') {
            debouncedSearch.cancel(); // Cancel any pending debounced call
            onSearch(''); // Immediate search with empty value
            setIsSearching(false);
        } else {
            debouncedSearch(value);
        }
    }, [debouncedSearch, onSearch]);

    const clearSearch = useCallback(() => {
        setSearchValue('');
        debouncedSearch.cancel(); // Cancel any pending debounced call
        onSearch(''); // Immediate search with empty value
        setIsSearching(false);
    }, [debouncedSearch, onSearch]);

    const handleSetSearchValue = useCallback((value: string) => {
        setSearchValue(value);
        // Trigger immediate search when setting value programmatically
        debouncedSearch.cancel();
        onSearch(value);
        setIsSearching(false);
    }, [debouncedSearch, onSearch]);

    return {
        searchValue,
        handleSearch,
        setSearchValue: handleSetSearchValue,
        clearSearch,
        isSearching,
    };
}