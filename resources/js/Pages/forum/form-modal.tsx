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
};

export default function FormModal({
    open,
    onClose,
    forum,
}: Props) {

    const isEdit = !!forum;

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
        telepon: "",
        status: "aktif",
    });

    useEffect(() => {

        if (forum) {

            setData({
                _method: "",

                nama: forum.nama ?? "",
                telepon: forum.telepon ?? "",
                status: forum.status ?? "aktif",
            });

        } else {

            reset();
        }

    }, [forum, open]);

    const submit = (e: React.FormEvent) => {

        e.preventDefault();

        if (isEdit) {

            setData("_method", "put");

            post(route("forum.update", forum.id), {
                onSuccess: () => onClose(),
            });

            return;
        }

        post(route("forum.store"), {
            onSuccess: () => onClose(),
        });
    };

    return (

        <Modal
            show={open}
            onClose={onClose}
            maxWidth="md"
        >

            <div className="p-6">

                <div className="mb-6">

                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Forum" : "Tambah Forum"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Isi data forum
                    </p>

                </div>

                <form
                    onSubmit={submit}
                    className="space-y-5"
                >
                    <FormInput
                        label="Nama Forum"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        placeholder="Masukkan nama forum"
                        error={errors.nama}
                    />

                    <FormInput
                        label="Telepon"
                        value={data.telepon}
                        onChange={(e) => setData("telepon", e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        error={errors.telepon}
                    />

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

        </Modal>
    );
}