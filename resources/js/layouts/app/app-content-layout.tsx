import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function AppContentLayout({ children }: Props) {
    return (
        <main className="flex-1 p-6">
            {children}
        </main>
    );
}