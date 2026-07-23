import { LucideIcon, Inbox } from "lucide-react";

type Props = {
    title: string;
    description?: string;
    icon?: LucideIcon;
};

export default function EmptyState({
    title,
    description,
    icon: Icon = Inbox,
}: Props) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon
                    size={30}
                    className="text-slate-400"
                />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-700">
                {title}
            </h3>

            {description && (
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                    {description}
                </p>
            )}

        </div>
    );
}