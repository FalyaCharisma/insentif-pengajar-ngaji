import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import FormField from "./form-field";
import Select from "react-select";

type Props = {
    open: boolean;
    onClose: () => void;
    forum?: any;
    kategori?: any[];
};

export default function FormModal({ open, onClose, forum, kategori = [] }: Props) {

    const isEdit = !!forum;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama: forum?.nama || "",
        kategori_id: forum?.kategori_id || "",
        nik: forum?.nik || "",
    });

    useEffect(() => {
        if (forum) {
            setData({
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
            put(route("forum.update", forum.id), {
                onSuccess: onClose,
            });
        } else {
            post(route("forum.store"), {
                onSuccess: onClose,
            });
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">

                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Forum" : "Tambah Forum"}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Isi data forum
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={submit} className="space-y-4">

                    {/* NAMA */}
                    <FormField
                        label="Nama Forum"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        placeholder="Masukkan nama forum"
                        error={errors.nama}
                    />

                    {/* KATEGORI */}
                    <div>
                        <label className="text-sm text-slate-600">
                            Kategori
                        </label>

                        <Select
                            options={kategori.map((k: any) => ({
                                value: k.id,
                                label: k.nama,
                            }))}

                            value={
                                kategori
                                    .map((k: any) => ({
                                        value: k.id,
                                        label: k.nama,
                                    }))
                                    .find((opt: any) => opt.value == data.kategori_id) || null
                            }

                            onChange={(opt: any) =>
                                setData("kategori_id", opt?.value)
                            }

                            placeholder="Cari kategori..."
                            isClearable
                        />

                        {errors.kategori_id && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.kategori_id}
                            </p>
                        )}
                    </div>

                    {/* NIK */}
                    <FormField
                        label="NIK"
                        value={data.nik}
                        onChange={(e) => setData("nik", e.target.value)}
                        placeholder="Masukkan NIK"
                        error={errors.nik}
                    />

                    {/* FOOTER */}
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