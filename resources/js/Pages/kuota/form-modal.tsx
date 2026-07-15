import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Modal";
import FormInput from "@/Components/forms/FormInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;
    onClose: () => void;
    kuota?: any;
};

export default function FormModal({ open, onClose, kuota }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm({
        kuota_final: "",

        keterangan: "",
    });

    useEffect(() => {
        if (!open) return;

        if (kuota) {
            setData({
                kuota_final: String(kuota.kuota_final),

                keterangan: kuota.keterangan ?? "",
            });
        } else {
            reset();
        }
    }, [kuota, open]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route("kuota.update", kuota.id), {
            preserveScroll: true,

            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal show={open} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Edit Kuota
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Ubah kuota final penerima.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <FormInput
                        label="Periode"
                        value={kuota?.periode?.tahun ?? ""}
                        disabled
                    />

                    <FormInput
                        label="Lembaga"
                        value={kuota?.lembaga?.nama ?? ""}
                        disabled
                    />

                    <FormInput
                        label="Estimasi Kuota"
                        value={kuota?.estimasi_kuota ?? ""}
                        disabled
                    />

                    <FormInput
                        type="number"
                        label="Kuota Final"
                        value={data.kuota_final}
                        onChange={(e) => setData("kuota_final", e.target.value)}
                        error={errors.kuota_final}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Keterangan
                        </label>

                        <textarea
                            rows={3}
                            value={data.keterangan}
                            onChange={(e) =>
                                setData("keterangan", e.target.value)
                            }
                            className="
                                w-full
                                rounded-xl
                                border-slate-300
                                focus:border-indigo-500
                                focus:ring-indigo-500
                            "
                        />

                        {errors.keterangan && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.keterangan}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <SecondaryButton type="button" onClick={onClose}>
                            Batal
                        </SecondaryButton>

                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? "Menyimpan..." : "Update"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
