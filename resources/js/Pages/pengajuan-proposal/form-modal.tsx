import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { X } from "lucide-react";

import FormInput from "@/Components/forms/FormInput";
import FormFile from "@/Components/forms/FormFile";

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;

    onClose: () => void;

    proposal?: any;

    lembaga: any;

    periode: any;

    jumlahSiswa: number;

    estimasiKuota: number;
};

export default function FormModal({
    open,
    onClose,
    proposal,
    lembaga,
    periode,
    jumlahSiswa,
    estimasiKuota,
}: Props) {
    const isEdit = !!proposal;

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: "",

        periode_id: periode?.id?.toString() || "",

        jumlah_guru: proposal?.jumlah_guru?.toString() || "",

        bukti_dukung: null as File | null,
    });

    useEffect(() => {
        if (!open) return;

        if (proposal) {
            setData({
                _method: "",

                periode_id: proposal.periode_id?.toString() || "",

                jumlah_guru: proposal.jumlah_guru?.toString() || "",

                bukti_dukung: null,
            });
        } else {
            reset();

            setData({
                _method: "",

                periode_id: periode?.id?.toString() || "",

                jumlah_guru: "",

                bukti_dukung: null,
            });
        }
    }, [proposal, open, periode]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            setData("_method", "put");

            post(route("pengajuan-proposal.update", proposal.id), {
                forceFormData: true,

                onSuccess: () => {
                    onClose();
                },
            });

            return;
        }

        post(route("pengajuan-proposal.store"), {
            forceFormData: true,

            onSuccess: () => {
                onClose();
            },
        });
    };

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-6">
            <div className="flex min-h-full items-center justify-center">
                <div className="w-full max-w-3xl rounded-2xl bg-white p-6">
                    {/* Header */}
                    <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                {isEdit
                                    ? "Edit Pengajuan Proposal"
                                    : "Tambah Pengajuan Proposal"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Lengkapi data pengajuan proposal.
                            </p>
                        </div>

                        <SecondaryButton onClick={onClose}>
                            <X className="h-4 w-4" />
                        </SecondaryButton>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Lembaga */}
                            <FormInput
                                label="Lembaga"
                                value={lembaga?.nama ?? "-"}
                                disabled
                            />

                            {/* Periode */}
                            <FormInput
                                label="Periode"
                                value={periode?.tahun?.toString() ?? "-"}
                                disabled
                            />
                            {errors.periode_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.periode_id}
                                </p>
                            )}

                            {/* Jumlah Siswa */}
                            <FormInput
                                label="Jumlah Siswa"
                                value={jumlahSiswa.toString()}
                                disabled
                            />

                            {/* Estimasi Kuota */}
                            <FormInput
                                label="Estimasi Kuota Penerima Insentif"
                                value={estimasiKuota.toString()}
                                disabled
                            />

                            {/* Guru Diajukan */}
                            <FormInput
                                label="Jumlah Guru Diajukan"
                                type="number"
                                value={data.jumlah_guru}
                                onChange={(e) =>
                                    setData("jumlah_guru", e.target.value)
                                }
                                placeholder="Masukkan jumlah guru"
                                error={errors.jumlah_guru}
                            />

                            {/* Bukti Dukung */}
                            <FormFile
                                label="Bukti Dukung"
                                onChange={(e) =>
                                    setData(
                                        "bukti_dukung",
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                                fileName={
                                    data.bukti_dukung instanceof File
                                        ? data.bukti_dukung.name
                                        : ""
                                }
                                currentFile={proposal?.bukti_dukung}
                                error={errors.bukti_dukung}
                            />
                        </div>

                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                            <p className="text-sm text-amber-700">
                                <strong>Catatan:</strong> Jumlah guru yang
                                diajukan tidak boleh melebihi estimasi kuota
                                yang telah dihitung oleh sistem.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <SecondaryButton
                                type="button"
                                onClick={onClose}
                                disabled={processing}
                            >
                                Batal
                            </SecondaryButton>

                            <PrimaryButton type="submit" disabled={processing}>
                                {processing
                                    ? "Menyimpan..."
                                    : isEdit
                                      ? "Update"
                                      : "Simpan"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
