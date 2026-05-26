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
    kategori?: any[];
};

export default function FormModal({
    open,
    onClose,
    forum,
    kategori = [],
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
        kategori_id: "",
        nik: "",
    });

    useEffect(() => {

        if (forum) {

            setData({
                _method: "",

                nama: forum.nama ?? "",
                kategori_id: forum.kategori_id ?? "",
                nik: forum.nik ?? "",
            });

        } else {

            reset();
        }

    }, [forum, open]);

    const submit = (e: any) => {

        e.preventDefault();

        if (isEdit) {

            setData("_method", "put");

            post(
                route("forum.update", forum.id),
                {
                    onSuccess: () => {
                        onClose();
                    },
                },
            );

            return;
        }

        post(route("forum.store"), {

            onSuccess: () => {
                onClose();
            },
        });
    };

    return (

        <Modal
            show={open}
            onClose={onClose}
            maxWidth="md"
        >

            <div className="p-6">

                {/* HEADER */}
                <div className="mb-6">

                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit
                            ? "Edit Forum"
                            : "Tambah Forum"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Isi data forum
                    </p>

                </div>

                {/* FORM */}
                <form
                    onSubmit={submit}
                    className="space-y-5"
                >

                    {/* NAMA */}
                    <FormInput
                        label="Nama Forum"
                        value={data.nama}
                        onChange={(e) =>
                            setData(
                                "nama",
                                e.target.value,
                            )
                        }
                        placeholder="Masukkan nama forum"
                        error={errors.nama}
                    />

                    {/* KATEGORI */}
                    <FormSelect2
                        label="Kategori"
                        value={data.kategori_id}
                        options={(kategori || []).map((k: any) => ({
                            label: k.nama,
                            value: k.id,
                        }))}
                        onChange={(value) =>
                            setData("kategori_id", value)
                        }
                        error={errors.kategori_id}
                    />

                    {/* NIK */}
                    <FormInput
                        label="NIK"
                        value={data.nik}
                        onChange={(e) =>
                            setData(
                                "nik",
                                e.target.value,
                            )
                        }
                        placeholder="Masukkan NIK"
                        error={errors.nik}
                    />

                    {/* FOOTER */}
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