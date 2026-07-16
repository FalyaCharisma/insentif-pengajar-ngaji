import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

import AdminLayout from "@/layouts/app-layout";

import PageHeader from "@/Components/PageHeader";
import Pagination from "@/Components/pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TableToolbar from "@/Components/TableToolbar";

import { successAlert } from "@/lib/alert";
import { useQueryParams } from "@/hooks/use-query-params";

import MappingRow from "./row";

type Props = {
    forums: any[];
    kategori: any[];
    lembagas: any;
    filters: any;
    selectedForum: number;
};

export default function Index({
    forums,
    kategori,
    lembagas,
    filters,
    selectedForum,
}: Props) {
    const { setParams } = useQueryParams(route("mapping-forum.index"), filters);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    useEffect(() => {
        const ids = lembagas.data
            .filter((item: any) => item.forum_id === selectedForum)
            .map((item: any) => item.id);

        setSelected(ids);
    }, [selectedForum, lembagas]);

    const submit = () => {
        router.put(route("mapping-forum.update"), {
            forum_id: selectedForum,
            lembaga_ids: selected,
        });
    };
    console.log(typeof selectedForum, selectedForum);
console.log(typeof lembagas.data[0]?.forum_id, lembagas.data[0]?.forum_id);

    return (
        
        <>
        
            <Head title="Mapping Forum" />

            <AdminLayout>
                <div className="space-y-5">
                    <PageHeader
                        title="Mapping Forum"
                        subtitle="Pemetaan forum ke lembaga"
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
                                    Informasi Mapping Forum
                                </h3>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-700">
                                    <li>
                                        Setiap lembaga hanya dapat dipetakan ke{" "}
                                        <b>satu forum</b>.
                                    </li>

                                    <li>
                                        Pilih forum terlebih dahulu, kemudian
                                        centang lembaga yang akan menjadi
                                        anggota forum tersebut.
                                    </li>

                                    <li>
                                        Lembaga yang sudah berada pada forum
                                        lain dapat dipindahkan melalui tombol{" "}
                                        <b>Pindahkan</b>.
                                    </li>

                                    <li>
                                        Klik <b>Simpan Mapping</b> untuk
                                        menyimpan seluruh perubahan.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <TableToolbar
                        filters={filters}
                        setParams={setParams}
                        hideAddButton
                        hideSort
                        searchPlaceholder="Cari nama atau kode lembaga..."
                    >
                        {/* Forum */}
                        <select
                            value={selectedForum}
                            onChange={(e) =>
                                setParams({
                                    forum_id: e.target.value,
                                    page: 1,
                                })
                            }
                            className="
                                h-11
                                rounded-2xl
                                border
                                border-slate-200
                                px-4
                                text-sm
                            "
                        >
                            {forums.map((forum: any) => (
                                <option key={forum.id} value={forum.id}>
                                    {forum.nama}
                                </option>
                            ))}
                        </select>

                        {/* Filter kategori */}
                        <select
                            value={filters.kategori_id ?? ""}
                            onChange={(e) =>
                                setParams({
                                    kategori_id: e.target.value,
                                    page: 1,
                                })
                            }
                            className="
                                h-11
                                rounded-2xl
                                border
                                border-slate-200
                                px-4
                                text-sm
                            "
                        >
                            <option value="">Semua Kategori</option>

                            {kategori.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                    {item.nama}
                                </option>
                            ))}
                        </select>

                        <PrimaryButton onClick={submit}>
                            Simpan Mapping
                        </PrimaryButton>
                    </TableToolbar>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <table className="min-w-full">
                            <thead className="bg-slate-50">
                                <tr className="text-sm text-slate-600">
                                    <th className="w-16 px-4 py-3 text-center">
                                        Pilih
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Kode
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Nama Lembaga
                                    </th>

                                    <th className="px-4 py-3 text-center">
                                        Kategori
                                    </th>

                                    <th className="px-4 py-3 text-center">
                                        Forum Saat Ini
                                    </th>

                                    <th className="px-4 py-3 text-center">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {lembagas.data.length > 0 ? (
                                    lembagas.data.map((item: any) => (
                                        <MappingRow
                                            key={item.id}
                                            item={item}
                                            forumId={selectedForum}
                                            selected={selected}
                                            setSelected={setSelected}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-10 text-center text-slate-500"
                                        >
                                            Tidak ada data lembaga.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={lembagas.links} />
                </div>
            </AdminLayout>
        </>
    );
}
