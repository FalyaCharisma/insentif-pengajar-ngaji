import FormInput from "@/Components/forms/FormInput";

type Props = {
    data: any;
    setData: any;
    errors: any;
    canEdit: boolean;
};

export default function RekeningCard({
    data,
    setData,
    errors,
    canEdit,
}: Props) {
    return (
        <>
            <div className="space-y-2">
                {/* Nama Bank */}
                <FormInput
                    label="Nama Bank"
                    value={data.nama_bank}
                    onChange={(e) =>
                        setData("nama_bank", e.target.value)
                    }
                    disabled={!canEdit}
                    error={errors.nama_bank}
                    placeholder="Contoh: Bank Jatim"
                    required
                />

                {/* Nomor Rekening */}
                <FormInput
                    label="Nomor Rekening"
                    value={data.nomor_rekening}
                    onChange={(e) =>
                        setData("nomor_rekening", e.target.value)
                    }
                    disabled={!canEdit}
                    error={errors.nomor_rekening}
                    placeholder="Masukkan nomor rekening"
                    required
                />

                {/* Atas Nama */}
                <div className="md:col-span-2">
                    <FormInput
                        label="Atas Nama Rekening"
                        value={data.atas_nama_rekening}
                        onChange={(e) =>
                            setData(
                                "atas_nama_rekening",
                                e.target.value
                            )
                        }
                        disabled={!canEdit}
                        error={errors.atas_nama_rekening}
                        placeholder="Nama pemilik rekening"
                        required
                    />
                </div>
            </div>
        </>
    );
}