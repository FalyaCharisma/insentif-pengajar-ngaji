import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { warningAlert } from "@/lib/alert";

import Modal from "@/Components/Modal";
import FormSelect2 from "@/Components/forms/FormSelect2";
import FormTextArea from "@/Components/forms/FormTextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;
    onClose: () => void;
    pengajar: any;
};

export default function VerifikasiModal({
    open,
    onClose,
    pengajar,
}: Props) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        status_verifikasi: "",
        catatan_verifikasi: "",
    });

    useEffect(() => {
        if (open) {
            setData({
                status_verifikasi:
                    pengajar.status_verifikasi ?? "pending",
                catatan_verifikasi:
                    pengajar.catatan_verifikasi ?? "",
            });
        } else {
            reset();
        }
    }, [open]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.status_verifikasi) {
            return warningAlert(
                "Status verifikasi wajib dipilih."
            );
        }

        put(
            route(
                "pengajar.verifikasi",
                pengajar.id
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    if (!open) return null;

    return (
        <Modal
            show={open}
            onClose={onClose}
            maxWidth="lg"
        >
            <form
                onSubmit={submit}
                className="space-y-5 p-6"
            >
                <div>

                    <h2 className="text-xl font-semibold text-slate-800">
                        Verifikasi Pengajar
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Tentukan hasil verifikasi data pengajar.
                    </p>

                </div>

                <div className="rounded-lg border bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">
                        Nama Pengajar
                    </p>

                    <p className="mt-1 font-semibold">
                        {pengajar.nama}
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                        Lembaga
                    </p>

                    <p className="mt-1 font-semibold">
                        {pengajar.lembaga?.nama ?? "-"}
                    </p>

                </div>

                <FormSelect2
                    label="Status Verifikasi"
                    value={data.status_verifikasi}
                    options={[
                        {
                            value: "disetujui",
                            label: "Disetujui",
                        },
                        {
                            value: "ditolak",
                            label: "Ditolak",
                        },
                    ]}
                    onChange={(value) => {
                        setData(
                            "status_verifikasi",
                            value
                        );

                        if (value === "disetujui") {
                            setData(
                                "catatan_verifikasi",
                                ""
                            );
                        }
                    }}
                    error={errors.status_verifikasi}
                    required
                />

                {data.status_verifikasi ===
                    "ditolak" && (
                    <FormTextArea
                        label="Catatan Verifikasi"
                        value={
                            data.catatan_verifikasi
                        }
                        onChange={(e) =>
                            setData(
                                "catatan_verifikasi",
                                e.target.value
                            )
                        }
                        rows={5}
                        placeholder="Masukkan alasan penolakan..."
                        error={
                            errors.catatan_verifikasi
                        }
                        required
                    />
                )}

                <div className="flex justify-end gap-3">

                    <SecondaryButton
                        type="button"
                        onClick={onClose}
                    >
                        Batal
                    </SecondaryButton>

                    <PrimaryButton
                        disabled={processing}
                    >
                        {processing
                            ? "Menyimpan..."
                            : "Simpan Verifikasi"}
                    </PrimaryButton>

                </div>

            </form>
        </Modal>
    );
}