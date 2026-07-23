import { Link } from "@inertiajs/react";
import { LucideIcon } from "lucide-react";

type Action = {
    title: string;
    description?: string;
    href: string;
    icon: LucideIcon;
};

type Props = {
    title: string;
    actions: Action[];
};

export default function QuickActionCard({
    title,
    actions,
}: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-800">
                    {title}
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">

                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Icon size={22} />
                            </div>

                            <div>
                                <p className="font-medium text-slate-800">
                                    {action.title}
                                </p>

                                {action.description && (
                                    <p className="mt-1 text-sm text-slate-500">
                                        {action.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    );
                })}

            </div>

        </div>
    );
}