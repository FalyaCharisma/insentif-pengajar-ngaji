import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import FormInput from "@/Components/forms/FormInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import FormSelect2 from "@/Components/forms/FormSelect2";

type Props = {
    open: boolean;
    onClose: () => void;
    lembaga?: any;
    forum: any[];
};

export default function FormModal({ open, onClose, lembaga, forum }: Props) {
    const isEdit = !!lembaga;

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            _method: "",
            forum_id: "",
            nama: "",
            status: "aktif",
        });

    useEffect(() => {
        if (lembaga) {
            setData({
                _method: "",
                forum_id: lembaga.forum_id ? String(lembaga.forum_id) : "",
                nama: lembaga.nama || "",
                status: lembaga.user?.status || "aktif",
            });
        } else {
            clearErrors();

            reset();

            setData({
                _method: "",
                forum_id: "",
                nama: "",
                status: "aktif",
            });
        }
    }, [lembaga, open]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            setData("_method", "put");

            post(route("lembaga.update", lembaga.id), {
                forceFormData: true,

                onSuccess: () => {
                    clearErrors();
                    reset();
                    onClose();
                },
            });

            return;
        }

        post(route("lembaga.store"), {
            forceFormData: true,

            onSuccess: () => {
                clearErrors();
                reset();
                onClose();
            },
        });
    };

    if (!open) return null;

    return (
        <Modal show={open} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Lembaga" : "Tambah Lembaga"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {isEdit
                            ? "Perbarui data lembaga"
                            : "Isi form di bawah ini"}
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={submit} className="space-y-5">
                    {/* FORUM */}
                    <FormSelect2
                        label="Forum"
                        value={data.forum_id}
                        options={forum.map((item: any) => ({
                            value: String(item.id),
                            label: item.nama,
                        }))}
                        onChange={(value) => setData("forum_id", value)}
                        error={errors.forum_id}
                    />

                    {/* NAMA */}
                    <FormInput
                        label="Nama Lembaga"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        placeholder="Masukkan nama lembaga"
                        error={errors.nama}
                    />

                    {/* STATUS */}
                    {isEdit && (
                        <FormSelect2
                            label="Status"
                            value={data.status}
                            options={[
                                {
                                    value: "aktif",
                                    label: "Aktif",
                                },
                                {
                                    value: "nonaktif",
                                    label: "Nonaktif",
                                },
                            ]}
                            onChange={(value) => setData("status", value)}
                            error={errors.status}
                        />
                    )}

                    {/* FOOTER */}
                    <div className="flex items-center justify-end gap-3 pt-4">
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
