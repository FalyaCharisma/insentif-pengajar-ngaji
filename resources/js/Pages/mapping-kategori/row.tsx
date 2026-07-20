import SecondaryButton from "@/Components/SecondaryButton";
import { verifyConfirm } from "@/lib/alert";

type Props = {
    item: any;
    kategoriId: number;
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function MappingRow({
    item,
    kategoriId,
    selected,
    setSelected,
}: Props) {
    const checked = selected.includes(item.id);

    const isCurrent = Number(item.kategori_id) === Number(kategoriId);

    const isOther =
        item.kategori && Number(item.kategori_id) !== Number(kategoriId);

    const toggle = () => {
        if (checked) {
            setSelected(selected.filter((x) => x !== item.id));
        } else {
            setSelected([...selected, item.id]);
        }
    };

    const move = () => {
        verifyConfirm(
            "Pindahkan Kategori",

            `${item.nama} akan dipindahkan dari kategori ${item.kategori.nama} ke kategori yang dipilih.`,

            "Ya, Pindahkan",
        ).then((r) => {
            if (!r.isConfirmed) return;

            setSelected([...new Set([...selected, item.id])]);
        });
    };

    return (
        <tr
            className={`
                border-b border-slate-100
                transition-colors
                ${
                    checked
                        ? "bg-indigo-50 hover:bg-indigo-100"
                        : "hover:bg-slate-50/70"
                }
            `}
        >
            <td className="px-4 py-3 text-center">
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={isOther}
                    onChange={toggle}
                    className="
                        h-4
                        w-4
                        rounded
                        border-slate-300
                        text-indigo-600
                        focus:ring-indigo-500
                        disabled:opacity-50
                    "
                />
            </td>

            <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
                {item.kode}
            </td>

            <td
                className={`
                    px-4
                    py-3
                    text-sm
                    ${
                        checked
                            ? "font-semibold text-indigo-700"
                            : "text-slate-700"
                    }
                `}
            >
                {item.nama}
            </td>

            <td className="px-4 py-3 text-center">
                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-sky-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-sky-700
                    "
                >
                    {item.kategori?.nama ?? "-"}
                </span>
            </td>

            <td className="px-4 py-3 text-center">
                {!item.kategori && (
                    <span
                        className="
                            inline-flex
                            rounded-full
                            bg-emerald-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-emerald-700
                        "
                    >
                        Belum Mapping
                    </span>
                )}

                {isCurrent && (
                    <span
                        className="
                            inline-flex
                            rounded-full
                            bg-indigo-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-indigo-700
                        "
                    >
                        Kategori Ini
                    </span>
                )}

                {isOther && (
                    <span
                        className="
                            inline-flex
                            rounded-full
                            bg-amber-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-amber-700
                        "
                    >
                        Kategori Lain
                    </span>
                )}
            </td>

            <td className="px-4 py-3 text-center">
                {isOther && (
                    <button onClick={move} className="mx-auto flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white hover:bg-amber-600">Pindahkan</button>
                )}
            </td>
        </tr>
    );
}
