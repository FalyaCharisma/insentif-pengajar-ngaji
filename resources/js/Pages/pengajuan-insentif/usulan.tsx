import { Head } from "@inertiajs/react";
import { useState } from "react";

import AdminLayout from "@/layouts/app-layout";
import PageHeader from "@/Components/PageHeader";

type Pengajar = {
    id: number;
    nama: string;
    status: string;
    nik: string;
    tgl_lahir: string;
    pendidikan_terakhir: string;
    tempat_lahir: string;
};

type Props = {
    proposal: any;
    pengajar: Pengajar[];
    selectedPengajar: number[];
};

export default function Index({ proposal, pengajar, selectedPengajar }: Props) {
    const [selected, setSelected] = useState<number[]>(selectedPengajar);

    const togglePengajar = (id: number) => {
        setSelected((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            }

            if (prev.length >= proposal.jumlah_guru) {
                alert(
                    `Kuota penerima maksimal ${proposal.jumlah_guru} pengajar.`,
                );
                return prev;
            }

            return [...prev, id];
        });
    };

    return (
        <>
            <Head title="Usulan Penerima" />

            <AdminLayout>
                <div className="space-y-6">
                    <PageHeader
                        title="Usulan Penerima"
                        subtitle="Pilih pengajar yang diusulkan sebagai penerima insentif."
                    />

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
                                        Pilih
                                    </th>
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
                                                {item.tempat_lahir}, {" "}
                                                {item.tgl_lahir}
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                {item.pendidikan_terakhir}
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.includes(
                                                        item.id,
                                                    )}
                                                    onChange={() =>
                                                        togglePengajar(item.id)
                                                    }
                                                    className="h-5 w-5"
                                                />
                                            </td>
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
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="rounded-lg bg-slate-500 px-5 py-2 text-white hover:bg-slate-600"
                            >
                                Simpan Draft
                            </button>

                            <button
                                type="button"
                                className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                            >
                                Kirim Usulan
                            </button>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
