import { useForm, router, Head, usePage } from "@inertiajs/react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";
import PrimaryButton from "@/Components/PrimaryButton";
import { useAuth } from "@/lib/auth";
import CardSection from "@/Components/CardSection";
import InformasiCard from "./informasi-card";
import AlamatCard from "./alamat-card";
import KontakCard from "./kontak-card";
import PimpinanCard from "./pimpinan-card";
import OperatorCard from "./operator-card";
import RekeningCard from "./rekening-card";
import { ArrowLeft, ShieldCheck, Clock3, ShieldAlert, } from "lucide-react";
import { useState, useEffect } from "react";
import VerifikasiModal from "./verifikasi-modal";
import { Lembaga } from "@/types/lembaga";
import { successAlert } from "@/lib/alert";

type Props = {
    lembaga: Lembaga;
    kategori: any[];
    statistik: {
        total: number;
        pending: number;
        disetujui: number;
        ditolak: number;
    };
};

export default function Profil({
    lembaga,
    kategori,
    statistik,
}: Props) {

    const { flash } = usePage<{
        flash: {
            success?: string;
            error?: string;
        };
    }>().props;

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    const { hasRole } = useAuth();

    const canEdit =
        hasRole("superadmin") ||
        hasRole("lembaga");

    const canVerify =
        hasRole("dindik") || 
        hasRole("superadmin");

    const [openVerifikasi, setOpenVerifikasi] = useState(false);

    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({

        // Informasi
        nomor_registrasi:
            lembaga.profil?.nomor_registrasi ?? "",

        tahun_berdiri:
            lembaga.profil?.tahun_berdiri ?? "",

        // Alamat
        alamat:
            lembaga.profil?.alamat ?? "",

        provinsi: {
            label: "Jawa Timur",
            value: "35",
        },

        kabupaten: {
            label: "Kota Kediri",
            value: "3571",
        },

        kecamatan: lembaga.profil
        ? {
            label: lembaga.profil.kecamatan,
            value: lembaga.profil.kode_kecamatan,
        }
        : null,

    kelurahan: lembaga.profil
        ? {
            label: lembaga.profil.kelurahan,
            value: lembaga.profil.kode_kelurahan,
        }
        : null,

        kode_pos:
            lembaga.profil?.kode_pos ?? "",

        // Kontak
        telepon:
            lembaga.profil?.telepon ?? "",

        email:
            lembaga.profil?.email ?? "",

        website:
            lembaga.profil?.website ?? "",

        // Pimpinan
        nama_pimpinan:
            lembaga.profil?.nama_pimpinan ?? "",

        jabatan_pimpinan:
            lembaga.profil?.jabatan_pimpinan ?? "",

        // Operator
        nama_operator:
            lembaga.profil?.nama_operator ?? "",

        no_hp_operator:
            lembaga.profil?.no_hp_operator ?? "",

        // Rekening
        nama_bank:
            lembaga.profil?.nama_bank ?? "",

        nomor_rekening:
            lembaga.profil?.nomor_rekening ?? "",

        atas_nama_rekening:
            lembaga.profil?.atas_nama_rekening ?? "",

    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(
            route("lembaga.profil.update", lembaga.id),
        );
    };

    const verificationStatus = lembaga.profil?.status_verifikasi ?? "ditolak";

    const statusConfig = {
        disetujui: {
            title: "Profil Terverifikasi",
            badge: "Disetujui",
            icon: ShieldCheck,
            card: "bg-green-50 border-green-200",
            iconColor: "text-green-600",
            badgeColor: "bg-green-100 text-green-700",
        },

        pending: {
            title: "Menunggu Verifikasi",
            badge: "Pending",
            icon: Clock3,
            card: "bg-yellow-50 border-yellow-200",
            iconColor: "text-yellow-600",
            badgeColor: "bg-yellow-100 text-yellow-700",
        },

        ditolak: {
            title: "Profil Ditolak",
            badge: "Ditolak",
            icon: ShieldAlert,
            card: "bg-red-50 border-red-200",
            iconColor: "text-red-600",
            badgeColor: "bg-red-100 text-red-700",
        },
    };

    const config = statusConfig[verificationStatus];
    const StatusIcon = config.icon;

    const stats = [
        {
            title: "Total Dokumen",
            value: statistik.total,
            bg: "bg-slate-50",
            text: "text-slate-700",
        },
        {
            title: "Pending",
            value: statistik.pending,
            bg: "bg-yellow-50",
            text: "text-yellow-700",
        },
        {
            title: "Disetujui",
            value: statistik.disetujui,
            bg: "bg-green-50",
            text: "text-green-700",
        },
        {
            title: "Ditolak",
            value: statistik.ditolak,
            bg: "bg-red-50",
            text: "text-red-700",
        },
    ];
    
    return (
        <>
            <Head title="Profil Lembaga" />

            <AdminLayout>

                <div className="space-y-6">

                    <PageHeader
                        title="Profil Lembaga"
                        subtitle="Kelola data profil lembaga"
                    />

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {/* Status Verifikasi */}
                        <div className={`rounded-2xl border p-6 ${config.card}`}>

                            <div className="flex items-start justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="rounded-xl bg-white p-3 shadow-sm">
                                        <StatusIcon
                                            className={`h-7 w-7 ${config.iconColor}`}
                                        />
                                    </div>

                                    <div>

                                        <h3 className="text-lg font-semibold text-slate-800">
                                            {config.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Status Verifikasi Profil
                                        </p>

                                    </div>

                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${config.badgeColor}`}
                                >
                                    {config.badge}
                                </span>

                            </div>

                            {/* Informasi tambahan */}
                            {lembaga.profil?.status_verifikasi === "pending" &&
                                lembaga.profil?.catatan_verifikasi && (

                                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">

                                    <p className="font-medium text-amber-700">
                                        Menunggu Verifikasi Ulang
                                    </p>

                                    <p className="mt-1 text-sm text-amber-600">
                                        Profil telah diperbarui dan sedang menunggu proses verifikasi ulang oleh Dinas Pendidikan.
                                    </p>

                                </div>
                            )}

                            {/* Catatan */}
                            {lembaga.profil?.catatan_verifikasi && (

                                <div className="mt-5 rounded-xl bg-white/70 p-4">

                                    <p className="text-sm font-medium text-slate-700">
                                        {lembaga.profil?.status_verifikasi === "pending"
                                            ? "Catatan Verifikasi Sebelumnya"
                                            : "Catatan Verifikasi"}
                                    </p>

                                    <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                                        {lembaga.profil.catatan_verifikasi}
                                    </p>

                                </div>

                            )}

                        </div>

                        {/* Dokumen */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h3 className="text-lg font-semibold text-slate-800">
                                        Dokumen Pendukung
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Upload dan verifikasi dokumen lembaga
                                    </p>

                                </div>

                                <PrimaryButton
                                    type="button"
                                    onClick={() =>
                                        router.visit(
                                            route(
                                                "dokumen.index",
                                                lembaga.id
                                            )
                                        )
                                    }
                                >
                                    Lihat Dokumen
                                </PrimaryButton>

                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                                {stats.map((item) => (
                                    <div
                                        key={item.title}
                                        className={`rounded-xl p-4 text-center ${item.bg}`}
                                    >
                                        <p className={`text-2xl font-bold ${item.text}`}>
                                            {item.value}
                                        </p>

                                        <p className={`text-xs ${item.text}`}>
                                            {item.title}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >

                        <CardSection
                            title="Informasi Lembaga"
                        >
                            <InformasiCard
                                data={data}
                                setData={setData}
                                errors={errors}
                                canEdit={canEdit}
                                lembaga={lembaga}
                                kategori={kategori}
                            />
                        </CardSection>

                        <CardSection
                            title="Alamat"
                        >
                            <AlamatCard
                                data={data}
                                setData={setData}
                                errors={errors}
                                canEdit={canEdit}
                            />
                        </CardSection>

                        <CardSection
                            title="Kontak"
                        >
                            <KontakCard
                                data={data}
                                setData={setData}
                                errors={errors}
                                canEdit={canEdit}
                            />
                        </CardSection>

                        <CardSection
                            title="Pimpinan"
                        >
                            <PimpinanCard
                                data={data}
                                setData={setData}
                                errors={errors}
                                canEdit={canEdit}
                            />
                        </CardSection>

                        <CardSection
                            title="Operator"
                        >
                            <OperatorCard
                                data={data}
                                setData={setData}
                                errors={errors}
                                canEdit={canEdit}
                            />
                        </CardSection>

                        <CardSection
                            title="Rekening"
                        >
                            <RekeningCard
                                data={data}
                                setData={setData}
                                errors={errors}
                                canEdit={canEdit}
                            />
                        </CardSection>

                        <div className="flex items-center justify-between pt-4">

                        <button
                            type="button"
                            onClick={() => router.visit(route("lembaga.index"))}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
                        >
                            <ArrowLeft size={18} />
                            Kembali
                        </button>

                            <div className="flex items-center gap-3">

                                {canVerify && (
                                    <PrimaryButton
                                        type="button"
                                        onClick={() => setOpenVerifikasi(true)}
                                    >
                                        Verifikasi Profil
                                    </PrimaryButton>
                                )}

                                {canEdit && (
                                    <PrimaryButton
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Profil"}
                                    </PrimaryButton>
                                )}

                            </div>

                        </div>

                    </form>

                    <VerifikasiModal
                        open={openVerifikasi}
                        onClose={() => setOpenVerifikasi(false)}
                        profilId={lembaga.profil?.id ?? 0}
                        status={lembaga.profil?.status_verifikasi ?? "pending"}
                        catatan={lembaga.profil?.catatan_verifikasi ?? ""}
                    />

                </div>

            </AdminLayout>

        </>
    );
}