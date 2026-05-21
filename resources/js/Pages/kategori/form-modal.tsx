import { useForm } from "@inertiajs/react";
import FormField from "./form-field";
import { useEffect } from "react";

type Props = {
    open: boolean;

    onClose: () => void;

    kategori?: any;
};

export default function FormModal({ open, onClose, kategori }: Props) {
    const isEdit = !!kategori;

    const { data, setData, post, put, processing, errors } = useForm({
        nama: kategori?.nama || "",
    });

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            put(route("kategori.update", kategori.id), {
                onSuccess: onClose,
            });

            return;
        }

        post(route("kategori.store"), {
            onSuccess: onClose,
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Kategori" : "Tambah Kategori"}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Isi form di bawah ini
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">
                    <FormField
                        label="Nama Kategori"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        placeholder="Masukkan nama kategori"
                        error={errors.nama}
                    />

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-5 py-2 text-sm"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-indigo-600 px-5 py-2 text-sm text-white"
                        >
                            {processing
                                ? "Menyimpan..."
                                : isEdit
                                  ? "Update"
                                  : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
