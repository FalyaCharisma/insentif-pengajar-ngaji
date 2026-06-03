import { Head, useForm, router } from "@inertiajs/react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";

import FormInput from "@/Components/forms/FormInput";
import FormSelect2 from "@/Components/forms/FormSelect2";
import FormAsyncSelect from "@/Components/forms/FormAsyncSelect";
import FormTextArea from "@/Components/forms/FormTextArea";
import FormFile from "@/Components/forms/FormFile";

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

import { useAlamat } from "@/hooks/useAlamat";
import { useLembaga } from "@/hooks/useLembaga";
import { useState } from "react";

import {
    Save,
    User,
    GraduationCap,
    Landmark,
    ImagePlus,
    ArrowLeft,
} from "lucide-react";

type SelectOption = {
    label: string;
    value: string;
};

const initialValues = {
    nik: "",
    nama: "",
    email: "",

    tempat_lahir: null as SelectOption | null,
    tgl_lahir: "",
    jk: null as SelectOption | null,

    jabatan: "",
    lembaga: null as SelectOption | null,

    pendidikan_terakhir: "",
    jurusan: "",
    sekolah_universitas: "",
    tahun_lulus: "",

    agama: "",

    alamat: "",

    provinsi: null as SelectOption | null,
    kabkota: null as SelectOption | null,
    kecamatan: null as SelectOption | null,
    kelurahan: null as SelectOption | null,

    no_hp: "",

    bank: "",
    no_rekening: "",
    no_bpjs: "",

    pas_foto: null as File | null,

    status_insentif: "aktif",
};

type FormData = typeof initialValues;

type Props = {
    pengurus?: any;
}

