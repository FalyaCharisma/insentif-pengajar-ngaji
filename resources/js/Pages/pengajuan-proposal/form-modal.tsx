import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { X } from "lucide-react";

import FormInput from "@/Components/forms/FormInput";
import FormSelect from "@/Components/forms/FormSelect";
import FormFile from "@/Components/forms/FormFile";

import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

type Props = {
    open: boolean;

    onClose: () => void;

    proposal?: any;

    lembaga: any[];
};

export default function FormModal({
    open,
    onClose,
    proposal,
    lembaga,
}: Props) {

    const isEdit = !!proposal;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        _method: "",

        lembaga_id: "",

        tahun: new Date().getFullYear(),

        jumlah_guru: 0,

        jumlah_siswa: 0,

        bukti_dukung: null as File | null,
    });

    useEffect(() => {

        if (proposal) {

            setData({
                _method: "",

                lembaga_id:
                    proposal.lembaga_id?.toString() || "",

                tahun: proposal.tahun || new Date().getFullYear(),

                jumlah_guru:
                    proposal.jumlah_guru || 0,

                jumlah_siswa:
                    proposal.jumlah_siswa || 0,

                bukti_dukung: null,
            });

        } else {

            reset();
        }

    }, [proposal, open]);

    const submit = (e: any) => {

        e.preventDefault();

        if (isEdit) {

            setData("_method", "put");

            post(
                route(
                    "pengajuan-proposal.update",
                    proposal.id,
                ),
                {
                    forceFormData: true,

                    onSuccess: () => {
                        onClose();
                    },
                },
            );

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
        <div
            className="
                fixed inset-0 z-50
                overflow-y-auto bg-black/40 p-6
            "
        >

            <div
                className="
                    flex min-h-full
                    items-center justify-center
                "
            >

                <div
                    className="
                        w-full max-w-3xl
                        rounded-2xl bg-white p-6
                    "
                >

                    {/* Header */}
                    <div
                        className="
                            mb-6 flex items-start
                            justify-between gap-4
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-xl font-semibold
                                    text-slate-800
                                "
                            >
                                {isEdit
                                    ? "Edit Proposal"
                                    : "Tambah Proposal"}
                            </h2>

                            <p
                                className="
                                    mt-1 text-sm
                                    text-slate-500
                                "
                            >
                                Isi form pengajuan proposal
                            </p>
                        </div>

                        <SecondaryButton
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                        </SecondaryButton>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submit}
                        className="space-y-5"
                    >

                        <div
                            className="
                                grid grid-cols-1
                                gap-4 md:grid-cols-2
                            "
                        >

                            {/* Lembaga */}
                            <div className="md:col-span-2">

                                <FormSelect
                                    label="Lembaga"

                                    value={data.lembaga_id}

                                    onChange={(e) =>
                                        setData(
                                            "lembaga_id",
                                            e.target.value,
                                        )
                                    }

                                    error={
                                        errors.lembaga_id
                                    }
                                >

                                    <option value="">
                                        Pilih lembaga
                                    </option>

                                    {lembaga.map(
                                        (item) => (

                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama}
                                            </option>
                                        ),
                                    )}
                                </FormSelect>
                            </div>

                            {/* Tahun */}
                            <FormInput
                                label="Tahun"

                                type="number"

                                value={data.tahun}

                                onChange={(e) =>
                                    setData(
                                        "tahun",
                                        Number(
                                            e.target.value,
                                        ),
                                    )
                                }

                                placeholder="Masukkan tahun"

                                error={errors.tahun}
                            />

                            {/* Jumlah Guru */}
                            <FormInput
                                label="Jumlah Guru"

                                type="number"

                                value={data.jumlah_guru}

                                onChange={(e) =>
                                    setData(
                                        "jumlah_guru",
                                        Number(
                                            e.target.value,
                                        ),
                                    )
                                }

                                placeholder="0"

                                error={
                                    errors.jumlah_guru
                                }
                            />

                            {/* Jumlah Siswa */}
                            <FormInput
                                label="Jumlah Siswa"

                                type="number"

                                value={data.jumlah_siswa}

                                onChange={(e) =>
                                    setData(
                                        "jumlah_siswa",
                                        Number(
                                            e.target.value,
                                        ),
                                    )
                                }

                                placeholder="0"

                                error={
                                    errors.jumlah_siswa
                                }
                            />

                            {/* File */}
                            <FormFile
                                label="Bukti Dukung"

                                onChange={(e) =>
                                    setData(
                                        "bukti_dukung",
                                        e.target
                                            .files?.[0] ||
                                            null,
                                    )
                                }

                                error={
                                    errors.bukti_dukung
                                }
                            />
                        </div>

                        {/* Footer */}
                        <div
                            className="
                                flex items-center
                                justify-end gap-3 pt-4
                            "
                        >

                            <SecondaryButton
                                type="button"

                                onClick={onClose}

                                disabled={processing}
                            >
                                Batal
                            </SecondaryButton>

                            <PrimaryButton
                                type="submit"

                                disabled={processing}
                            >
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