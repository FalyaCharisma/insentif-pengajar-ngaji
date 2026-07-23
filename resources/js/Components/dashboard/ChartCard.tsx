import { ReactNode } from "react";

type Props = {
    title: string;
    subtitle?: string;
    action?: ReactNode;
    children: ReactNode;
};

export default function ChartCard({
    title,
    subtitle,
    action,
    children,
}: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

                <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                        {title}
                    </h3>

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}
                </div>

                {action}
            </div>

            <div className="p-6">
                {children}
            </div>

        </div>
    );
}