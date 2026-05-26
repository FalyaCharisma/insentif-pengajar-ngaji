import { Head, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";

import FormInput from "@/Components/forms/FormInput";
import FormSelect2 from "@/Components/forms/FormSelect2";
import FormTextArea from "@/Components/forms/FormTextArea";
import FormFile from "@/Components/forms/FormFile";

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

import {
    Save,
    User,
    GraduationCap,
    Landmark,
    ImagePlus,
    ArrowLeft
} from "lucide-react";

import { useAlamat } from "@/hooks/useAlamat";

export default function CreatePengurus() {

    const {
        provinsi,
        kabkota,
        kecamatan,
        kelurahan,
        setKodeProvinsi,
        setKodeKabkota,
        setKodeKecamatan,
    } = useAlamat();

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({
        nik: "",
        nama: "",
        email: "",

        tempat_lahir: "",
        tgl_lahir: "",
        jk: "",

        jabatan: "",

        pendidikan_terakhir: "",
        jurusan: "",
        sekolah_universitas: "",
        tahun_lulus: "",

        agama: "",

        alamat: "",
        provinsi: "",
        kabkota: "",
        kecamatan: "",
        kelurahan: "",

        no_hp: "",

        bank: "",
        no_rekening: "",
        no_bpjs: "",

        pas_foto: null as File | null,

        status_insentif: "aktif",
    });

    // =========================
    // NIK VALIDATION
    // =========================
    const handleNikChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const onlyNumber = value.replace(/\D/g, "").slice(0, 16);
        setData("nik", onlyNumber);
    };

    // =========================
    // SUBMIT
    // =========================
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("pengurus.store"), {
            forceFormData: true,
        });
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
                        <SecondaryButton
                            type="button"
                            onClick={() => router.visit(route("pengurus.index"))}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </SecondaryButton>
                    </div>

                    <form onSubmit={submit} className="space-y-5">

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
                                    onChange={(e) => setData("nama", e.target.value)}
                                    error={errors.nama}
                                />

                                <FormInput
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    error={errors.email}
                                />

                                <FormInput
                                    label="Tempat Lahir"
                                    value={data.tempat_lahir}
                                    onChange={(e) => setData("tempat_lahir", e.target.value)}
                                    error={errors.tempat_lahir}
                                />

                                <FormInput
                                    label="Tanggal Lahir"
                                    type="date"
                                    value={data.tgl_lahir}
                                    onChange={(e) => setData("tgl_lahir", e.target.value)}
                                    error={errors.tgl_lahir}
                                />

                                <FormSelect2
                                    label="Jenis Kelamin"
                                    value={data.jk}
                                    onChange={(v) => setData("jk", v)}
                                    error={errors.jk}
                                    options={[
                                        { label: "Laki-laki", value: "L" },
                                        { label: "Perempuan", value: "P" },
                                    ]}
                                />

                                <FormSelect2
                                    label="Agama"
                                    value={data.agama}
                                    onChange={(v) => setData("agama", v)}
                                    error={errors.agama}
                                    options={[
                                        { label: "Islam", value: "Islam" },
                                        { label: "Kristen", value: "Kristen" },
                                        { label: "Katolik", value: "Katolik" },
                                        { label: "Hindu", value: "Hindu" },
                                        { label: "Buddha", value: "Buddha" },
                                        { label: "Konghucu", value: "Konghucu" },
                                    ]}
                                />

                                <FormInput
                                    label="No HP"
                                    type="number"
                                    value={data.no_hp}
                                    onChange={(e) => setData("no_hp", e.target.value)}
                                    error={errors.no_hp}
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

                                <FormInput
                                    label="Pendidikan Terakhir"
                                    value={data.pendidikan_terakhir}
                                    onChange={(e) => setData("pendidikan_terakhir", e.target.value)}
                                    error={errors.pendidikan_terakhir}
                                />

                                <FormInput
                                    label="Jurusan"
                                    value={data.jurusan}
                                    onChange={(e) => setData("jurusan", e.target.value)}
                                    error={errors.jurusan}
                                />

                                <FormInput
                                    label="Sekolah / Universitas"
                                    value={data.sekolah_universitas}
                                    onChange={(e) => setData("sekolah_universitas", e.target.value)}
                                    error={errors.sekolah_universitas}
                                />

                                <FormInput
                                    label="Tahun Lulus"
                                    value={data.tahun_lulus}
                                    onChange={(e) => setData("tahun_lulus", e.target.value)}
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

                                <FormSelect2
                                    label="Provinsi"
                                    value={data.provinsi}
                                    onChange={(value) => {
                                        setData("provinsi", value);
                                        setKodeProvinsi(value);
                                    }}
                                    options={provinsi.map((p: any) => ({
                                        label: p.text,
                                        value: p.id,
                                    }))}
                                />

                                <FormSelect2
                                    label="Kabupaten / Kota"
                                    value={data.kabkota}
                                    onChange={(value) => {
                                        setData("kabkota", value);
                                        setKodeKabkota(value);
                                    }}
                                    options={kabkota.map((k: any) => ({
                                        label: k.text,
                                        value: k.id,
                                    }))}
                                />

                                <FormSelect2
                                    label="Kecamatan"
                                    value={data.kecamatan}
                                    onChange={(value) => {
                                        setData("kecamatan", value);
                                        setKodeKecamatan(value);
                                    }}
                                    options={kecamatan.map((k: any) => ({
                                        label: k.text,
                                        value: k.id,
                                    }))}
                                />

                                <FormSelect2
                                    label="Kelurahan"
                                    value={data.kelurahan}
                                    onChange={(value) =>
                                        setData("kelurahan", value)
                                    }
                                    options={kelurahan.map((k: any) => ({
                                        label: k.text,
                                        value: k.id,
                                    }))}
                                />

                                <div className="md:col-span-2">
                                    <FormTextArea
                                        label="Alamat Lengkap"
                                        value={data.alamat}
                                        onChange={(e) => setData("alamat", e.target.value)}
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
                                    onChange={(e) => setData("bank", e.target.value)}
                                    error={errors.bank}
                                />

                                <FormInput
                                    label="No Rekening"
                                    value={data.no_rekening}
                                    onChange={(e) => setData("no_rekening", e.target.value)}
                                    error={errors.no_rekening}
                                />

                                <FormInput
                                    label="No BPJS"
                                    value={data.no_bpjs}
                                    onChange={(e) => setData("no_bpjs", e.target.value)}
                                    error={errors.no_bpjs}
                                />

                                <FormFile
                                    label="Pas Foto"
                                    onChange={(e) =>
                                        setData("pas_foto", e.target.files?.[0] || null)
                                    }
                                    error={errors.pas_foto}
                                />
                            </div>
                        </div>

                        {/* ================= ACTION ================= */}
                        <div className="flex items-center justify-end gap-3 pt-2">

                            <SecondaryButton
                                type="button"
                                onClick={() => {
                                    reset(); // clear form
                                }}
                            >
                                Batal
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
                                {processing ? "Menyimpan..." : "Simpan Data"}
                            </PrimaryButton>

                        </div>

                    </form>
                </div>
            </AdminLayout>
        </>
    );
}