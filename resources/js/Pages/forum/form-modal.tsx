import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Modal";

import FormInput from "@/Components/forms/FormInput";
import FormSelect2 from "@/Components/forms/FormSelect2";

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;
    onClose: () => void;
    forum?: any;
    kategori: any[];
};

export default function FormModal({ open, onClose, forum, kategori }: Props) {
    const isEdit = !!forum;

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            _method: "",

            kategori_id: "",
            nama: "",
            telepon: "",
            status: "aktif",
        });

    useEffect(() => {
        if (forum) {
            setData({
                _method: "",

                kategori_id: forum.kategori_id ? String(forum.kategori_id) : "",

                nama: forum.nama ?? "",
                telepon: forum.telepon ?? "",
                status: forum.status ?? "aktif",
            });
        } else {
            clearErrors();

            reset();

            setData({
                _method: "",
                kategori_id: "",
                nama: "",
                telepon: "",
                status: "aktif",
            });
        }
    }, [forum, open]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            setData("_method", "put");

            post(route("forum.update", forum.id), {
                onSuccess: () => {
                    clearErrors();
                    reset();
                    onClose();
                },
            });

            return;
        }

        post(route("forum.store"), {
            onSuccess: () => {
                clearErrors();
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={open} onClose={onClose} maxWidth="md">
            <div className="p-6">
                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Forum" : "Tambah Forum"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {isEdit ? "Perbarui data forum" : "Isi data forum"}
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={submit} className="space-y-5">
                    {/* KATEGORI */}
                    <FormSelect2
                        label="Kategori"
                        value={data.kategori_id}
                        options={kategori.map((item: any) => ({
                            value: String(item.id),
                            label: item.nama,
                        }))}
                        onChange={(value) => setData("kategori_id", value)}
                        error={errors.kategori_id}
                    />

                    {/* NAMA */}
                    <FormInput
                        label="Nama Forum"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        placeholder="Masukkan nama forum"
                        error={errors.nama}
                    />

                    {/* TELEPON */}
                    <FormInput
                        label="Telepon"
                        type="number"
                        maxLength={12}
                        value={data.telepon}
                        onChange={(e) => {
                            const value = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 12);

                            setData("telepon", value);
                        }}
                        placeholder="08xxxxxxxxxx"
                        error={errors.telepon}
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

                    {/* BUTTON */}
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
