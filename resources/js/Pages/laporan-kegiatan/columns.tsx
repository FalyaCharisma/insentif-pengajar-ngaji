import {
    Eye,
    Pencil,
    Trash2,
    CheckCircle,
} from "lucide-react";

export const columns = (
    role: string,
    onDetail: (row: any) => void,
    onEdit?: (row: any) => void,
    onDelete?: (row: any) => void,
    onVerifikasi?: (row: any) => void,
) => [
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
    // LEMBAGA - KHUSUS DINDIK / FORUM
    // =========================================================
    ...(role === "dindik" || role === "forum"
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

              // =================================================
              // ALAMAT - KHUSUS DINDIK / FORUM
              // =================================================
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

            // Jika hanya satu hari
            if (
                !selesai ||
                mulai === selesai
            ) {
                return formatTanggal(mulai);
            }

            // Jika lebih dari satu hari
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
    // AKSI
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

            const isLembaga =
                role === "lembaga";

            const isDindik =
                role === "dindik";

            const isForum =
                role === "forum";

            return (
                <div className="flex justify-center gap-2">

                    {/* =========================================
                        DETAIL
                    ========================================= */}
                    <button
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

                    {/* =========================================
                        EDIT - LEMBAGA
                    ========================================= */}
                    {isLembaga &&
                        !["verified", "rejected"].includes(
                            kegiatan.status,
                        ) && (
                            <button
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

                    {/* =========================================
                        HAPUS - LEMBAGA
                    ========================================= */}
                    {isLembaga &&
                        !["verified", "rejected"].includes(
                            kegiatan.status,
                        ) && (
                            <button
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

                    {/* =========================================
                        VERIFIKASI - DINDIK / FORUM
                    ========================================= */}
                    {(isDindik || isForum) &&
                        kegiatan.status !==
                            "verified" && (
                            <button
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