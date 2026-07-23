import { CalendarDays, LayoutDashboard } from "lucide-react";

type Props = {
    name: string;
    role: string;
};

export default function WelcomeCard({
    name,
    role,
}: Props) {

    const today = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-sm">

            <div className="relative z-10">

                <h1 className="mt-2 text-3xl font-bold">
                    {name}
                </h1>

                <p className="mt-1 text-sm opacity-90">
                    {role}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-sm backdrop-blur-sm">

                    <CalendarDays size={18} />

                    <span>{today}</span>

                </div>

            </div>

            {/* Background Decoration */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />

            <div className="absolute right-16 bottom-0 h-24 w-24 rounded-full bg-white/10" />

        </div>
    );
}