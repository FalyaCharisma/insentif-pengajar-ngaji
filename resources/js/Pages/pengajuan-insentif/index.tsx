import AdminLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <AdminLayout>
                <h1 className="text-xl font-bold">
                    Pengajuan Insentif
                </h1>
            </AdminLayout>
        </>
    );
}