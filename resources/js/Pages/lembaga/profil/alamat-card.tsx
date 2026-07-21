import FormAsyncSelect from "@/Components/forms/FormAsyncSelect";
import FormTextArea from "@/Components/forms/FormTextArea";
import { useAlamat } from "@/hooks/useAlamat";
import FormInput from "@/Components/forms/FormInput";

type Props = {
    data: any;
    setData: any;
    errors: any;
    canEdit: boolean;
};

export default function AlamatCard({
    data,
    setData,
    errors,
    canEdit,
}: Props) {

    const {
        searchKecamatanKotaKediri,
        searchKelurahan,
    } = useAlamat();

    return (
        <>
            <FormAsyncSelect
                label="Provinsi"
                value={data.provinsi}
                onChange={() => {}}
                loadOptions={async () => []}
                disabled
            />

            <FormAsyncSelect
                label="Kabupaten / Kota"
                value={data.kabupaten}
                onChange={() => {}}
                loadOptions={async () => []}
                disabled
            />

            <FormAsyncSelect
                label="Kecamatan"
                value={data.kecamatan}
                onChange={(value: any) => {
                    setData("kecamatan", value);
                    setData("kelurahan", null);
                }}
                loadOptions={searchKecamatanKotaKediri}
                disabled={!canEdit}
                error={errors.kecamatan}
                required
            />

            <FormAsyncSelect
                key={data.kecamatan?.value}
                label="Kelurahan"
                value={data.kelurahan}
                onChange={(value: any) =>
                    setData("kelurahan", value)
                }
                loadOptions={(inputValue) =>
                    searchKelurahan(
                        data.kecamatan?.value ?? "",
                        inputValue
                    )
                }
                disabled={!canEdit}
                required
            />

            <FormInput
                label="Kode Pos"
                value={data.kode_pos}
                onChange={(e) =>
                    setData("kode_pos", e.target.value)
                }
                disabled={!canEdit}
                error={errors.kode_pos}
                required
            />

        
            <FormTextArea
                label="Alamat Lengkap"
                value={data.alamat}
                onChange={(e) =>
                    setData("alamat", e.target.value)
                }
                disabled={!canEdit}
                error={errors.alamat}
                rows={4}
                required
            />
        </>
    );
}