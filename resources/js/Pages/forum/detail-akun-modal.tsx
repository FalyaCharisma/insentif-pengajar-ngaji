import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import FormInput from "@/Components/forms/FormInput";

import { router } from "@inertiajs/react";
import { RotateCcw } from "lucide-react";
import Swal from "sweetalert2";

import { Forum } from "@/types/forum";

type Props = {
    open: boolean;
    onClose: () => void;
    forum: Forum | null;
};

export default function DetailAkunModal({
    open,
    onClose,
    forum,
}: Props) {

    if (!open || !forum) return null;

    const handleResetPassword = () => {

        Swal.fire({
            title: "Reset Password?",
            html: `
                Password akan direset menjadi
                <br><br>
                <strong>${forum.kode}@kdr</strong>
                <br><br>
                Pengguna akan diminta mengganti password saat login berikutnya.
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Reset",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
        }).then((result) => {

            if (result.isConfirmed) {

                router.put(
                    route("forum.reset-password", forum.id),
                    {},
                    {
                        onSuccess: () => {

                            Swal.fire({
                                icon: "success",
                                title: "Berhasil",
                                text: "Password berhasil direset.",
                                timer: 1800,
                                showConfirmButton: false,
                            });

                            onClose();
                        },
                    }
                );
            }
        });
    };

    return (
        <Modal
            show={open}
            onClose={onClose}
            maxWidth="md"
        >
            <div className="p-6">

                <h2 className="text-xl font-semibold">
                    Informasi Akun Forum
                </h2>

                <div className="mt-6 space-y-4">

                    <FormInput
                        label="Nama Forum"
                        value={forum.user?.name ?? "-"}
                        disabled
                    />

                    <FormInput
                        label="Email"
                        value={forum.user?.email ?? "-"}
                        disabled
                    />

                    <FormInput
                        label="Role"
                        value={forum.user?.role ?? "-"}
                        disabled
                    />

                </div>

                <div className="mt-8 flex justify-between">

                    <DangerButton
                        type="button"
                        onClick={handleResetPassword}
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Password
                    </DangerButton>

                    <SecondaryButton
                        type="button"
                        onClick={onClose}
                    >
                        Tutup
                    </SecondaryButton>

                </div>

            </div>
        </Modal>
    );
}