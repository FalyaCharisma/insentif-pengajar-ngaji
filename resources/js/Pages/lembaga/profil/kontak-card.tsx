import FormInput from "@/Components/forms/FormInput";

type Props = {
    data: any;
    setData: any;
    errors: any;
    canEdit: boolean;
};

export default function KontakCard({
    data,
    setData,
    errors,
    canEdit,
}: Props) {
    return (
        <>
            <div className="space-y-2">
                {/* Telepon */}
                <FormInput
                    label="Nomor Telepon"
                    value={data.telepon}
                    onChange={(e) =>
                        setData("telepon", e.target.value)
                    }
                    disabled={!canEdit}
                    error={errors.telepon}
                    placeholder="Masukkan nomor telepon"
                    required
                />

                {/* Email */}
                <FormInput
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(e) =>
                        setData("email", e.target.value)
                    }
                    disabled={!canEdit}
                    error={errors.email}
                    placeholder="Masukkan email"
                    required
                />

                {/* Website */}
                <div className="md:col-span-2">
                    <FormInput
                        label="Website"
                        value={data.website}
                        onChange={(e) =>
                            setData("website", e.target.value)
                        }
                        disabled={!canEdit}
                        error={errors.website}
                        placeholder="https://..."
                    />
                </div>
            </div>
        </>
    );
}