import { LucideIcon } from "lucide-react";

type Props = {
    title: string;
    value: string | number;
    icon: LucideIcon;

    description?: string;

    iconBg?: string;
    iconColor?: string;
};

export default function StatCard({
    title,
    value,
    icon: Icon,
    description,
    iconBg = "bg-indigo-100",
    iconColor = "text-indigo-600",
}: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-800">
                        {value}
                    </h2>

                    {description && (
                        <p className="mt-2 text-sm text-slate-500">
                            {description}
                        </p>
                    )}

                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
                >
                    <Icon
                        size={24}
                        className={iconColor}
                    />
                </div>

            </div>

        </div>
    );
}