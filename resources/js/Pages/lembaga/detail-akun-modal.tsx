import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import { Lembaga } from "@/types/lembaga";
import FormInput from "@/Components/forms/FormInput";
import { RotateCcw } from "lucide-react";
import Swal from "sweetalert2";

type Props = {
    open: boolean;
    onClose: () => void;
    lembaga: Lembaga | null;
};


export default function DetailAkunModal({
    open,
    onClose,
    lembaga,
}: Props) {

    if (!open || !lembaga) return null;

    const handleResetPassword = () => {
        Swal.fire({
            title: "Reset Password?",
            html: `
                Password akan direset menjadi
                <br><br>
                <strong>${lembaga?.kode}@kdr</strong>
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
                    route("lembaga.reset-password", lembaga?.id),
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
                    Informasi Akun
                </h2>

                <div className="mt-6 space-y-4">

                    <FormInput
                        label="Nama Lembaga"
                        value={lembaga.user?.name ?? "-"}
                        disabled
                    />

                    <FormInput
                        label="Email"
                        value={lembaga.user?.email ?? "-"}
                        disabled
                    />

                    <FormInput
                        label="Role"
                        value={lembaga.user?.role ?? "-"}
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