import { ReactNode } from "react";

type Activity = {
    id: number | string;
    title: string;
    description?: string;
    time?: string;
    icon?: ReactNode;
};

type Props = {
    title: string;
    activities: Activity[];
};

export default function ActivityCard({
    title,
    activities,
}: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-800">
                    {title}
                </h3>
            </div>

            <div className="divide-y divide-slate-100">

                {activities.length === 0 && (
                    <div className="px-6 py-8 text-center text-sm text-slate-500">
                        Belum ada aktivitas.
                    </div>
                )}

                {activities.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition"
                    >
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            {item.icon}
                        </div>

                        <div className="flex-1">

                            <p className="font-medium text-slate-800">
                                {item.title}
                            </p>

                            {item.description && (
                                <p className="mt-1 text-sm text-slate-500">
                                    {item.description}
                                </p>
                            )}

                            {item.time && (
                                <p className="mt-2 text-xs text-slate-400">
                                    {item.time}
                                </p>
                            )}

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}