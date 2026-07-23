import { ReactNode } from "react";

type Props = {
    title: string;
    subtitle?: string;
    children: ReactNode;
};

export default function CardSection({
    title,
    subtitle,
    children,
}: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                    {title}
                </h2>

                {subtitle && (
                    <p className="mt-1 text-sm text-slate-500">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="p-6">
                {children}
            </div>

        </div>
    );
}