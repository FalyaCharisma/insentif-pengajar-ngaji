import FormInput from "@/Components/forms/FormInput";
import FormSelect2 from "@/Components/forms/FormSelect2";
import { Lembaga } from "@/types/lembaga";

type Props = {
    lembaga: Lembaga;
    kategori: any[];

    data: any;
    setData: any;
    errors: any;

    canEdit: boolean;
};

export default function InformasiCard({
    lembaga,
    kategori,
    data,
    setData,
    errors,
    canEdit,
}: Props) {

    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className="space-y-2">
                {/* Kategori */}
                <FormInput
                    label="Kategori"
                    value={lembaga.kategori?.nama ?? "-"}
                    disabled
                />

                {/* Kode */}
                <FormInput
                    label="Kode Lembaga"
                    value={lembaga.kode}
                    disabled
                />

                {/* Nama */}
                <FormInput
                    label="Nama Lembaga"
                    value={lembaga.nama}
                    disabled
                />

                {/* Nomor Registrasi */}
                <FormInput
                    label="Nomor Registrasi"
                    value={data.nomor_registrasi}
                    onChange={(e) =>
                        setData(
                            "nomor_registrasi",
                            e.target.value
                        )
                    }
                    disabled={!canEdit}
                    error={errors.nomor_registrasi}
                    placeholder="Masukkan nomor registrasi"
                    required
                />

                {/* Tahun Berdiri */}
                <FormSelect2
                    label="Tahun Berdiri"
                    value={data.tahun_berdiri}
                    options={Array.from(
                        { length: new Date().getFullYear() - 1899 },
                        (_, i) => {
                            const year = new Date().getFullYear() - i;

                            return {
                                value: year.toString(),
                                label: year.toString(),
                            };
                        }
                    )}
                    onChange={(value) => setData("tahun_berdiri", value)}
                    disabled={!canEdit}
                />
            </div>
        </>
    );
}