import CardSection from "@/Components/CardSection";

type Props = {
    pengajar: any;
};

const DetailItem = ({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);

export default function AlamatCard({ pengajar }: Props) {
    return (
        <CardSection title="Alamat">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <DetailItem
                    label="Provinsi"
                    value={pengajar.provinsi}
                />

                <DetailItem
                    label="Kabupaten / Kota"
                    value={pengajar.kabkota}
                />

                <DetailItem
                    label="Kecamatan"
                    value={pengajar.kecamatan}
                />

                <DetailItem
                    label="Kelurahan"
                    value={pengajar.kelurahan}
                />
            </div>

            <div className="mt-5">
                <p className="text-sm text-gray-500">
                    Alamat Lengkap
                </p>

                <div className="mt-2 rounded-lg border bg-gray-50 p-4 min-h-[80px]">
                    {pengajar.alamat ? (
                        <p>{pengajar.alamat}</p>
                    ) : (
                        <p className="italic text-gray-400">
                            Belum ada alamat.
                        </p>
                    )}
                </div>
            </div>
        </CardSection>
    );
}