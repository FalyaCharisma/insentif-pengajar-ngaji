import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

import AdminLayout from "@/layouts/app-layout";

import PageHeader from "@/Components/PageHeader";
import PrimaryButton from "@/Components/PrimaryButton";
import TableToolbar from "@/Components/TableToolbar";

import { successAlert } from "@/lib/alert";
import { useQueryParams } from "@/hooks/use-query-params";

type Props = {
    kategori: any[];
    lembagas: any[];
    filters: any;
};

export default function Index({ kategori, lembagas, filters }: Props) {
    const { setParams } = useQueryParams(
        route("mapping-kategori.index"),
        filters,
    );

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    const [sourceKategori, setSourceKategori] = useState<string>(
        filters.source_kategori ?? "null",
    );

    const [targetKategori, setTargetKategori] = useState<number>(
        Number(filters.target_kategori) || kategori[0]?.id,
    );

    const [leftItems, setLeftItems] = useState<any[]>([]);
    const [rightItems, setRightItems] = useState<any[]>([]);

    const [leftSelected, setLeftSelected] = useState<number[]>([]);
    const [rightSelected, setRightSelected] = useState<number[]>([]);

    const [searchLeft, setSearchLeft] = useState("");
    const [searchRight, setSearchRight] = useState("");

    const [changedItems, setChangedItems] = useState<any[]>([]);

    const moveToRight = () => {
        if (leftSelected.length === 0) return;

        const moved = leftItems
            .filter((item: any) => leftSelected.includes(item.id))
            .map((item: any) => ({
                ...item,
                kategori_id: targetKategori,
            }));

        setLeftItems(
            leftItems.filter((item: any) => !leftSelected.includes(item.id)),
        );

        setRightItems([...rightItems, ...moved]);

        setChangedItems((prev) => {
            const changes = moved.map((item: any) => ({
                id: item.id,
                kategori_id: targetKategori,
            }));

            const merged = [...prev];

            changes.forEach((change) => {
                const index = merged.findIndex((x) => x.id === change.id);

                if (index >= 0) {
                    merged[index] = change;
                } else {
                    merged.push(change);
                }
            });

            return merged;
        });

        setLeftSelected([]);
    };

    const moveToLeft = () => {
        if (rightSelected.length === 0) return;

        const moved = rightItems
            .filter((item: any) => rightSelected.includes(item.id))
            .map((item: any) => ({
                ...item,
                kategori_id:
                    sourceKategori === "null" ? null : Number(sourceKategori),
            }));

        setRightItems(
            rightItems.filter((item: any) => !rightSelected.includes(item.id)),
        );

        setLeftItems([...leftItems, ...moved]);

        setChangedItems((prev) => {
            const changes = moved.map((item: any) => ({
                id: item.id,
                kategori_id:
                    sourceKategori === "null" ? null : Number(sourceKategori),
            }));

            const merged = [...prev];

            changes.forEach((change) => {
                const index = merged.findIndex((x) => x.id === change.id);

                if (index >= 0) {
                    merged[index] = change;
                } else {
                    merged.push(change);
                }
            });

            return merged;
        });

        setRightSelected([]);
    };

    const saveMapping = () => {
        router.post(route("mapping-kategori.store"), {
            mappings: changedItems,
        });
    };

    useEffect(() => {
        if (flash.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    useEffect(() => {
        let left = [];

        if (sourceKategori === "null") {
            left = lembagas.filter((item: any) => item.kategori_id === null);
        } else {
            left = lembagas.filter(
                (item: any) => item.kategori_id === Number(sourceKategori),
            );
        }

        const right = lembagas.filter(
            (item: any) => item.kategori_id === targetKategori,
        );

        setLeftItems(left);
        setRightItems(right);
    }, [sourceKategori, targetKategori, lembagas]);

    const filteredLeft = leftItems.filter(
        (item: any) =>
            item.nama.toLowerCase().includes(searchLeft.toLowerCase()) ||
            item.kode.toLowerCase().includes(searchLeft.toLowerCase()),
    );

    const filteredRight = rightItems.filter(
        (item: any) =>
            item.nama.toLowerCase().includes(searchRight.toLowerCase()) ||
            item.kode.toLowerCase().includes(searchRight.toLowerCase()),
    );
    return (
        <>
            <Head title="Mapping Kategori" />

            <AdminLayout>
                <div className="space-y-5">
                    <PageHeader
                        title="Mapping Kategori"
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
                                        Pilih <b>Kategori Asal</b> dan{" "}
                                        <b>Kategori Tujuan</b>.
                                    </li>

                                    <li>
                                        Centang lembaga yang akan dipindahkan.
                                    </li>

                                    <li>
                                        Gunakan tombol <b>Tambahkan</b> atau{" "}
                                        <b>Pindahkan</b> sesuai kebutuhan.
                                    </li>

                                    <li>
                                        Klik <b>Simpan Mapping</b> untuk
                                        menyimpan seluruh perubahan.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Panel Kiri */}
                        <div className="rounded-2xl border border-slate-200 bg-white">
                            <div className="border-b p-4">
                                <div className="mb-3 flex items-center justify-between">

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                                        {filteredLeft.length} Lembaga
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <select
                                        value={sourceKategori}
                                        onChange={(e) =>
                                            setSourceKategori(e.target.value)
                                        }
                                        className="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                    >
                                        <option value="null">
                                            Belum Mapping
                                        </option>

                                        {kategori.map((item: any) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        value={searchLeft}
                                        onChange={(e) =>
                                            setSearchLeft(e.target.value)
                                        }
                                        placeholder="Cari nama atau kode lembaga..."
                                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="max-h-[500px] overflow-y-auto">
                                {filteredLeft.length > 0 ? (
                                    filteredLeft.map((item: any) => {
                                        const checked = leftSelected.includes(
                                            item.id,
                                        );

                                        return (
                                            <label
                                                key={item.id}
                                                className={`flex cursor-pointer items-center justify-between border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50 ${
                                                    checked
                                                        ? "bg-indigo-50"
                                                        : ""
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => {
                                                            if (checked) {
                                                                setLeftSelected(
                                                                    leftSelected.filter(
                                                                        (id) =>
                                                                            id !==
                                                                            item.id,
                                                                    ),
                                                                );
                                                            } else {
                                                                setLeftSelected(
                                                                    [
                                                                        ...leftSelected,
                                                                        item.id,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                                                    />

                                                    <div>
                                                        <div className="font-medium text-slate-800">
                                                            {item.nama}
                                                        </div>

                                                        <div className="text-xs text-slate-500">
                                                            {item.kode}
                                                        </div>
                                                    </div>
                                                </div>

                                                <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700">
                                                    {item.kategori?.nama ?? "-"}
                                                </span>
                                            </label>
                                        );
                                    })
                                ) : (
                                    <div className="p-8 text-center text-sm text-slate-500">
                                        Tidak ada lembaga.
                                    </div>
                                )}
                            </div>

                            <div className="border-t bg-slate-50 p-3">
                                <div className="flex justify-end">
                                    <PrimaryButton
                                        onClick={moveToRight}
                                        disabled={
                                            leftSelected.length === 0 ||
                                            sourceKategori ===
                                                String(targetKategori)
                                        }
                                        className="inline-flex items-center gap-2"
                                    >
                                        Pindahkan
                                        <ArrowRight size={16} />
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                        {/* Panel Kanan */}
                        <div className="rounded-2xl border border-slate-200 bg-white">
                            <div className="border-b p-4">
                                <div className="mb-3 flex items-center justify-between">

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                                        {filteredRight.length} Lembaga
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <select
                                        value={targetKategori}
                                        onChange={(e) =>
                                            setTargetKategori(
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                    >
                                        {kategori.map((item: any) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        value={searchRight}
                                        onChange={(e) =>
                                            setSearchRight(e.target.value)
                                        }
                                        placeholder="Cari lembaga..."
                                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="max-h-[500px] overflow-y-auto">
                                {filteredRight.length > 0 ? (
                                    filteredRight.map((item: any) => {
                                        const checked = rightSelected.includes(
                                            item.id,
                                        );

                                        return (
                                            <label
                                                key={item.id}
                                                className={`flex cursor-pointer items-center justify-between border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50 ${
                                                    checked
                                                        ? "bg-indigo-50"
                                                        : ""
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => {
                                                            if (checked) {
                                                                setRightSelected(
                                                                    rightSelected.filter(
                                                                        (id) =>
                                                                            id !==
                                                                            item.id,
                                                                    ),
                                                                );
                                                            } else {
                                                                setRightSelected(
                                                                    [
                                                                        ...rightSelected,
                                                                        item.id,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                                                    />

                                                    <div>
                                                        <div className="font-medium text-slate-800">
                                                            {item.nama}
                                                        </div>

                                                        <div className="text-xs text-slate-500">
                                                            {item.kode}
                                                        </div>
                                                    </div>
                                                </div>

                                                <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                                                    {item.kategori?.nama ?? "-"}
                                                </span>
                                            </label>
                                        );
                                    })
                                ) : (
                                    <div className="p-8 text-center text-sm text-slate-500">
                                        Tidak ada lembaga.
                                    </div>
                                )}
                            </div>

                            <div className="border-t bg-slate-50 p-3">
                                <div className="flex justify-end">
                                    <PrimaryButton
                                        onClick={moveToLeft}
                                        disabled={rightSelected.length === 0}
                                        className="inline-flex items-center gap-2 bg-slate-500 hover:bg-slate-600"
                                    >
                                        <ArrowLeft size={16} />
                                        Pindahkan
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton
                            onClick={saveMapping}
                            disabled={changedItems.length === 0}
                            className="inline-flex items-center gap-2"
                        >
                            Simpan Mapping
                        </PrimaryButton>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
