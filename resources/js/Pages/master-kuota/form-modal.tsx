import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Modal";
import FormInput from "@/Components/forms/FormInput";
import FormSelect2 from "@/Components/forms/FormSelect2";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { MasterKuota } from "@/types/master-kuota";

type Option = {
    value: number;
    label: string;
};

type Props = {
    open: boolean;
    onClose: () => void;

    masterKuota?: MasterKuota | null;

    periodeOptions: Option[];
    forumOptions: Option[];
    kategoriOptions: Option[];
};

export default function FormModal({
    open,
    onClose,
    masterKuota,
    periodeOptions,
    forumOptions,
    kategoriOptions,
}: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        periode_id: "",
        forum_id: "",
        kategori_id: "",
        jumlah_kuota: "",
        keterangan: "",
    });

    const isEdit = Boolean(masterKuota);

    useEffect(() => {
        if (!open) {
            return;
        }

        if (masterKuota) {
            setData({
                periode_id: String(masterKuota.periode_id),

                forum_id: String(masterKuota.forum_id),

                kategori_id: String(masterKuota.kategori_id),

                jumlah_kuota: String(masterKuota.jumlah_kuota),

                keterangan: masterKuota.keterangan ?? "",
            });
        } else {
            reset();
        }
    }, [open, masterKuota]);

   const submit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("EDIT MASTER KUOTA");
    console.log("ID:", masterKuota?.id);
    console.log("DATA:", data);
    console.log("JUMLAH KUOTA:", data.jumlah_kuota);

    const options = {
        preserveScroll: true,

        onSuccess: () => {
            onClose();
            reset();
        },
    };

    if (isEdit && masterKuota) {
        put(
            route(
                "master-kuota.update",
                masterKuota.id
            ),
            options
        );
    } else {
        post(
            route("master-kuota.store"),
            options
        );
    }
};

    return (
        <Modal show={open} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Master Kuota" : "Tambah Master Kuota"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Tentukan kuota berdasarkan periode, forum, dan kategori
                        lembaga.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <FormSelect2
                        label="Periode"
                        options={periodeOptions}
                        value={data.periode_id}
                        onChange={(value) => setData("periode_id", value)}
                        placeholder="Pilih periode"
                        error={errors.periode_id}
                    />

                    <FormSelect2
                        label="Forum"
                        options={forumOptions}
                        value={data.forum_id}
                        onChange={(value) => setData("forum_id", value)}
                        placeholder="Pilih forum"
                        error={errors.forum_id}
                    />

                    <FormSelect2
                        label="Kategori"
                        options={kategoriOptions}
                        value={data.kategori_id}
                        onChange={(value) => setData("kategori_id", value)}
                        placeholder="Pilih kategori"
                        error={errors.kategori_id}
                    />

                    <FormInput
                        type="number"
                        min="0"
                        label="Jumlah Kuota"
                        value={data.jumlah_kuota}
                        onChange={(e) =>
                            setData("jumlah_kuota", e.target.value)
                        }
                        error={errors.jumlah_kuota}
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
                            placeholder="Keterangan tambahan (opsional)"
                            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
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
