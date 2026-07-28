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
    forums: any[];
    kategori: any[];
    lembagas: any[];
    filters: any;
};

export default function Index({ forums, kategori, lembagas, filters }: Props) {
    const { setParams } = useQueryParams(route("mapping-forum.index"), filters);

    const pageProps: any = usePage().props;
    const flash = pageProps.flash || {};

    const [sourceForum, setSourceForum] = useState<string>(
        filters.source_forum ?? "null",
    );

    const [targetForum, setTargetForum] = useState<number>(
        Number(filters.target_forum) || forums[0]?.id,
    );

    const [leftItems, setLeftItems] = useState<any[]>([]);
    const [rightItems, setRightItems] = useState<any[]>([]);

    const [leftSelected, setLeftSelected] = useState<number[]>([]);
    const [rightSelected, setRightSelected] = useState<number[]>([]);

    const [searchLeft, setSearchLeft] = useState("");
    const [searchRight, setSearchRight] = useState("");

    const moveToRight = () => {
        if (leftSelected.length === 0) return;

        const moved = leftItems
            .filter((item: any) => leftSelected.includes(item.id))
            .map((item: any) => ({
                ...item,
                forum_id: targetForum,
            }));

        setLeftItems(
            leftItems.filter((item: any) => !leftSelected.includes(item.id)),
        );

        setRightItems([...rightItems, ...moved]);

        setChangedItems((prev) => {
            const changes = moved.map((item: any) => ({
                id: item.id,
                forum_id: targetForum,
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
                forum_id: sourceForum === "null" ? null : Number(sourceForum),
            }));

        setRightItems(
            rightItems.filter((item: any) => !rightSelected.includes(item.id)),
        );

        setLeftItems([...leftItems, ...moved]);
        setChangedItems((prev) => {
            const changes = moved.map((item: any) => ({
                id: item.id,
                forum_id: sourceForum === "null" ? null : Number(sourceForum),
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

    const [changedItems, setChangedItems] = useState<any[]>([]);

    const saveMapping = () => {
        router.post(route("mapping-forum.store"), {
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

        if (sourceForum === "null") {
            left = lembagas.filter((item: any) => item.forum_id === null);
        } else {
            left = lembagas.filter(
                (item: any) => item.forum_id === Number(sourceForum),
            );
        }

        const right = lembagas.filter(
            (item: any) => item.forum_id === targetForum,
        );

        setLeftItems(left);
        setRightItems(right);
    }, [sourceForum, targetForum, lembagas]);
    useEffect(() => {
        if (!targetForum) return;

        let left = [];

        if (sourceForum === "null") {
            left = lembagas.filter((item: any) => item.forum_id === null);
        } else {
            left = lembagas.filter(
                (item: any) => item.forum_id === Number(sourceForum),
            );
        }

        const right = lembagas.filter(
            (item: any) => item.forum_id === targetForum,
        );

        setLeftItems(left);

        setRightItems(right);
    }, [sourceForum, targetForum, lembagas]);
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

    useEffect(() => {
        console.log(changedItems);
    }, [changedItems]);

    return (
        <>
            <Head title="Mapping Forum" />

            <AdminLayout>
                <div className="space-y-5">
                    <PageHeader
                        title="Mapping Forum"
                        subtitle="Pemetaan forum ke lembaga"
                    />
                    <div className="flex items-center justify-between">
                        <PageHeader
                            title="Mapping Forum"
                            subtitle="Pemetaan forum ke lembaga"
                        />
                    </div>
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
                                        Pilih <b>Forum Asal</b> dan{" "}
                                        <b>Forum Tujuan</b>.
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
                    <TableToolbar
                        filters={filters}
                        setParams={setParams}
                        hideAddButton
                        hideSort
                        searchPlaceholder="Cari nama atau kode lembaga..."
                    >
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
                    </TableToolbar>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white">
                            <div className="border-b p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-800">
                                        Forum Asal
                                    </h3>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                                        {filteredLeft.length} Lembaga
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <select
                                        value={sourceForum}
                                        onChange={(e) =>
                                            setSourceForum(e.target.value)
                                        }
                                        className="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                    >
                                        <option value="null">
                                            Belum Mapping
                                        </option>

                                        {forums.map((forum: any) => (
                                            <option
                                                key={forum.id}
                                                value={forum.id}
                                            >
                                                {forum.nama}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        value={searchLeft}
                                        onChange={(e) =>
                                            setSearchLeft(e.target.value)
                                        }
                                        placeholder="Cari lembaga..."
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
                                                    {item.kategori.nama}
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
                                            sourceForum === String(targetForum)
                                        }
                                        className="inline-flex items-center gap-2"
                                    >
                                        Tambahkan
                                        <ArrowRight size={16} />
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white">
                            <div className="border-b p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-800">
                                        Forum Tujuan
                                    </h3>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                                        {filteredRight.length} Lembaga
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <select
                                        value={targetForum}
                                        onChange={(e) =>
                                            setTargetForum(
                                                Number(e.target.value),
                                            )
                                        }
                                        className="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                    >
                                        {forums.map((forum: any) => (
                                            <option
                                                key={forum.id}
                                                value={forum.id}
                                            >
                                                {forum.nama}
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
                                                    {item.kategori.nama}
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
