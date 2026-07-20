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
    return (
        <>
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
            <FormInput
                type="number"
                label="Tahun Berdiri"
                value={data.tahun_berdiri}
                onChange={(e) =>
                    setData(
                        "tahun_berdiri",
                        e.target.value
                    )
                }
                disabled={!canEdit}
                error={errors.tahun_berdiri}
                placeholder="Contoh: 2015"
                required
            />
        </>
    );
}