export default function CreatePengurus({ pengurus }: Props) {

    const [previewFoto, setPreviewFoto] = useState(
        pengurus?.pas_foto
            ? `/storage/pengurus/${pengurus.pas_foto}`
            : null
    );

    const isEdit = !!pengurus;

    const {
        searchProvinsi,
        searchKabkota,
        searchKecamatan,
        searchKelurahan,
        searchAllKabkota
    } = useAlamat();

    const { dataLembaga } = useLembaga();
    
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<FormData>({
        ...initialValues,

        nik: pengurus?.nik ?? "",
        nama: pengurus?.nama ?? "",
        email: pengurus?.user?.email ?? "",
        tempat_lahir: pengurus?.tempat_lahir ? { label: pengurus.tempat_lahir, value: pengurus.tempat_lahir} : null,
        tgl_lahir: pengurus?.tgl_lahir ?? "",
        jk: pengurus?.jk ?? "",
        agama: pengurus?.agama ?? "",
        no_hp: pengurus?.no_hp ?? "",
        lembaga: pengurus?.lembaga ? {label: pengurus.lembaga.nama, value: pengurus.lembaga.id } : null,
        jabatan: pengurus?.jabatan ?? "",
        pendidikan_terakhir: pengurus?.pendidikan_terakhir ?? "",
        jurusan: pengurus?.jurusan ?? "",
        sekolah_universitas: pengurus?.sekolah_universitas ?? "",
        tahun_lulus: pengurus?.tahun_lulus ?? "",
        provinsi: pengurus?.provinsi ? { label: pengurus.provinsi, value: pengurus.id_provinsi } : null,
        kabkota: pengurus?.kabkota ? { label: pengurus.kabkota, value: pengurus.id_kabkota } : null,
        kecamatan: pengurus?.kecamatan ? { label: pengurus.kecamatan, value: pengurus.id_kecamatan } : null,
        kelurahan: pengurus?.kelurahan ? { label: pengurus.kelurahan, value: pengurus.id_kelurahan } : null,
        alamat: pengurus?.alamat ?? "",
        bank: pengurus?.bank ?? "",
        no_rekening: pengurus?.no_rekening ?? "",
        no_bpjs: pengurus?.no_bpjs ?? "",
        pas_foto: null,

    });

    // =========================
    // NIK VALIDATION
    // =========================
    const handleNikChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        const onlyNumber = value.replace(/\D/g, "").slice(0, 16);

        setData("nik", onlyNumber);
    };

    // =========================
    // SUBMIT
    // =========================
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            router.post(
                route("pengurus.update", pengurus.id),
                {
                    ...data,
                    _method: "PUT",
                },
                {
                    forceFormData: true,
                }
            );
        } else {
            post(route("pengurus.store"), {
                forceFormData: true,
            });
        }
    };

    return (
        <>
            <Head title="Tambah Pengurus" />

            <AdminLayout>
                <div className="space-y-5">
                    <div className="flex items-start justify-between gap-3">
                        <PageHeader
                            title="Tambah Pengurus"
                            subtitle="Tambahkan data pengurus beserta akun staff"
                        />
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-5"
                    >
                        {/* ================= DATA DIRI ================= */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">
                                <div className="rounded-xl bg-slate-100 p-2.5">
                                    <User className="h-5 w-5 text-slate-700" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-slate-800">
                                        Data Diri
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Informasi identitas pengurus
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <FormInput
                                    label="NIK"
                                    value={data.nik}
                                    onChange={handleNikChange}
                                    error={errors.nik}
                                />

                                <FormInput
                                    label="Nama"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    error={errors.nama}
                                />

                                <FormInput
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    error={errors.email}
                                />

                                <FormAsyncSelect
                                    label="Tempat Lahir"
                                    value={data.tempat_lahir}
                                    onChange={(value: any) =>
                                        setData("tempat_lahir", value)
                                    }
                                    loadOptions={searchAllKabkota}
                                    error={errors.tempat_lahir}
                                />

                                <FormInput
                                    label="Tanggal Lahir"
                                    type="date"
                                    value={data.tgl_lahir}
                                    onChange={(e) =>
                                        setData("tgl_lahir", e.target.value)
                                    }
                                    error={errors.tgl_lahir}
                                />

                                <FormSelect2
                                    label="Jenis Kelamin"
                                    value={data.jk}
                                    onChange={(v) =>
                                        setData("jk", v)
                                    }
                                    error={errors.jk}
                                    options={[
                                        {
                                            label: "Laki-laki",
                                            value: "L",
                                        },
                                        {
                                            label: "Perempuan",
                                            value: "P",
                                        },
                                    ]}
                                />

                                <FormSelect2
                                    label="Agama"
                                    value={data.agama}
                                    onChange={(v) =>
                                        setData("agama", v)
                                    }
                                    error={errors.agama}
                                    options={[
                                        {
                                            label: "Islam",
                                            value: "Islam",
                                        },
                                        {
                                            label: "Kristen",
                                            value: "Kristen",
                                        },
                                        {
                                            label: "Katolik",
                                            value: "Katolik",
                                        },
                                        {
                                            label: "Hindu",
                                            value: "Hindu",
                                        },
                                        {
                                            label: "Buddha",
                                            value: "Buddha",
                                        },
                                        {
                                            label: "Konghucu",
                                            value: "Konghucu",
                                        },
                                    ]}
                                />

                                <FormInput
                                    label="No HP"
                                    type="number"
                                    value={data.no_hp}
                                    onChange={(e) =>
                                        setData("no_hp", e.target.value)
                                    }
                                    error={errors.no_hp}
                                />

                                <FormAsyncSelect
                                    label="Lembaga"
                                    value={data.lembaga}
                                    onChange={(value: any) =>
                                        setData("lembaga", value)
                                    }
                                    loadOptions={dataLembaga}
                                />

                                <FormInput
                                    label="Jabatan"
                                    value={data.jabatan}
                                    onChange={(e) =>
                                        setData("jabatan", e.target.value)
                                    }
                                    error={errors.jabatan}
                                />
                            </div>
                        </div>

                        {/* ================= PENDIDIKAN ================= */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">
                                <div className="rounded-xl bg-slate-100 p-2.5">
                                    <GraduationCap className="h-5 w-5 text-slate-700" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-slate-800">
                                        Pendidikan
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Informasi pendidikan terakhir
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <FormSelect2
                                    label="Pendidikan Terakhir"
                                    value={data.pendidikan_terakhir}
                                    onChange={(v) =>
                                        setData("pendidikan_terakhir", v)
                                    }
                                    error={errors.pendidikan_terakhir}
                                    options={[
                                        {
                                            label: "S1",
                                            value: "S1",
                                        },
                                        {
                                            label: "DIII",
                                            value: "DIII",
                                        },
                                    ]}
                                />

                                <FormInput
                                    label="Jurusan"
                                    value={data.jurusan}
                                    onChange={(e) =>
                                        setData("jurusan", e.target.value)
                                    }
                                    error={errors.jurusan}
                                />

                                <FormInput
                                    label="Sekolah / Universitas"
                                    value={data.sekolah_universitas}
                                    onChange={(e) =>
                                        setData(
                                            "sekolah_universitas",
                                            e.target.value
                                        )
                                    }
                                    error={errors.sekolah_universitas}
                                />

                                <FormInput
                                    label="Tahun Lulus"
                                    type="number"
                                    value={data.tahun_lulus}
                                    onChange={(e) =>
                                        setData(
                                            "tahun_lulus",
                                            e.target.value
                                        )
                                    }
                                    error={errors.tahun_lulus}
                                />
                            </div>
                        </div>

                        {/* ================= ALAMAT ================= */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">
                                <div className="rounded-xl bg-slate-100 p-2.5">
                                    <Landmark className="h-5 w-5 text-slate-700" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-slate-800">
                                        Alamat
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Pilih alamat bertingkat
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <FormAsyncSelect
                                    label="Provinsi"
                                    value={data.provinsi}
                                    onChange={(value: any) => {
                                        setData("provinsi", value);

                                        setData("kabkota", null);
                                        setData("kecamatan", null);
                                        setData("kelurahan", null);
                                    }}
                                    loadOptions={searchProvinsi}
                                />

                                <FormAsyncSelect
                                    key={data.provinsi?.value}
                                    label="Kabupaten / Kota"
                                    value={data.kabkota}
                                    onChange={(value: any) => {
                                        setData("kabkota", value);

                                        setData("kecamatan", null);
                                        setData("kelurahan", null);
                                    }}
                                    loadOptions={(inputValue) =>
                                        searchKabkota(
                                            data.provinsi?.value ?? "",
                                            inputValue
                                        )
                                    }
                                />

                                <FormAsyncSelect
                                    key={data.kabkota?.value}
                                    label="Kecamatan"
                                    value={data.kecamatan}
                                    onChange={(value: any) => {
                                        setData("kecamatan", value);

                                        setData("kelurahan", null);
                                    }}
                                    loadOptions={(inputValue) =>
                                        searchKecamatan(
                                            data.kabkota?.value ?? "",
                                            inputValue
                                        )
                                    }
                                />

                                <FormAsyncSelect
                                    key={data.kecamatan?.value}
                                    label="Kelurahan"
                                    value={data.kelurahan}
                                    onChange={(value: any) =>
                                        setData("kelurahan", value)
                                    }
                                    loadOptions={(inputValue) =>
                                        searchKelurahan(
                                            data.kecamatan?.value ?? "",
                                            inputValue
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <FormTextArea
                                        label="Alamat Lengkap"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                        error={errors.alamat}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* ================= REKENING ================= */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">
                                <div className="rounded-xl bg-slate-100 p-2.5">
                                    <ImagePlus className="h-5 w-5 text-slate-700" />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-slate-800">
                                        Rekening & Dokumen
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Informasi rekening dan dokumen
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <FormInput
                                    label="Bank"
                                    value={data.bank}
                                    onChange={(e) =>
                                        setData("bank", e.target.value)
                                    }
                                    error={errors.bank}
                                />

                                <FormInput
                                    label="No Rekening"
                                    value={data.no_rekening}
                                    onChange={(e) =>
                                        setData(
                                            "no_rekening",
                                            e.target.value
                                        )
                                    }
                                    error={errors.no_rekening}
                                />

                                <FormInput
                                    label="No BPJS"
                                    value={data.no_bpjs}
                                    onChange={(e) =>
                                        setData("no_bpjs", e.target.value)
                                    }
                                    error={errors.no_bpjs}
                                />

                                <div>
                                    <FormFile
                                        label="Pas Foto"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;

                                            setData("pas_foto", file);

                                            if (file) {
                                                setPreviewFoto(URL.createObjectURL(file));
                                            }
                                        }}
                                        error={errors.pas_foto}
                                    />

                                    {previewFoto && (
                                        <a
                                            href={previewFoto}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 block"
                                        >
                                            <img
                                                src={previewFoto}
                                                alt="Pas Foto"
                                                className="h-32 w-32 rounded-lg object-cover border"
                                            />
                                        </a>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* ================= ACTION ================= */}
                        <div className="flex items-center justify-end gap-3 pt-2">

                            <SecondaryButton
                                type="button"
                                onClick={() =>
                                    router.visit(route("pengurus.index"))
                                }
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Kembali
                            </SecondaryButton>

                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="
                                    flex items-center gap-2
                                    rounded-xl
                                    px-5 py-2.5
                                    text-sm font-semibold
                                    transition
                                    hover:bg-slate-800
                                    active:scale-[0.98]
                                    disabled:opacity-50
                                "
                            >
                                <Save className="h-4 w-4" />

                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Data"}
                            </PrimaryButton>

                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}