import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";

import Modal from "@/Components/Modal";
import FormInput from "@/Components/forms/FormInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import FormSelect2 from "@/Components/forms/FormSelect2";

type Props = {
    open: boolean;
    onClose: () => void;
    dataSiswa?: any;
};

export default function FormModal({ open, onClose, dataSiswa }: Props) {
    const isEdit = !!dataSiswa;
    const { auth }: any = usePage().props;

    const page: any = usePage().props;

    const periodes = page.periodes || [];
    const lembagas = page.lembagas || [];

    const periodeOptions = periodes.map((item: any) => ({
        value: item.id,
        label: item.tahun.toString(),
    }));

    const lembagaOptions = lembagas.map((item: any) => ({
        value: item.id,
        label: item.nama,
    }));

    const { data, setData, post, put, processing, errors, reset } = useForm({
        periode_id: "",
        lembaga_id: "",
        jumlah_siswa: "",
        bukti_dukung: null as File | null,
        _method: "",
    });

    const clearForm = () => {
        reset();

        setData({
            periode_id: "",
            lembaga_id: "",
            jumlah_siswa: "",
            bukti_dukung: null,
        });
    };

    useEffect(() => {
        if (!open) return;

        if (dataSiswa) {
            setData({
                periode_id: String(dataSiswa.periode_id),
                lembaga_id: String(dataSiswa.lembaga_id),
                jumlah_siswa: String(dataSiswa.jumlah_siswa),
                bukti_dukung: null,
            });
        } else {
            clearForm();
        }
    }, [open, dataSiswa]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            setData("_method", "put");

            post(route("data-siswa.update", dataSiswa.id), {
                preserveScroll: true,
                forceFormData: true,

                onSuccess: () => {
                    clearForm();
                    onClose();
                },
            });

            return;
        }

        setData("_method", "");

        post(route("data-siswa.store"), {
            preserveScroll: true,
            forceFormData: true,

            onSuccess: () => {
                clearForm();
                onClose();
            },
        });
    };

    const estimasi =
        Number(data.jumlah_siswa || 0) > 0
            ? Math.max(1, Math.floor(Number(data.jumlah_siswa) / 10))
            : 0;

    return (
        <Modal show={open} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {isEdit ? "Edit Data Siswa" : "Tambah Data Siswa"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Isi data jumlah siswa.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    {/* PERIODE */}

                    <div>
                        <FormSelect2
                            label="Periode"
                            value={data.periode_id}
                            options={periodeOptions}
                            onChange={(value) => setData("periode_id", value)}
                            placeholder="Pilih Periode"
                            error={errors.periode_id}
                        />
                    </div>

                    {/* LEMBAGA */}

                    <div>
                        {!auth.user.role.includes("lembaga") && (
                            <FormSelect2
                                label="Lembaga"
                                value={data.lembaga_id}
                                options={lembagaOptions}
                                onChange={(value) =>
                                    setData("lembaga_id", value)
                                }
                                placeholder="Pilih Lembaga"
                                error={errors.lembaga_id}
                            />
                        )}
                    </div>

                    {/* JUMLAH SISWA */}

                    <FormInput
                        type="number"
                        label="Jumlah Siswa"
                        value={data.jumlah_siswa}
                        onChange={(e) =>
                            setData("jumlah_siswa", e.target.value)
                        }
                        placeholder="Masukkan jumlah siswa"
                        error={errors.jumlah_siswa}
                    />
                    {/* BUKTI DUKUNG */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Bukti Dukung Jumlah Siswa
                        </label>

                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setData("bukti_dukung", file);
                            }}
                            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-indigo-600 hover:file:bg-indigo-100"
                        />

                        <p className="mt-1 text-xs text-slate-500">
                            Format: PDF, XLS, atau XLSX. Maksimal 2 MB.
                        </p>

                        {errors.bukti_dukung && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.bukti_dukung}
                            </p>
                        )}

                        {isEdit && dataSiswa?.bukti_dukung_url && (
                            <a
                                href={dataSiswa.bukti_dukung_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline"
                            >
                                Lihat bukti dukung saat ini
                            </a>
                        )}
                    </div>

                    {/* ESTIMASI */}

                    {Number(data.jumlah_siswa) > 0 && (
                        <div className="rounded-xl bg-emerald-50 p-4">
                            <p className="text-sm text-slate-500">
                                Estimasi Kuota Pengusulan
                            </p>

                            <p className="mt-1 text-2xl font-bold text-emerald-600">
                                {estimasi} Orang
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                *Estimasi dihitung otomatis berdasarkan jumlah
                                siswa.
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
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
