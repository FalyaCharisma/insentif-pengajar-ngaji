import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

import Modal from "@/Components/Modal";

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

import InputError from "@/Components/ui/InputError";
import { PengajuanInsentif, Proposal } from "@/types/pengajuan-insentif";



interface Props {
    open: boolean;
    onClose: () => void;
    proposal: Proposal | null;
}

export default function FormModal({ open, onClose, proposal }: Props) {
    const [selected, setSelected] = useState<PengajuanInsentif | null>(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        catatan: "",
    });

    useEffect(() => {
        reset();
        setSelected(null);
    }, [proposal]);

    if (!proposal) return null;

    const verify = (item: PengajuanInsentif) => {
        patch(route("pengajuan-insentif.verify", item.id), {
            preserveScroll: true,
            onSuccess: () => {
                setSelected(null);
            },
        });
    };

    const revision = () => {
        if (!selected) return;

        patch(route("pengajuan-insentif.reject", selected.id), {
            preserveScroll: true,
            onSuccess: () => {
                setSelected(null);
                reset();
            },
        });
    };

    return (
        <Modal show={open}  onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-bold mb-1">
                    Detail Pengajuan Insentif
                </h2>

                <p className="text-sm text-slate-500 mb-6">
                    {proposal.lembaga.nama}
                    {" - "}
                    {proposal.periode.tahun}
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Nama</th>

                                <th className="text-left py-2">NIK</th>

                                <th className="text-left py-2">Status</th>

                                <th className="text-center py-2">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {proposal.pengajuan_insentif.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="py-3">
                                        {item.pengajar.nama}
                                    </td>

                                    <td>{item.pengajar.nik}</td>

                                    <td>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs

                                                ${
                                                    item.status === "verified"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status ===
                                                            "revision"
                                                          ? "bg-yellow-100 text-yellow-700"
                                                          : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="text-center space-x-2">
                                        <PrimaryButton
                                            type="button"
                                            onClick={() => verify(item)}
                                            disabled={processing}
                                        >
                                            Verifikasi
                                        </PrimaryButton>

                                        <SecondaryButton
                                            type="button"
                                            onClick={() => setSelected(item)}
                                        >
                                            Revisi
                                        </SecondaryButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selected && (
                    <div className="mt-8 border-t pt-6">
                        <h3 className="font-semibold mb-3">Catatan Revisi</h3>

                        <textarea
                            className="w-full rounded-xl border"
                            rows={4}
                            value={data.catatan}
                            onChange={(e) => setData("catatan", e.target.value)}
                        />

                        <InputError message={errors.catatan} />

                        <div className="flex justify-end gap-3 mt-5">
                            <SecondaryButton
                                type="button"
                                onClick={() => {
                                    setSelected(null);
                                    reset();
                                }}
                            >
                                Batal
                            </SecondaryButton>

                            <PrimaryButton
                                type="button"
                                onClick={revision}
                                disabled={processing}
                            >
                                Simpan Revisi
                            </PrimaryButton>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
