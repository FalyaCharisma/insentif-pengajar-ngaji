import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useRef,
} from "react";

interface Props
    extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

export default forwardRef<HTMLInputElement, Props>(
    function TextInput(
        { className = "", isFocused = false, ...props },
        ref
    ) {
        const localRef = useRef<HTMLInputElement>(null);

        const inputRef =
            (ref as React.RefObject<HTMLInputElement>) ||
            localRef;

        useEffect(() => {
            if (isFocused) {
                inputRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props}
                ref={inputRef}
                className={`
                    w-full rounded-xl border
                    px-4 py-3 text-sm
                    outline-none transition

                    disabled:bg-slate-100
                    disabled:cursor-not-allowed

                    ${className}
                `}
            />
        );
    }
);