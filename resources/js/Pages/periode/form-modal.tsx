import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Modal";
import FormInput from "@/Components/forms/FormInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;
    onClose: () => void;
    periode?: any;
};

export default function FormModal({ open, onClose, periode }: Props) {
    const isEdit = !!periode;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: "",
        tahun: "",
        mulai_upload: "",
        selesai_upload: "",
        status: false,
    });

    const clearForm = () => {
        reset();

        setData({
            _method: "",
            tahun: "",
            mulai_upload: "",
            selesai_upload: "",
            status: false,
        });
    };

    useEffect(() => {
        if (!open) return;

        if (periode) {
            setData({
                _method: "",
                tahun: String(periode.tahun ?? ""),
                mulai_upload: periode.mulai_upload
                    ? periode.mulai_upload.substring(0, 16)
                    : "",
                selesai_upload: periode.selesai_upload
                    ? periode.selesai_upload.substring(0, 16)
                    : "",
                status: Boolean(periode.status),
            });
        } else {
            clearForm();
        }
    }, [open, periode]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(route("periode.update", periode.id), {
                preserveScroll: true,

                onSuccess: () => {
                    clearForm();
                    onClose();
                },
            });

            return;
        }

        post(route("periode.store"), {
            preserveScroll: true,

            onSuccess: () => {
                clearForm();
                onClose();
            },
        });
    };

    return (
        <Modal show={open} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Periode" : "Tambah Periode"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Isi data periode upload proposal.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <FormInput
                        label="Tahun Proposal"
                        type="number"
                        value={data.tahun}
                        onChange={(e) => setData("tahun", e.target.value)}
                        placeholder="Contoh: 2025"
                        error={errors.tahun}
                    />

                    <FormInput
                        label="Mulai Upload"
                        type="datetime-local"
                        value={data.mulai_upload}
                        onChange={(e) =>
                            setData("mulai_upload", e.target.value)
                        }
                        error={errors.mulai_upload}
                    />

                    <FormInput
                        label="Selesai Upload"
                        type="datetime-local"
                        value={data.selesai_upload}
                        onChange={(e) =>
                            setData("selesai_upload", e.target.value)
                        }
                        error={errors.selesai_upload}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Status
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.checked)
                                }
                            />

                            <span className="text-sm">
                                Aktifkan periode ini
                            </span>
                        </label>

                        {errors.status && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <SecondaryButton
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Batal
                        </SecondaryButton>

                        <PrimaryButton type="submit" disabled={processing}>
                            {processing
                                ? "Menyimpan..."
                                : isEdit
                                  ? "Update"
                                  : "Simpan"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
