import {
    Eye,
    Pencil,
    Trash2,
    CheckCircle,
    CalendarDays,
} from "lucide-react";

export const columns = (
    role: string,
    onDetail: (row: any) => void,
    onEdit?: (row: any) => void,
    onDelete?: (row: any) => void,
    onVerifikasi?: (row: any) => void,
    onJadwal?: (row: any) => void,
) => {
    const isLembaga = role === "lembaga";
    const isDindik = role === "dindik";
    const isForum = role === "forum";

    /*
    |--------------------------------------------------------------------------
    | KOLOM KHUSUS DINDIK
    |--------------------------------------------------------------------------
    */

    if (isDindik) {
        return [
            // =========================================================
            // NO
            // =========================================================
            {
                id: "no",
                header: () => (
                    <div className="w-full text-center">
                        No
                    </div>
                ),
                cell: ({ row }: any) => (
                    <div className="text-center">
                        {row.index + 1}
                    </div>
                ),
            },

            // =========================================================
            // NAMA LEMBAGA
            // =========================================================
            {
                accessorKey: "nama",
                header: "Lembaga",
                cell: ({ row }: any) => (
                    <div className="min-w-[180px]">
                        <div className="font-semibold text-slate-800">
                            {row.original.nama ?? "-"}
                        </div>
                    </div>
                ),
            },

            // =========================================================
            // ALAMAT
            // =========================================================
            {
                id: "alamat",
                header: "Alamat",
                cell: ({ row }: any) => {
                    const profil = row.original.profil;

                    return (
                        <div className="max-w-xs">
                            <div className="font-medium text-slate-700">
                                {profil?.alamat ?? "-"}
                            </div>

                            <div className="mt-0.5 text-xs text-slate-500">
                                {[
                                    profil?.kelurahan &&
                                        `Kel. ${profil.kelurahan}`,
                                    profil?.kecamatan &&
                                        `Kec. ${profil.kecamatan}`,
                                ]
                                    .filter(Boolean)
                                    .join(" • ") || "-"}
                            </div>
                        </div>
                    );
                },
            },

            // =========================================================
            // JUMLAH KEGIATAN
            // =========================================================
            {
                accessorKey: "jumlah_kegiatan",
                header: () => (
                    <div className="text-center">
                        Jumlah Kegiatan
                    </div>
                ),
                cell: ({ row }: any) => (
                    <div className="text-center font-semibold text-slate-700">
                        {row.original.jumlah_kegiatan ?? 0}
                    </div>
                ),
            },

            // =========================================================
            // PENDING
            // =========================================================
            {
                accessorKey: "jumlah_pending",
                header: () => (
                    <div className="text-center">
                        Pending
                    </div>
                ),
                cell: ({ row }: any) => (
                    <div className="flex justify-center">
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                            {row.original.jumlah_pending ?? 0}
                        </span>
                    </div>
                ),
            },

            // =========================================================
            // DISETUJUI
            // =========================================================
            {
                accessorKey: "jumlah_disetujui",
                header: () => (
                    <div className="text-center">
                        Disetujui
                    </div>
                ),
                cell: ({ row }: any) => (
                    <div className="flex justify-center">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {row.original.jumlah_disetujui ?? 0}
                        </span>
                    </div>
                ),
            },

            // =========================================================
            // REVISI
            // =========================================================
            {
                accessorKey: "jumlah_revisi",
                header: () => (
                    <div className="text-center">
                        Revisi
                    </div>
                ),
                cell: ({ row }: any) => (
                    <div className="flex justify-center">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                            {row.original.jumlah_revisi ?? 0}
                        </span>
                    </div>
                ),
            },

            // =========================================================
            // DITOLAK
            // =========================================================
            {
                accessorKey: "jumlah_ditolak",
                header: () => (
                    <div className="text-center">
                        Ditolak
                    </div>
                ),
                cell: ({ row }: any) => (
                    <div className="flex justify-center">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            {row.original.jumlah_ditolak ?? 0}
                        </span>
                    </div>
                ),
            },

            // =========================================================
            // AKSI DINDIK
            // =========================================================
            {
                id: "aksi",
                header: () => (
                    <div className="w-full text-center">
                        Aksi
                    </div>
                ),
                cell: ({ row }: any) => {
                    const lembaga = row.original;

                    return (
                        <div className="flex justify-center gap-2">
                            {/* JADWAL KEGIATAN */}
                            <button
                                type="button"
                                onClick={() => onJadwal?.(lembaga)}
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    rounded-lg
                                    bg-cyan-600
                                    px-3
                                    py-1.5
                                    text-xs
                                    text-white
                                    transition
                                    hover:bg-cyan-700
                                "
                            >
                                <CalendarDays className="h-3.5 w-3.5" />
                                Jadwal
                            </button>

                            {/* LIHAT KEGIATAN */}
                            <button
                                type="button"
                                onClick={() => onDetail(row.original)}
                                className="inline-flex items-center gap-1 rounded-lg bg-indigo-100 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-200"
                            >
                                <Eye size={15} />
                                Lihat Kegiatan
                            </button>
                        </div>
                    );
                },
            },
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | KOLOM LEMBAGA DAN FORUM
    |--------------------------------------------------------------------------
    */

    return [
        // =========================================================
        // NO
        // =========================================================
        {
            id: "no",
            header: () => (
                <div className="w-full text-center">
                    No
                </div>
            ),
            cell: ({ row }: any) => (
                <div className="text-center">
                    {row.index + 1}
                </div>
            ),
        },

        // =========================================================
        // LEMBAGA - DINDIK / FORUM
        // =========================================================
        ...(isDindik || isForum
            ? [
                  {
                      accessorKey: "lembaga.nama",
                      header: "Lembaga",
                      cell: ({ row }: any) => (
                          <div>
                              {row.original.lembaga?.nama ?? "-"}
                          </div>
                      ),
                  },

                  {
                      id: "alamat",
                      header: "Alamat",
                      cell: ({ row }: any) => {
                          const profil =
                              row.original.lembaga?.profil;

                          return (
                              <div className="max-w-xs">
                                  <div className="font-medium text-slate-700">
                                      {profil?.alamat ?? "-"}
                                  </div>

                                  <div className="mt-0.5 text-xs text-slate-500">
                                      {[
                                          profil?.kelurahan &&
                                              `Kel. ${profil.kelurahan}`,
                                          profil?.kecamatan &&
                                              `Kec. ${profil.kecamatan}`,
                                      ]
                                          .filter(Boolean)
                                          .join(" • ") || "-"}
                                  </div>
                              </div>
                          );
                      },
                  },
              ]
            : []),

        // =========================================================
        // NAMA KEGIATAN
        // =========================================================
        {
            accessorKey: "nama_kegiatan",
            header: "Nama Kegiatan",
        },

        // =========================================================
        // TANGGAL KEGIATAN
        // =========================================================
        {
            accessorKey: "tanggal_mulai",
            header: "Tanggal Kegiatan",
            cell: ({ row }: any) => {
                const mulai =
                    row.original.tanggal_mulai;

                const selesai =
                    row.original.tanggal_selesai;

                if (!mulai) {
                    return "-";
                }

                const formatTanggal = (
                    tanggal: string,
                ) =>
                    new Date(
                        tanggal,
                    ).toLocaleDateString(
                        "id-ID",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        },
                    );

                if (
                    !selesai ||
                    mulai === selesai
                ) {
                    return formatTanggal(mulai);
                }

                return (
                    <div>
                        {formatTanggal(mulai)}
                        {" - "}
                        {formatTanggal(selesai)}
                    </div>
                );
            },
        },

        // =========================================================
        // STATUS
        // =========================================================
        {
            accessorKey: "status",
            header: () => (
                <div className="w-full text-center">
                    Status
                </div>
            ),
            cell: ({ row }: any) => {
                const status =
                    row.original.status;

                const statusConfig: Record<
                    string,
                    {
                        label: string;
                        className: string;
                    }
                > = {
                    pending: {
                        label: "Menunggu Verifikasi",
                        className:
                            "bg-yellow-100 text-yellow-700",
                    },
                    verified: {
                        label: "Terverifikasi",
                        className:
                            "bg-emerald-100 text-emerald-700",
                    },
                    revision: {
                        label: "Perlu Revisi",
                        className:
                            "bg-orange-100 text-orange-700",
                    },
                    rejected: {
                        label: "Ditolak",
                        className:
                            "bg-red-100 text-red-700",
                    },
                };

                const config =
                    statusConfig[status] ?? {
                        label: status ?? "-",
                        className:
                            "bg-slate-100 text-slate-600",
                    };

                return (
                    <div className="flex justify-center">
                        <span
                            className={`
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                ${config.className}
                            `}
                        >
                            {config.label}
                        </span>
                    </div>
                );
            },
        },

        // =========================================================
        // AKSI LEMBAGA / FORUM
        // =========================================================
        {
            id: "aksi",
            header: () => (
                <div className="w-full text-center">
                    Aksi
                </div>
            ),
            cell: ({ row }: any) => {
                const kegiatan = row.original;

                return (
                    <div className="flex justify-center gap-2">
                        {/* DETAIL */}
                        <button
                            type="button"
                            onClick={() =>
                                onDetail(kegiatan)
                            }
                            className="
                                flex
                                items-center
                                gap-1
                                rounded-lg
                                bg-sky-600
                                px-3
                                py-1.5
                                text-xs
                                text-white
                                transition
                                hover:bg-sky-700
                            "
                        >
                            <Eye className="h-3.5 w-3.5" />
                            Detail
                        </button>

                        {/* EDIT - LEMBAGA */}
                        {isLembaga &&
                            ![
                                "verified",
                                "rejected",
                            ].includes(
                                kegiatan.status,
                            ) && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onEdit?.(
                                            kegiatan,
                                        )
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                        rounded-lg
                                        bg-amber-500
                                        px-3
                                        py-1.5
                                        text-xs
                                        text-white
                                        transition
                                        hover:bg-amber-600
                                    "
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit
                                </button>
                            )}

                        {/* HAPUS - LEMBAGA */}
                        {isLembaga &&
                            ![
                                "verified",
                                "rejected",
                            ].includes(
                                kegiatan.status,
                            ) && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onDelete?.(
                                            kegiatan,
                                        )
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                        rounded-lg
                                        bg-red-600
                                        px-3
                                        py-1.5
                                        text-xs
                                        text-white
                                        transition
                                        hover:bg-red-700
                                    "
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Hapus
                                </button>
                            )}

                        {/* VERIFIKASI - FORUM */}
                        {isForum &&
                            kegiatan.status !==
                                "verified" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onVerifikasi?.(
                                            kegiatan,
                                        )
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                        rounded-lg
                                        bg-indigo-600
                                        px-3
                                        py-1.5
                                        text-xs
                                        text-white
                                        transition
                                        hover:bg-indigo-700
                                    "
                                >
                                    <CheckCircle className="h-3.5 w-3.5" />
                                    Verifikasi
                                </button>
                            )}
                    </div>
                );
            },
        },
    ];
};