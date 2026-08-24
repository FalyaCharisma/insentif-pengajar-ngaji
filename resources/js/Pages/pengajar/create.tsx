import { Head, useForm, router, usePage } from "@inertiajs/react";

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
import { useEffect, useState } from "react";

import {
    Save,
    User,
    GraduationCap,
    Landmark,
    ImagePlus,
    ArrowLeft,
} from "lucide-react";
import axios from "axios";

type SelectOption = {
    label: string;
    value: string;
};

const initialValues = {
    nik: "",
    nama: "",

    tempat_lahir: null as SelectOption | null,
    tgl_lahir: "",
    jk: "",

    jabatan: "",
    lembaga_id: "",

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
    ktp: null as File | null,
    ijazah: null as File | null,

    status: "aktif",
};

type FormData = typeof initialValues;

type Props = {
    pengajar?: any;
};

export default function CreatePengajar({ pengajar }: Props) {

    const [previewFoto, setPreviewFoto] = useState(
        pengajar?.pas_foto
            ? `/storage/pengajar/foto/${pengajar.pas_foto}`
            : null,
    );

    const [previewKtp, setPreviewKtp] = useState(
        pengajar?.ktp
            ? `/storage/pengajar/ktp/${pengajar.ktp}`
            : null,
    );

    const [previewIjazah, setPreviewIjazah] = useState(
        pengajar?.ijazah
            ? `/storage/pengajar/ijazah/${pengajar.ijazah}`
            : null,
    );

    const isEdit = !!pengajar;
    const [loadedAlamat, setLoadedAlamat] = useState(false);

    const {
        searchProvinsi,
        searchKabkota,
        searchKecamatan,
        searchKelurahan,
        searchAllKabkota,
    } = useAlamat();

    const tahunOptions = Array.from(
        { length: new Date().getFullYear() - 1970 + 1 },
        (_, i) => {
            const tahun = String(new Date().getFullYear() - i);

            return {
                label: tahun,
                value: tahun,
            };
        },
    );

    const page: any = usePage().props;

    const lembagas = page.lembaga ?? [];

    const isLembaga = page.auth.user.role === "lembaga";

    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            ...initialValues,

            nik: pengajar?.nik ?? "",
            nama: pengajar?.nama ?? "",
            tempat_lahir: null,
            tgl_lahir: pengajar?.tgl_lahir ?? "",
            jk: pengajar?.jk ?? "",
            agama: pengajar?.agama ?? "",
            no_hp: pengajar?.no_hp ?? "",
            lembaga_id: pengajar?.lembaga_id ?? "",
            jabatan: pengajar?.jabatan ?? "",
            pendidikan_terakhir: pengajar?.pendidikan_terakhir ?? "",
            jurusan: pengajar?.jurusan ?? "",
            sekolah_universitas: pengajar?.sekolah_universitas ?? "",
            tahun_lulus: pengajar?.tahun_lulus ?? "",
            alamat: pengajar?.alamat ?? "",
            bank: pengajar?.bank ?? "",
            no_rekening: pengajar?.no_rekening ?? "",
            no_bpjs: pengajar?.no_bpjs ?? "",
            pas_foto: null,
        });

    const normalize = (text?: string) => (text ?? "").trim().toLowerCase();
    const resetDataNik = () => {
        setData((data) => ({
            ...data,
            nama: "",
            tempat_lahir: null,
            tgl_lahir: "",
            jk: "",
            alamat: "",
            provinsi: null,
            kabkota: null,
            kecamatan: null,
            kelurahan: null,
        }));
    };
    const handleNikChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 16);

        setData("nik", value);

        if (value.length < 16) {
            resetDataNik();
            return;
        }

        await ambilDataNik(value);
    };
    const ambilDataNik = async (nik: string) => {
        try {
            const res = await axios.get(route("pengajar.cekNik"), {
                params: { nik },
            });

            const api = res.data.data;
            const alamat = [
                api.alamat_ktp,
                api.rt_ktp && api.rw_ktp
                    ? `RT ${api.rt_ktp}/RW ${api.rw_ktp}`
                    : null,
            ]
                .filter(Boolean)
                .join(", ");

            const kodeProvinsi = api.kode_kecamatan_ktp.substring(0, 2);
            const kodeKabkota = api.kode_kecamatan_ktp.substring(0, 5);
            const provinsiOptions = await searchProvinsi("");

            const provinsi = provinsiOptions.find(
                (x: any) => Number(x.value) === Number(kodeProvinsi),
            );

            if (provinsi) {
                setData("provinsi", provinsi);
            }
            const kabOptions = await searchKabkota(kodeProvinsi, "Kota Kediri");

            const kab = kabOptions.find((x: any) => x.value === kodeKabkota);

            if (kab) {
                setData("kabkota", kab);
            }

            const kecamatanOptions = await searchKecamatan(kodeKabkota, "");

            const kecamatan = kecamatanOptions.find(
                (x: any) => x.value === api.kode_kecamatan_ktp,
            );

            if (kecamatan) {
                setData("kecamatan", kecamatan);
            }
            const kelurahanOptions = await searchKelurahan(
                api.kode_kecamatan_ktp,
                "",
            );

            const kelurahan = kelurahanOptions.find(
                (x: any) => x.value === api.kode_kelurahan_ktp,
            );

            if (kelurahan) {
                setData("kelurahan", kelurahan);
            }

            // Field biasa
            setData("nama", api.nama ?? "");
            setData("alamat", alamat);

            setData("tgl_lahir", api.tgl_lahir ?? "");

            // FormSelect2 -> STRING
            if (api.gender === "L") {
                setData("jk", "laki-laki");
            } else if (api.gender === "P") {
                setData("jk", "perempuan");
            }

            // FormAsyncSelect -> OBJECT
            if (api.tempat_lahir) {
                const options = await searchAllKabkota(api.tempat_lahir);

                const selected =
                    options.find((x: any) =>
                        x.label.toLowerCase().includes("kediri"),
                    ) ?? null;

                if (selected) {
                    setData("tempat_lahir", selected);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!pengajar?.tempat_lahir) return;

        searchAllKabkota(pengajar.tempat_lahir).then((options) => {
            const selected = options.find(
                (x: any) =>
                    normalize(x.label) === normalize(pengajar.tempat_lahir),
            );

            if (selected) {
                setData("tempat_lahir", selected);
            }
        });
    }, []);
    useEffect(() => {
        if (!isEdit) return;
        if (loadedAlamat) return;
        if (!pengajar?.provinsi) return;

        searchProvinsi("").then((options) => {
            const selected = options.find(
                (x: any) => normalize(x.label) === normalize(pengajar.provinsi),
            );

            if (selected) {
                setData("provinsi", selected);
            }
        });
    }, [loadedAlamat]);
    useEffect(() => {
        if (!isEdit) return;
        if (loadedAlamat) return;
        if (!data.provinsi) return;
        if (!pengajar?.kabkota) return;

        searchKabkota(data.provinsi.value, pengajar.kabkota).then((options) => {
            const selected = options.find(
                (x: any) => normalize(x.label) === normalize(pengajar.kabkota),
            );

            if (selected) {
                setData("kabkota", selected);
            }
        });
    }, [data.provinsi, loadedAlamat]);
    useEffect(() => {
        if (!isEdit) return;
        if (loadedAlamat) return;
        if (!data.kabkota) return;
        if (!pengajar?.kecamatan) return;

        searchKecamatan(data.kabkota.value, pengajar.kecamatan).then(
            (options) => {
                const selected = options.find(
                    (x: any) =>
                        normalize(x.label) === normalize(pengajar.kecamatan),
                );

                if (selected) {
                    setData("kecamatan", selected);
                }
            },
        );
    }, [data.kabkota, loadedAlamat]);
    useEffect(() => {
        if (!isEdit) return;
        if (loadedAlamat) return;
        if (!data.kecamatan) return;
        if (!pengajar?.kelurahan) return;

        searchKelurahan(data.kecamatan.value, pengajar.kelurahan).then(
            (options) => {
                const selected = options.find(
                    (x: any) =>
                        normalize(x.label) === normalize(pengajar.kelurahan),
                );

                if (selected) {
                    setData("kelurahan", selected);
                }

                // preload selesai
                setLoadedAlamat(true);
            },
        );
    }, [data.kecamatan, loadedAlamat]);

    // =========================
    // SUBMIT
    // =========================
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            router.post(
                route("pengajar.update", pengajar.id),
                {
                    ...data,
                    _method: "PUT",
                },
                {
                    forceFormData: true,

                    onStart: () => console.log("START"),
                    onSuccess: () => console.log("SUCCESS"),
                    onError: (e) => console.log(e),
                    onFinish: () => console.log("FINISH"),
                },
            );
        } else {
            post(route("pengajar.store"), {
                forceFormData: true,
            });
        }
    };

    return (
        <>
            <Head title={isEdit ? "Edit Pengajar" : "Tambah Pengajar"} />

            <AdminLayout>
                <div className="space-y-5">
                    <div className="flex items-start justify-between gap-3">
                        <PageHeader
                            title={isEdit ? "Edit Pengajar" : "Tambah Pengajar"}
                            subtitle="Tambahkan data pengajar beserta akun staff"
                        />
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
                                        Informasi identitas pengajar
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormInput
                                    label="NIK"
                                    placeholder="Masukkan 16 digit NIK"
                                    value={data.nik}
                                    onChange={handleNikChange}
                                    error={errors.nik}
                                />

                                <FormInput
                                    label="Nama"
                                    placeholder="Masukkan nama lengkap"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    error={errors.nama}
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
                                    onChange={(v) => setData("jk", v)}
                                    error={errors.jk}
                                    options={[
                                        {
                                            label: "Laki-laki",
                                            value: "laki-laki",
                                        },
                                        {
                                            label: "Perempuan",
                                            value: "perempuan",
                                        },
                                    ]}
                                />

                                <FormSelect2
                                    label="Agama"
                                    value={data.agama}
                                    onChange={(v) => setData("agama", v)}
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
                                    maxLength={12}
                                    value={data.no_hp}
                                    onChange={(e) => {
                                        const value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 12);
                                        setData("no_hp", value);
                                    }}
                                    placeholder="08xxxxxxxxxx"
                                    error={errors.no_hp}
                                />

                                {!isLembaga && (
                                    <FormSelect2
                                        label="Lembaga"
                                        value={data.lembaga_id}
                                        options={lembagas.map((item: any) => ({
                                            value: item.id,
                                            label: item.nama,
                                        }))}
                                        onChange={(value) =>
                                            setData("lembaga_id", value)
                                        }
                                        error={errors.lembaga_id}
                                    />
                                )}

                                <FormInput
                                    label="Jabatan"
                                    placeholder="Contoh: Guru Fiqih"
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
                                            label: "S2",
                                            value: "S2",
                                        },
                                        {
                                            label: "S1",
                                            value: "S1",
                                        },
                                        {
                                            label: "D4",
                                            value: "D4",
                                        },
                                        {
                                            label: "D3",
                                            value: "D3",
                                        },
                                        {
                                            label: "SMA",
                                            value: "SMA",
                                        },
                                        {
                                            label: "MA",
                                            value: "MA",
                                        },
                                    ]}
                                />

                                <FormInput
                                    label="Jurusan"
                                    placeholder="Contoh: Pendidikan Matematika"
                                    value={data.jurusan}
                                    onChange={(e) =>
                                        setData("jurusan", e.target.value)
                                    }
                                    error={errors.jurusan}
                                />

                                <FormInput
                                    label="Sekolah / Universitas"
                                    placeholder="Contoh: Universitas Negeri Malang"
                                    value={data.sekolah_universitas}
                                    onChange={(e) =>
                                        setData(
                                            "sekolah_universitas",
                                            e.target.value,
                                        )
                                    }
                                    error={errors.sekolah_universitas}
                                />

                                <FormSelect2
                                    label="Tahun Lulus"
                                    value={data.tahun_lulus}
                                    onChange={(v) => setData("tahun_lulus", v)}
                                    options={tahunOptions}
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
                                        Alamat Sesuai KTP
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
                                    loadOptions={(inputValue) => {
                                        if (!data.provinsi?.value) {
                                            return Promise.resolve([]);
                                        }

                                        return searchKabkota(
                                            String(data.provinsi.value),
                                            inputValue,
                                        ).then((options) => {
                                            console.log("HASIL KABKOTA:", options);
                                            return options;
                                        });
                                    }}
                                />

                                <FormAsyncSelect
                                    label="Kecamatan"
                                    key={data.kabkota?.value}
                                    value={data.kecamatan}
                                    onChange={(value: any) => {
                                        setData("kecamatan", value);

                                        setData("kelurahan", null);
                                    }}
                                    loadOptions={(inputValue) =>
                                        searchKecamatan(
                                            data.kabkota?.value ?? "",
                                            inputValue,
                                        )
                                    }
                                />

                                <FormAsyncSelect
                                    label="Kelurahan"
                                    key={data.kecamatan?.value}
                                    value={data.kelurahan}
                                    onChange={(value: any) =>
                                        setData("kelurahan", value)
                                    }
                                    loadOptions={(inputValue) =>
                                        searchKelurahan(
                                            data.kecamatan?.value ?? "",
                                            inputValue,
                                        )
                                    }
                                />

                                <div className="md:col-span-2">
                                    <FormTextArea
                                        label="Alamat Lengkap"
                                        placeholder="Contoh: Jl. Diponegoro No. 10 RT 01/RW 02"
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
                                <FormSelect2
                                    label="Bank"
                                    value={data.bank}
                                    onChange={(v) => setData("bank", v)}
                                    error={errors.bank}
                                    options={[
                                        {
                                            label: "Bank Jatim",
                                            value: "Bank Jatim",
                                        },
                                        { label: "BRI", value: "BRI" },
                                        { label: "BNI", value: "BNI" },
                                        { label: "Mandiri", value: "Mandiri" },
                                        { label: "BCA", value: "BCA" },
                                        { label: "BTN", value: "BTN" },
                                        { label: "BSI", value: "BSI" },
                                        {
                                            label: "CIMB Niaga",
                                            value: "CIMB Niaga",
                                        },
                                        { label: "Danamon", value: "Danamon" },
                                        {
                                            label: "Permata Bank",
                                            value: "Permata Bank",
                                        },
                                        {
                                            label: "Panin Bank",
                                            value: "Panin Bank",
                                        },
                                        {
                                            label: "Bank Mega",
                                            value: "Bank Mega",
                                        },
                                        {
                                            label: "Bank Syariah Jatim",
                                            value: "Bank Syariah Jatim",
                                        },
                                        { label: "Lainnya", value: "Lainnya" },
                                    ]}
                                />

                                <FormInput
                                    label="No Rekening"
                                    placeholder="Masukkan nomor rekening"
                                    value={data.no_rekening}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(
                                            /\D/g,
                                            "",
                                        );
                                        setData("no_rekening", value);
                                    }}
                                    error={errors.no_rekening}
                                />

                                <FormInput
                                    label="No BPJS"
                                    placeholder="Masukkan 13 digit nomor BPJS"
                                    value={data.no_bpjs}
                                    onChange={(e) => {
                                        const value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 13);
                                        setData("no_bpjs", value);
                                    }}
                                    error={errors.no_bpjs}
                                />

                                <div>
                                    <FormFile
                                        label="Pas Foto"
                                        hint="Maks. 1 MB (JPG, PNG, PDF)"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;

                                            setData("pas_foto", file);

                                            if (file) {
                                                setPreviewFoto(
                                                    URL.createObjectURL(file),
                                                );
                                            }
                                        }}
                                        error={errors.pas_foto}
                                    />

                                    {previewFoto && (
                                        <div className="mt-3">
                                            <a
                                                href={previewFoto}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    inline-flex items-center gap-2
                                                    rounded-lg border border-slate-200
                                                    bg-slate-50 px-4 py-2.5
                                                    text-sm font-medium text-indigo-600
                                                    transition hover:bg-slate-100
                                                "
                                            >
                                                Lihat Pas Foto
                                            </a>
                                        </div>
                                    )}
                                </div>
                                
                                {/* KTP */}
                                <div>
                                    <FormFile
                                        label="KTP"
                                        hint="Maks. 1 MB (JPG, PNG, PDF)"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;

                                            if (!file) {
                                                setData("ktp", null);
                                                setPreviewKtp(null);
                                                return;
                                            }

                                            if (file.size > 1 * 1024 * 1024) {
                                                alert("Ukuran file KTP maksimal 1 MB.");
                                                e.target.value = "";
                                                setData("ktp", null);
                                                setPreviewKtp(null);
                                                return;
                                            }

                                            setData("ktp", file);
                                            setPreviewKtp(URL.createObjectURL(file));
                                        }}
                                        error={errors.ktp}
                                    />

                                    {previewKtp && (
                                        <div className="mt-3">
                                            <a
                                                href={previewKtp}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    inline-flex items-center gap-2
                                                    rounded-lg border border-slate-200
                                                    bg-slate-50 px-4 py-2.5
                                                    text-sm font-medium text-indigo-600
                                                    transition hover:bg-slate-100
                                                "
                                            >
                                                Lihat Dokumen KTP
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* IJAZAH */}
                                <div>
                                    <FormFile
                                        label="Ijazah Terakhir"
                                        hint="Maks. 1 MB (JPG, PNG, PDF)"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;

                                            setData("ijazah", file);

                                            if (file) {
                                                setPreviewIjazah(URL.createObjectURL(file));
                                            } else {
                                                setPreviewIjazah(null);
                                            }
                                        }}
                                        error={errors.ijazah}
                                    />

                                    {previewIjazah && (
                                        <div className="mt-3">
                                            <a
                                                href={previewIjazah}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                                                    inline-flex items-center gap-2
                                                    rounded-lg border border-slate-200
                                                    bg-slate-50 px-4 py-2.5
                                                    text-sm font-medium text-indigo-600
                                                    transition hover:bg-slate-100
                                                "
                                            >
                                                Lihat Dokumen Ijazah
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ================= ACTION ================= */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <SecondaryButton
                                type="button"
                                onClick={() =>
                                    router.visit(route("pengajar.index"))
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

                                {processing ? "Menyimpan..." : "Simpan Data"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
