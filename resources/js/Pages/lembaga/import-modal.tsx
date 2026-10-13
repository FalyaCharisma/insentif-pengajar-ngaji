import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Download } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function ImportModal({ open, onClose }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<{ file: File | null }>({ file: null });

    const close = () => {
        clearErrors();
        reset();
        onClose();
    };

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        post(route("lembaga.import"), {
            forceFormData: true,
            onSuccess: close,
        });
    };

    return (
        <Modal show={open} onClose={close} maxWidth="lg">
            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Import Lembaga
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Import digunakan untuk mengimpor data lembaga dari file Excel atau CSV.
                        File harus memiliki kolom nama forum dan nama lembaga.
                        Forum harus sudah terdaftar dan aktif.
                    </p>
                    <a
                        href={route("lembaga.import-template")}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-900"
                    >
                        <Download size={16} />
                        Unduh template Excel
                    </a>
                </div>

                <div className="mb-5 overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-700">
                            <tr>
                                <th className="px-4 py-2 font-semibold">Nama Forum</th>
                                <th className="px-4 py-2 font-semibold">Nama Lembaga</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-slate-600">
                                <td className="px-4 py-2">Forum TPQ Kediri</td>
                                <td className="px-4 py-2">TPQ Al-Ikhlas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="lembaga-import-file"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            File Excel atau CSV
                        </label>
                        <input
                            id="lembaga-import-file"
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={(event) =>
                                setData("file", event.currentTarget.files?.[0] ?? null)
                            }
                            className="block w-full rounded-lg border border-slate-300 bg-white text-sm text-slate-700 file:mr-4 file:border-0 file:bg-slate-100 file:px-4 file:py-3 file:text-sm file:font-medium"
                        />
                        {errors.file && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.file}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <SecondaryButton
                            type="button"
                            onClick={close}
                            disabled={processing}
                        >
                            Batal
                        </SecondaryButton>
                        <PrimaryButton
                            type="submit"
                            disabled={processing || !data.file}
                        >
                            {processing ? "Mengimpor..." : "Import"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}