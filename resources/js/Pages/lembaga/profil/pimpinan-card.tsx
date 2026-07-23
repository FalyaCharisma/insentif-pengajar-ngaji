import FormInput from "@/Components/forms/FormInput";

type Props = {
    data: any;
    setData: any;
    errors: any;
    canEdit: boolean;
};

export default function PimpinanCard({
    data,
    setData,
    errors,
    canEdit,
}: Props) {
    return (
        <>
            <div className="space-y-2">
                {/* Nama Pimpinan */}
                <FormInput
                    label="Nama Pimpinan"
                    value={data.nama_pimpinan}
                    onChange={(e) =>
                        setData(
                            "nama_pimpinan",
                            e.target.value
                        )
                    }
                    disabled={!canEdit}
                    error={errors.nama_pimpinan}
                    placeholder="Masukkan nama pimpinan"
                    required
                />

                {/* Jabatan Pimpinan */}
                <FormInput
                    label="Jabatan Pimpinan"
                    value={data.jabatan_pimpinan}
                    onChange={(e) =>
                        setData(
                            "jabatan_pimpinan",
                            e.target.value
                        )
                    }
                    disabled={!canEdit}
                    error={errors.jabatan_pimpinan}
                    placeholder="Contoh: Kepala TPQ"
                    required
                />
            </div>
        </>
    );
}