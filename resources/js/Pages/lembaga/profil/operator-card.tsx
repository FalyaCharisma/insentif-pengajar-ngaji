import FormInput from "@/Components/forms/FormInput";

type Props = {
    data: any;
    setData: any;
    errors: any;
    canEdit: boolean;
};

export default function OperatorCard({
    data,
    setData,
    errors,
    canEdit,
}: Props) {
    return (
        <>
            <div className="space-y-2">
                {/* Nama Operator */}
                <FormInput
                    label="Nama Operator"
                    value={data.nama_operator}
                    onChange={(e) =>
                        setData("nama_operator", e.target.value)
                    }
                    disabled={!canEdit}
                    error={errors.nama_operator}
                    placeholder="Masukkan nama operator"
                    required
                />

                {/* No HP Operator */}
                <FormInput
                    label="Nomor HP Operator"
                    value={data.no_hp_operator}
                    onChange={(e) =>
                        setData("no_hp_operator", e.target.value)
                    }
                    disabled={!canEdit}
                    error={errors.no_hp_operator}
                    placeholder="08xxxxxxxxxx"
                    required
                />
            </div>
        </>
    );
}