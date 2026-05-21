import { Transition } from '@headlessui/react';
import { Link, InertiaLinkProps } from '@inertiajs/react';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
}>({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
});

const Dropdown = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setOpen((prev) => !prev);

    // close on outside click (lebih proper daripada overlay full screen)
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div ref={ref} className="relative inline-block text-left">
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }: PropsWithChildren) => {
    const { toggleOpen } = useContext(DropDownContext);

    return (
        <button
            type="button"
            onClick={toggleOpen}
            className="inline-flex items-center"
        >
            {children}
        </button>
    );
};

const Content = ({
    align = 'right',
    width = '48',
    contentClasses = '',
    children,
}: PropsWithChildren<{
    align?: 'left' | 'right';
    width?: '48';
    contentClasses?: string;
}>) => {
    const { open, setOpen } = useContext(DropDownContext);

    const alignClass =
        align === 'left'
            ? 'left-0 origin-top-left'
            : 'right-0 origin-top-right';

    const widthClass = width === '48' ? 'w-48' : 'w-auto';

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95 translate-y-1"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95 translate-y-1"
        >
            <div
                className={`absolute mt-2 z-50 ${alignClass} ${widthClass}`}
            >
                <div
                    className={`rounded-xl bg-white shadow-lg ring-1 ring-black/5 py-1 overflow-hidden ${contentClasses}`}
                    onClick={() => setOpen(false)}
                >
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({
    className = '',
    children,
    ...props
}: InertiaLinkProps) => {
    return (
        <Link
            {...props}
            className={
                'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;