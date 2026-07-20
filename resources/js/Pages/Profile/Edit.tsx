import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

import AdminLayout from "@/layouts/app-layout";

import PageHeader from "@/Components/PageHeader";

import { successAlert } from "@/lib/alert";
import PasswordCard from "./PasswordCard";

import { User, ShieldAlert } from "lucide-react";

type Props = {
    user: {
        id: number;
        name: string;
        username: string;
        email: string;
        role: string;
        force_change_password: boolean;
    };

    flash: {
        success?: string;
    };
};

export default function Edit({
    user,
    flash,
}: Props) {

    useEffect(() => {

        if (flash?.success) {

            successAlert(flash.success);

        }

    }, [flash]);

    const passwordForm = useForm({

        current_password: "",

        password: "",

        password_confirmation: "",

    });


    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        passwordForm.patch(route("profile.password"), {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    return (

        <>

            <Head title="Pengaturan Akun" />

            <AdminLayout>

                <div className="space-y-6">

                    <PageHeader
                        title="Pengaturan Akun"
                        subtitle="Kelola informasi akun dan keamanan"
                    />

                    {user.force_change_password && (

                        <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-5">

                            <div className="flex items-start gap-3">

                                <ShieldAlert
                                    className="mt-0.5 h-6 w-6 text-yellow-600"
                                />

                                <div>

                                    <h3 className="font-semibold text-yellow-800">

                                        Anda wajib mengganti password

                                    </h3>

                                    <p className="mt-1 text-sm text-yellow-700">

                                        Demi keamanan akun,
                                        silakan ubah password
                                        sebelum menggunakan aplikasi.

                                    </p>

                                </div>

                            </div>

                        </div>

                    )}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">

                        <div className="flex items-center gap-5">

                            <div
                                className="
                                    flex h-16 w-16 items-center justify-center
                                    rounded-full
                                    bg-gradient-to-br
                                    from-indigo-500
                                    to-cyan-500
                                "
                            >

                                <User
                                    className="h-8 w-8 text-white"
                                />

                            </div>

                            <div>

                                <h2 className="text-xl font-semibold text-slate-800">

                                    {user.name}

                                </h2>

                                <p className="text-sm text-slate-500">

                                    {user.email}

                                </p>

                                <span
                                    className="
                                        mt-2
                                        inline-flex
                                        rounded-full
                                        bg-blue-100
                                        px-3
                                        py-1
                                        text-xs
                                        font-medium
                                        text-blue-700
                                    "
                                >

                                    {user.role}

                                </span>

                            </div>

                        </div>
                    </div>

                    <PasswordCard />
                </div>
            </AdminLayout>
        </>
    );
}