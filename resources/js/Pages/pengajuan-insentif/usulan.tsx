import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";
import {
    verifyConfirm,
    warningAlert,
    inputConfirm,
    successAlert,
} from "@/lib/alert";
import PrimaryButton from "@/Components/PrimaryButton";
import { Check, RotateCcw } from "lucide-react";

type Pengajar = {
    id: number;
    nama: string;
    nik: string;
    tempat_lahir: string;
    tgl_lahir: string;
    pendidikan_terakhir: string;

    selected: boolean;
    status_pengajuan: "pending" | "verified" | "revision" | null;
    catatan: string | null;

    pengajuan_insentif_id: number | null;
    verified_by: number | null;
    verified_at: string | null;
};

type Props = {
    proposal: any;
    pengajar: Pengajar[];
    // selectedPengajar: number[];
};

export default function Index({ proposal, pengajar }: Props) {
    const { auth } = usePage().props as any;

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    const hasRole = (role: string) => auth.user.role.includes(role);
    const [selected, setSelected] = useState<number[]>(
        pengajar.filter((item) => item.selected).map((item) => item.id),
    );

    const [selectedInsentif, setSelectedInsentif] = useState<number[]>([]);

    const togglePengajar = (item: Pengajar) => {
        if (item.status_pengajuan === "verified") {
            return;
        }

        setSelected((prev) => {
            if (prev.includes(item.id)) {
                return prev.filter((id) => id !== item.id);
            }

            if (prev.length >= proposal.jumlah_guru) {
                warningAlert(
                    `Kuota penerima maksimal ${proposal.jumlah_guru} pengajar.`,
                );
                return prev;
            }

            return [...prev, item.id];
        });
    };

    const toggleInsentif = (id: number) => {
        setSelectedInsentif((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const toggleAll = () => {
        const pendingIds = pengajar
            .filter(
                (item) =>
                    item.status_pengajuan === "pending" &&
                    item.pengajuan_insentif_id,
            )
            .map((item) => item.pengajuan_insentif_id!);

        if (selectedInsentif.length === pendingIds.length) {
            setSelectedInsentif([]);
        } else {
            setSelectedInsentif(pendingIds);
        }
    };

    const submit = async () => {
        if (selected.length === 0) {
            return;
        }

        const result = await verifyConfirm(
            "Simpan Usulan",
            "Apakah Anda yakin ingin menyimpan usulan penerima insentif?",
            "Ya, Simpan",
        );

        if (!result.isConfirmed) return;

        router.post(route("pengajuan-insentif.store"), {
            proposal_id: proposal.id,
            pengajar: selected,
        });
    };
    const verify = async (id: number) => {
        const result = await verifyConfirm(
            "Verifikasi",
            "Verifikasi pengajar ini?",
            "Ya",
        );

        if (!result.isConfirmed) return;

        router.patch(route("pengajuan-insentif.verify", id));
    };

    const reject = async (id: number) => {
        const result = await inputConfirm("Revisi", "Masukkan catatan revisi");

        if (!result.isConfirmed) return;

        router.patch(route("pengajuan-insentif.reject", id), {
            catatan: result.value,
        });
    };

    const verifySelected = async () => {
        if (selectedInsentif.length === 0) return;

        const result = await verifyConfirm(
            "Verifikasi",
            "Verifikasi semua data yang dipilih?",
            "Ya",
        );

        if (!result.isConfirmed) return;

        router.patch(route("pengajuan-insentif.verify-selected"), {
            ids: selectedInsentif,
        });
    };

    const rejectSelected = async () => {
        if (selectedInsentif.length === 0) return;

        const result = await inputConfirm("Revisi", "Masukkan catatan revisi");

        if (!result.isConfirmed) return;

        router.patch(route("pengajuan-insentif.reject-selected"), {
            ids: selectedInsentif,
            catatan: result.value,
        });
    };

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }

        if (flash.error) {
            warningAlert(flash.error);
        }
    }, [flash]);

    return (
        <>
            <Head title="Usulan Penerima" />

            <AdminLayout>
                <div className="space-y-6">
                    <PageHeader
                        title="Usulan Penerima"
                        subtitle="Pilih pengajar yang diusulkan sebagai penerima insentif."
                    />
                    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                <svg
                                    className="h-5 w-5 text-sky-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-sky-800">
                                    Mekanisme Pengusulan Penerima Insentif
                                </h3>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-700">
                                    <li>
                                        Lembaga memilih pengajar yang akan
                                        diusulkan sebagai calon penerima
                                        insentif sesuai kuota yang tersedia.
                                    </li>

                                    <li>
                                        Setelah usulan disimpan, status
                                        pengajuan akan menjadi
                                        <strong> Menunggu Verifikasi</strong>.
                                    </li>

                                    <li>
                                        Forum akan melakukan verifikasi terhadap
                                        setiap usulan pengajar.
                                    </li>

                                    <li>
                                        Pengajuan yang disetujui akan berstatus
                                        <strong> Terverifikasi</strong>.
                                    </li>

                                    <li>
                                        Pengajuan yang memerlukan perbaikan akan
                                        berstatus
                                        <strong> Revisi</strong> disertai
                                        catatan dari Forum.
                                    </li>

                                    <li>
                                        Lembaga dapat memperbaiki usulan yang
                                        berstatus
                                        <strong> Revisi</strong> dan
                                        mengirimkannya kembali untuk
                                        diverifikasi.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Informasi Proposal */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Periode
                                </p>

                                <p className="font-semibold">
                                    {proposal.periode.tahun}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Lembaga
                                </p>

                                <p className="font-semibold">
                                    {proposal.lembaga.nama}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Kuota Penerima
                                </p>

                                <p className="font-semibold">
                                    {proposal.jumlah_guru} Pengajar
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Daftar Pengajar */}
                    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                        <table className="w-full">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="px-5 py-3 text-left">
                                        Nama Pengajar
                                    </th>

                                    <th className="px-5 py-3 text-center">
                                        NIK
                                    </th>
                                    <th className="px-5 py-3 text-center">
                                        Tempat & Tanggal Lahir
                                    </th>
                                    <th className="px-5 py-3 text-center">
                                        Pendidikan Terakhir
                                    </th>

                                    <th className="px-5 py-3 text-center">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-center">
                                        {hasRole("forum") ? (
                                            <input
                                                type="checkbox"
                                                checked={
                                                    selectedInsentif.length >
                                                        0 &&
                                                    selectedInsentif.length ===
                                                        pengajar.filter(
                                                            (item) =>
                                                                item.status_pengajuan ===
                                                                    "pending" &&
                                                                item.pengajuan_insentif_id,
                                                        ).length
                                                }
                                                onChange={toggleAll}
                                            />
                                        ) : (
                                            "Pilih"
                                        )}
                                    </th>
                                    {hasRole("forum") && (
                                        <th className="px-5 py-3 text-center">
                                            Aksi
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {pengajar.length > 0 ? (
                                    pengajar.map((item) => (
                                        <tr key={item.id} className="border-t">
                                            <td className="px-5 py-4">
                                                {item.nama}
                                            </td>

                                            <td className="px-5 py-4 text-center">
                                                {item.nik}
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                {item.tempat_lahir},{" "}
                                                {item.tgl_lahir}
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                {item.pendidikan_terakhir}
                                            </td>

                                            <td className="px-5 py-4 text-center">
                                                {item.status_pengajuan ===
                                                    "verified" && (
                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                        Terverifikasi
                                                    </span>
                                                )}

                                                {item.status_pengajuan ===
                                                    "pending" && (
                                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                        Menunggu
                                                    </span>
                                                )}

                                                {item.status_pengajuan ===
                                                    "revision" && (
                                                    <div className="space-y-1">
                                                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                                                            Revisi
                                                        </span>

                                                        {item.catatan && (
                                                            <p className="text-xs text-red-600">
                                                                {item.catatan}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {!item.status_pengajuan && (
                                                    <span className="text-slate-400">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                {hasRole("lembaga") && (
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            item.status_pengajuan ===
                                                            "verified"
                                                                ? true
                                                                : selected.includes(
                                                                      item.id,
                                                                  )
                                                        }
                                                        disabled={
                                                            item.status_pengajuan ===
                                                            "verified"
                                                        }
                                                        onChange={() =>
                                                            togglePengajar(item)
                                                        }
                                                        className="h-5 w-5"
                                                    />
                                                )}

                                                {hasRole("forum") &&
                                                    item.status_pengajuan ===
                                                        "pending" &&
                                                    item.pengajuan_insentif_id && (
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedInsentif.includes(
                                                                item.pengajuan_insentif_id,
                                                            )}
                                                            onChange={() =>
                                                                toggleInsentif(
                                                                    item.pengajuan_insentif_id!,
                                                                )
                                                            }
                                                            className="h-5 w-5"
                                                        />
                                                    )}

                                                {hasRole("forum") &&
                                                    item.status_pengajuan !==
                                                        "pending" && (
                                                        <span className="text-slate-400">
                                                            -
                                                        </span>
                                                    )}
                                            </td>
                                            {hasRole("forum") && (
                                                <td className="px-5 py-4 text-center">
                                                    {item.status_pengajuan ===
                                                    "pending" ? (
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    verify(
                                                                        item.pengajuan_insentif_id!,
                                                                    )
                                                                }
                                                                className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs text-white hover:bg-emerald-600"
                                                            >
                                                                <Check className="h-3.5 w-3.5" />
                                                                Verifikasi
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    reject(
                                                                        item.pengajuan_insentif_id!,
                                                                    )
                                                                }
                                                                className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white hover:bg-red-600"
                                                            >
                                                                <RotateCcw className="h-3.5 w-3.5" />
                                                                Revisi
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="py-8 text-center text-slate-500"
                                        >
                                            Belum ada data pengajar.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Ringkasan */}
                    <div className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm">
                        <div>
                            <p>
                                Kuota :
                                <span className="ml-2 font-semibold">
                                    {proposal.jumlah_guru}
                                </span>
                            </p>

                            <p>
                                Dipilih :
                                <span className="ml-2 font-semibold">
                                    {selected.length}
                                </span>
                            </p>
                            <p>
                                Sudah Diverifikasi :
                                <span className="ml-2 font-semibold text-green-600">
                                    {
                                        pengajar.filter(
                                            (item) =>
                                                item.status_pengajuan ===
                                                "verified",
                                        ).length
                                    }
                                </span>
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {hasRole("lembaga") && (
                                <PrimaryButton
                                    type="button"
                                    onClick={submit}
                                    disabled={selected.length === 0}
                                >
                                    Simpan Usulan
                                </PrimaryButton>
                            )}

                            {hasRole("forum") && (
                                <>
                                    <PrimaryButton
                                        type="button"
                                        onClick={verifySelected}
                                        disabled={selectedInsentif.length === 0}
                                    >
                                        Verifikasi Terpilih
                                    </PrimaryButton>

                                    <button
                                        type="button"
                                        onClick={rejectSelected}
                                        disabled={selectedInsentif.length === 0}
                                        className="rounded-md bg-red-500 px-4 py-2 text-white disabled:opacity-50"
                                    >
                                        Revisi Terpilih
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
