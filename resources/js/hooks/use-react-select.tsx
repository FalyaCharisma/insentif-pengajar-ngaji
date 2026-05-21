import { StylesConfig } from "react-select";
import { useState, useEffect } from "react";

const getCssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const useReactSelectTheme = () => {
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.getAttribute('data-bs-theme') === 'dark'
    );
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Force re-check theme pada initial mount untuk memastikan state yang benar
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        setIsDark(currentTheme === 'dark');

        // Set initialized setelah theme check pertama
        const timer = setTimeout(() => {
            setIsInitialized(true);
        }, 50); // Small delay to ensure DOM is fully ready

        // Observer untuk memantau perubahan theme
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
                    const newTheme = document.documentElement.getAttribute('data-bs-theme');
                    setIsDark(newTheme === 'dark');
                }
            });
        });

        // Mulai observasi perubahan pada data-bs-theme attribute
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-bs-theme']
        });

        // Cleanup observer saat component unmount
        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    // Recalculate CSS variables saat theme berubah
    const getThemeAwareCssVar = (name: string) => {
        if (!isInitialized) return ''; // Return empty until initialized
        return getCssVar(name);
    };

    const styles: StylesConfig = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isDisabled
                ? (isDark ? 'var(--bs-gray-800)' : 'var(--bs-gray-200)')
                : (isDark ? 'var(--bs-body-bg)' : 'var(--bs-body-bg)'),
            borderRadius: getThemeAwareCssVar('--bs-border-radius'),
            borderColor: state.isDisabled
                ? (isDark ? 'var(--bs-gray-700)' : 'var(--bs-gray-300)')
                : state.isFocused
                    ? (isDark ? getThemeAwareCssVar('--bs-gray-600') : getThemeAwareCssVar('--bs-gray-400'))
                    : (isDark ? getThemeAwareCssVar('--bs-gray-700') : getThemeAwareCssVar('--bs-gray-300')),
            boxShadow: 'none',
            cursor: state.isDisabled ? 'not-allowed' : 'default',
            opacity: state.isDisabled ? 0.7 : 1,
            '&:hover': {
                borderColor: state.isDisabled
                    ? (isDark ? 'var(--bs-gray-700)' : 'var(--bs-gray-300)')
                    : (isDark ? getThemeAwareCssVar('--bs-gray-600') : getThemeAwareCssVar('--bs-gray-400')),
            },
            padding: '0px',
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: '0.4rem .75rem',
        }),
        input: (provided: any) => ({
            ...provided,
            padding: '0px',
            margin: '0px',
            color: isDark ? 'var(--bs-light)' : 'var(--bs-dark)',
        }),
        placeholder: (base) => ({
            ...base,
            color: getThemeAwareCssVar('--bs-gray-500'),
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? 'var(--bs-primary)'
                : state.isFocused
                    ? isDark ? 'var(--bs-gray-800)' : 'var(--bs-gray-100)'
                    : isDark ? 'var(--bs-dark)' : 'var(--bs-white)',
            color: state.isSelected
                ? 'var(--bs-light)'
                : isDark ? 'var(--bs-gray-300)' : 'var(--bs-gray-900)',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected
                    ? 'var(--bs-primary)'
                    : isDark ? 'var(--bs-gray-800)' : 'var(--bs-gray-100)',
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: isDark ? 'var(--bs-dark)' : 'var(--bs-white)',
            border: `1px solid ${isDark ? 'var(--bs-gray-700)' : 'var(--bs-gray-300)'}`,
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            color: state.isDisabled
                ? (isDark ? 'var(--bs-gray-200)' : 'var(--bs-gray-800)')
                : (isDark ? 'var(--bs-light)' : 'var(--bs-dark)'),
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: isDark ? 'var(--bs-gray-700)' : 'var(--bs-gray-200)',
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: isDark ? 'var(--bs-light)' : 'var(--bs-dark)',
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: isDark ? 'var(--bs-light)' : 'var(--bs-dark)',
            '&:hover': {
                backgroundColor: 'var(--bs-danger)',
                color: 'var(--bs-light)',
            },
        }),
    };

    // Return styles hanya setelah initialization complete untuk menghindari flash
    return isInitialized ? styles : {};
};

export default useReactSelectTheme;