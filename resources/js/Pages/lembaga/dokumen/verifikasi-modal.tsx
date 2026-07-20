import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Modal";
import FormInput from "@/Components/forms/FormInput";
import FormSelect2 from "@/Components/forms/FormSelect2";
import FormTextArea from "@/Components/forms/FormTextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;
    onClose: () => void;
    item: any;
};

export default function VerifikasiModal({
    open,
    onClose,
    item,
}: Props) {

    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        status_verifikasi: "pending",
        catatan_verifikasi: "",
    });

    useEffect(() => {
        if (!open || !item) {
            reset();
            return;
        }

        setData({
            status_verifikasi: item.status_verifikasi ?? "pending",
            catatan_verifikasi: item.catatan_verifikasi ?? "",
        });
    }, [open, item]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route("dokumen.verifikasi", item.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!open || !item) return null;

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
                        Verifikasi Dokumen
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Tentukan hasil verifikasi dokumen lembaga.
                    </p>

                </div>

                <FormInput
                    label="Jenis Dokumen"
                    value={item.jenis_dokumen?.nama}
                    disabled
                />

                <FormInput
                    label="Nama File"
                    value={item.nama_file}
                    disabled
                />

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
                        setData("status_verifikasi", value);

                        if (value === "disetujui") {
                            setData("catatan_verifikasi", "");
                        }
                    }}
                    error={errors.status_verifikasi}
                    required
                />

                {data.status_verifikasi === "ditolak" && (
                    <FormTextArea
                        label="Catatan Verifikasi"
                        value={data.catatan_verifikasi}
                        onChange={(e) =>
                            setData("catatan_verifikasi", e.target.value)
                        }
                        rows={5}
                        placeholder="Masukkan alasan penolakan..."
                        error={errors.catatan_verifikasi}
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