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
    jenisDokumen?: any;
};

export default function FormModal({
    open,
    onClose,
    jenisDokumen,
}: Props) {

    const isEdit = !!jenisDokumen;

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        _method: "",
        nama: "",
        is_required: "1",
    });

    useEffect(() => {

        if (!open) {
            reset();
            return;
        }

        if (jenisDokumen) {

            setData({
                _method: "",
                nama: jenisDokumen.nama || "",
                is_required: jenisDokumen.is_required ? "1" : "0",
            });

        } else {

            reset();
        }

    }, [jenisDokumen, open]);

    const submit = (e: any) => {

        e.preventDefault();

        if (isEdit) {

            put(
                route("jenis-dokumen.update", jenisDokumen.id),
                {
                    onSuccess: () => {
                        reset();
                        onClose();
                    },
                },
            );

            return;
        }

        post(route("jenis-dokumen.store"), {

            onSuccess: () => {
                reset();
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
                            ? "Edit Jenis Dokumen"
                            : "Tambah Jenis Dokumen"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Isi form di bawah ini
                    </p>

                </div>

                {/* FORM */}
                <form
                    onSubmit={submit}
                    className="space-y-5"
                >

                    <FormInput
                        label="Nama Jenis Dokumen"
                        value={data.nama}
                        onChange={(e) =>
                            setData(
                                "nama",
                                e.target.value,
                            )
                        }
                        placeholder="Masukkan nama jenis dokumen"
                        error={errors.nama}
                    />

                    <FormSelect2
                        label="Status Dokumen"
                        value={data.is_required}
                        options={[
                            {
                                value: "1",
                                label: "Wajib",
                            },
                            {
                                value: "0",
                                label: "Opsional",
                            },
                        ]}
                        onChange={(value) => setData("is_required", value)}
                        error={errors.is_required}
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