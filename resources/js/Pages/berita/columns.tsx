import { Pencil, Trash2, Eye } from "lucide-react";

export const columns = (
    onEdit: (berita: any) => void,
    onDelete: (berita: any) => void,
) => [
    {
        id: "no",
        header: () => <div className="w-full text-center">No</div>,
        cell: ({ row }: any) => (
            <div className="text-center">{row.index + 1}</div>
        ),
    },

    {
        accessorKey: "judul",
        header: "Berita",
        cell: ({ row }: any) => {
            const berita = row.original;

            return (
                <div className="flex min-w-[280px] items-center gap-3">
                    {berita.gambar ? (
                        <img
                            src={`/storage/${berita.gambar}`}
                            alt={berita.judul}
                            className="h-14 w-20 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                            No Image
                        </div>
                    )}

                    <div className="min-w-0">
                        <p className="line-clamp-2 font-medium text-slate-800">
                            {berita.judul}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            {berita.date}
                        </p>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: "kategori",
        header: "Kategori",
        cell: ({ row }: any) => (
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
                {row.original.kategori}
            </span>
        ),
    },

    {
        accessorKey: "is_published",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }: any) => {
            const published = row.original.is_published;

            return (
                <div className="text-center">
                    <span
                        className={
                            published
                                ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                                : "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500"
                        }
                    >
                        {published ? "Dipublikasikan" : "Draft"}
                    </span>
                </div>
            );
        },
    },

    {
        id: "aksi",
        header: () => <div className="w-full text-center">Aksi</div>,

        cell: ({ row }: any) => {
            const berita = row.original;

            return (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() =>
                            window.open(
                                route("berita.show", berita.id),
                                "_blank",
                            )
                        }
                        className="flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs text-white transition hover:bg-sky-600"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        Lihat
                    </button>

                    <button
                        onClick={() => onEdit(berita)}
                        className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs text-white transition hover:bg-amber-600"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(berita)}
                        className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white transition hover:bg-red-600"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                    </button>
                </div>
            );
        },
    },
];
