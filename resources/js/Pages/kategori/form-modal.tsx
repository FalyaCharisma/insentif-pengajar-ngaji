import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import FormInput from "@/Components/forms/FormInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;
    onClose: () => void;
    kategori?: any;
};

export default function FormModal({
    open,
    onClose,
    kategori,
}: Props) {

    const isEdit = !!kategori;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        _method: "",

        nama: "",
    });

    useEffect(() => {

        if (kategori) {

            setData({
                _method: "",

                nama: kategori.nama || "",
            });

        } else {

            reset();
        }

    }, [kategori, open]);

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {

            setData("_method", "put");

            post(route("kategori.update", kategori.id), {

                onSuccess: () => {
                    onClose();
                },
            });

            return;
        }

        post(route("kategori.store"), {

            onSuccess: () => {
                onClose();
            },
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-2xl bg-white p-6">

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit
                            ? "Edit Kategori"
                            : "Tambah Kategori"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Isi form di bawah ini
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="space-y-5"
                >

                    <FormInput
                        label="Nama Kategori"
                        value={data.nama}
                        onChange={(e) =>
                            setData(
                                "nama",
                                e.target.value
                            )
                        }
                        placeholder="Masukkan nama kategori"
                        error={errors.nama}
                    />

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4">

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
                                  ? "Update"
                                  : "Simpan"}
                        </PrimaryButton>

                    </div>
                </form>
            </div>
        </div>
    );
}