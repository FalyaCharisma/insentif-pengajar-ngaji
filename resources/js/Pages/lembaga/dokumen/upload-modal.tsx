import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Modal";
import FormSelect2 from "@/Components/forms/FormSelect2";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/ui/InputLabel";
import InputError from "@/Components/ui/InputError";

type Props = {
    open: boolean;
    onClose: () => void;
    lembaga: any;
    jenisDokumen: any[];
    item?: any;
};

export default function UploadModal({
    open,
    onClose,
    lembaga,
    jenisDokumen,
    item,
}: Props) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
         _method: "",
        jenis_dokumen_id: "",
        file: null as File | null,
    });

    useEffect(() => {
        if (!open) return;

        if (item) {
            setData({
                jenis_dokumen_id: item.jenis_dokumen_id,
                file: null,
            });
        } else {
            reset();
        }
    }, [open, item]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (item) {
            setData("_method", "PUT");

            post(route("dokumen.update", item.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route("dokumen.store", lembaga.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    const isEdit = !!item;

    if (!open) return null;

    return (
        <Modal
            show={open}
            onClose={onClose}
            maxWidth="lg"
        >
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Dokumen" : "Upload Dokumen"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {isEdit
                            ? "Ganti file dokumen yang sudah diunggah."
                            : "Pilih jenis dokumen dan file yang akan diunggah."}
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="space-y-5"
                >
                    {!isEdit ? (
                        <FormSelect2
                            label="Jenis Dokumen"
                            value={data.jenis_dokumen_id}
                            options={jenisDokumen.map((item) => ({
                                value: item.id,
                                label: item.nama,
                            }))}
                            onChange={(value) =>
                                setData("jenis_dokumen_id", value)
                            }
                            error={errors.jenis_dokumen_id}
                            required
                        />
                    ) : (
                        <div>
                            <InputLabel label="Jenis Dokumen" />
                            <div className="mt-2 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700">
                                {item.jenis_dokumen?.nama}
                            </div>
                        </div>
                    )}

                    <div>
                        <InputLabel
                            label="File Dokumen"
                            required
                        />

                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                                       file:mr-4 file:rounded-md file:border-0
                                       file:bg-slate-100 file:px-4 file:py-2
                                       file:text-sm file:font-medium
                                       hover:file:bg-slate-200"
                            onChange={(e) =>
                                setData(
                                    "file",
                                    e.target.files?.[0] ?? null
                                )
                            }
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            Format: PDF, JPG, JPEG, PNG (maks. 2 MB)
                        </p>

                        <InputError message={errors.file} />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <SecondaryButton
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Batal
                        </SecondaryButton>

                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                        >
                            {processing
                                ? "Menyimpan..."
                                : isEdit
                                    ? "Simpan Perubahan"
                                    : "Upload Dokumen"}
                        </PrimaryButton>
                    </div>

                    {jenisDokumen.length === 0 && (
                        <p className="text-center text-sm text-slate-500">
                            Semua jenis dokumen sudah diunggah.
                        </p>
                    )}
                </form>
            </div>
        </Modal>
    );
}