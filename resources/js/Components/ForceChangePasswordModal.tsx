import { router } from "@inertiajs/react";
import { ShieldAlert } from "lucide-react";

export default function ForceChangePasswordModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <div className="flex flex-col items-center text-center">

                    <ShieldAlert
                        className="mb-4 h-16 w-16 text-yellow-500"
                    />

                    <h2 className="text-2xl font-bold">
                        Ganti Password
                    </h2>

                    <p className="mt-3 text-slate-600">
                        Demi keamanan akun, Anda wajib mengganti
                        password sementara sebelum dapat
                        menggunakan seluruh fitur aplikasi.
                    </p>

                    <button
                        className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
                        onClick={() =>
                            router.visit(route("profile.edit"))
                        }
                    >
                        Ganti Password Sekarang
                    </button>

                </div>

            </div>
        </div>
    );
}