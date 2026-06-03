import { useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import FormInput from "@/Components/forms/FormInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import FormTextarea from "@/Components/forms/FormTextArea";
import FormSelect from "@/Components/forms/FormSelect";
import FormFile from "@/Components/forms/FormFile";

type Props = {
    open: boolean;
    onClose: () => void;
    lembaga?: any;
    kategori: any[];
};

export default function FormModal({ open, onClose, lembaga, kategori }: Props) {
    const isEdit = !!lembaga;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        _method: "",
        kategori_id: "",
        nama: "",
        alamat: "",
        kelurahan: "",
        kecamatan: "",
        kabkota: "",
        telp: "",
        email: "",
        jumlah_guru: 0,
        jumlah_siswa: 0,
        sk: "",
        file_pendukung: null as File | null,
    });

    useEffect(() => {
        if (lembaga) {
            setData({
                kategori_id: lembaga.kategori_id?.toString() || "",
                nama: lembaga.nama || "",
                alamat: lembaga.alamat || "",
                kelurahan: lembaga.kelurahan || "",
                kecamatan: lembaga.kecamatan || "",
                kabkota: lembaga.kabkota || "",
                telp: lembaga.telp || "",
                email: lembaga.email || "",
                jumlah_guru: lembaga.jumlah_guru || 0,
                jumlah_siswa: lembaga.jumlah_siswa || 0,
                sk: lembaga.sk || "",
                file_pendukung: null,
            });
        } else {
            reset();
        }
    }, [lembaga, open]);

    const submit = (e: any) => {
        e.preventDefault();

        if (isEdit) {
            setData("_method", "put");

            post(route("lembaga.update", lembaga.id), {
                forceFormData: true,

                onSuccess: () => {
                    onClose();
                },
            });

            return;
        }

        post(route("lembaga.store"), {
            forceFormData: true,

            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Yakin ingin menghapus data ini?")) {
            return;
        }

        router.delete(route("lembaga.destroy", id), {
            onSuccess: () => {
                console.log("Berhasil dihapus");
            },
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-6">
            <div className="flex min-h-full items-center justify-center">
                <div className="w-full max-w-5xl rounded-2xl bg-white p-6">
                    {/* Header */}
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                {isEdit ? "Edit Lembaga" : "Tambah Lembaga"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Isi form data lembaga di bawah ini
                            </p>
                        </div>

                        <SecondaryButton onClick={onClose}>
                            <X className="h-4 w-4" />
                        </SecondaryButton>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {/* Kategori & Nama */}
                            <div className="xl:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-4">
                                {/* Kategori */}
                                <div className="md:col-span-1">
                                    <FormSelect
                                        label="Kategori"
                                        value={data.kategori_id}
                                        onChange={(e) =>
                                            setData(
                                                "kategori_id",
                                                e.target.value,
                                            )
                                        }
                                        error={errors.kategori_id}
                                    >
                                        <option value="">Pilih kategori</option>

                                        {kategori.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama}
                                            </option>
                                        ))}
                                    </FormSelect>
                                </div>

                                {/* Nama */}
                                <div className="md:col-span-3">
                                    <FormInput
                                        label="Nama Lembaga"
                                        value={data.nama}
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                        placeholder="Masukkan nama lembaga"
                                        error={errors.nama}
                                    />
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="md:col-span-2 xl:col-span-3">
                                <FormTextarea
                                    label="Alamat"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                    rows={3}
                                    placeholder="Masukkan alamat"
                                    error={errors.alamat}
                                />
                            </div>

                            {/* Wilayah */}
                            <div className="xl:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                                <FormInput
                                    label="Kelurahan"
                                    value={data.kelurahan}
                                    onChange={(e) =>
                                        setData("kelurahan", e.target.value)
                                    }
                                    placeholder="Masukkan kelurahan"
                                    error={errors.kelurahan}
                                />

                                <FormInput
                                    label="Kecamatan"
                                    value={data.kecamatan}
                                    onChange={(e) =>
                                        setData("kecamatan", e.target.value)
                                    }
                                    placeholder="Masukkan kecamatan"
                                    error={errors.kecamatan}
                                />

                                <FormInput
                                    label="Kabupaten / Kota"
                                    value={data.kabkota}
                                    onChange={(e) =>
                                        setData("kabkota", e.target.value)
                                    }
                                    placeholder="Masukkan kabupaten / kota"
                                    error={errors.kabkota}
                                />
                            </div>

                            {/* Kontak */}
                            <div className="xl:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormInput
                                    label="No. Telepon"
                                    value={data.telp}
                                    onChange={(e) =>
                                        setData("telp", e.target.value)
                                    }
                                    placeholder="Masukkan nomor telepon"
                                    error={errors.telp}
                                />

                                <FormInput
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Masukkan email"
                                    error={errors.email}
                                />
                            </div>

                            {/* Statistik */}
                            <div className="xl:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormInput
                                    label="Jumlah Guru"
                                    type="number"
                                    value={data.jumlah_guru}
                                    onChange={(e) =>
                                        setData(
                                            "jumlah_guru",
                                            Number(e.target.value),
                                        )
                                    }
                                    placeholder="0"
                                    error={errors.jumlah_guru}
                                />

                                <FormInput
                                    label="Jumlah Siswa"
                                    type="number"
                                    value={data.jumlah_siswa}
                                    onChange={(e) =>
                                        setData(
                                            "jumlah_siswa",
                                            Number(e.target.value),
                                        )
                                    }
                                    placeholder="0"
                                    error={errors.jumlah_siswa}
                                />
                            </div>

                            {/* SK & File */}
                            <div className="xl:col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormInput
                                    label="SK"
                                    value={data.sk}
                                    onChange={(e) =>
                                        setData("sk", e.target.value)
                                    }
                                    placeholder="Masukkan nomor SK"
                                    error={errors.sk}
                                />

                                <div>
                                    <FormFile
                                        label="File Pendukung"
                                        onChange={(e) =>
                                            setData(
                                                "file_pendukung",
                                                e.target.files?.[0] || null,
                                            )
                                        }
                                        error={errors.file_pendukung}
                                    />

                                    {errors.file_pendukung && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.file_pendukung}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 pt-4">
                            <SecondaryButton
                                type="button"
                                onClick={onClose}
                                disabled={processing}
                            >
                                Batal
                            </SecondaryButton>

                            <PrimaryButton type="submit" disabled={processing}>
                                {isEdit ? "Update" : "Simpan"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
