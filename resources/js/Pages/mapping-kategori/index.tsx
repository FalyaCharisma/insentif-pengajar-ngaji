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
    kategori: any[];
    lembagas: any;
    filters: any;
    selectedKategori: number;
};

export default function Index({
    kategori,
    lembagas,
    filters,
    selectedKategori,
}: Props) {
    const { setParams } = useQueryParams(
        route("mapping-kategori.index"),
        filters,
    );

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
            .filter(
                (item: any) =>
                    Number(item.kategori_id) === Number(selectedKategori),
            )
            .map((item: any) => item.id);

        setSelected(ids);
    }, [selectedKategori, lembagas]);

    const submit = () => {
        router.put(route("mapping-kategori.update"), {
            kategori_id: selectedKategori,
            lembaga_ids: selected,
        });
    };

    return (
        <>
            <Head title="Mapping Kategori" />

            <AdminLayout>
                <div className="space-y-5">
                    <PageHeader
                        title="Mapping Kategori Lembaga"
                        subtitle="Pemetaan kategori ke lembaga"
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
                                    Informasi Mapping Kategori
                                </h3>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-700">
                                    <li>
                                        Setiap lembaga hanya dapat memiliki satu
                                        kategori.
                                    </li>

                                    <li>
                                        Pilih kategori terlebih dahulu kemudian
                                        centang lembaga yang akan masuk ke
                                        kategori tersebut.
                                    </li>

                                    <li>
                                        Lembaga yang berada pada kategori lain
                                        dapat dipindahkan melalui tombol{" "}
                                        <b>Pindahkan</b>.
                                    </li>

                                    <li>
                                        Klik <b>Simpan Mapping</b> untuk
                                        menyimpan perubahan.
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
                        <select
                            value={selectedKategori}
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
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="w-16 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Pilih
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Kode
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Nama Lembaga
                                    </th>

                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Kategori Saat Ini
                                    </th>

                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {lembagas.data.map((item: any) => (
                                    <MappingRow
                                        key={item.id}
                                        item={item}
                                        kategoriId={selectedKategori}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={lembagas.links} />
                </div>
            </AdminLayout>
        </>
    );
}
