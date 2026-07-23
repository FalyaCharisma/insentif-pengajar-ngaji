import CardSection from "@/Components/CardSection";

type Props = {
    pengajar: any;
};

const DetailItem = ({
    label,
    value,
}: {
    label: string;
    value?: string | number | null;
}) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);

export default function PendidikanCard({ pengajar }: Props) {
    return (
        <CardSection title="Pendidikan">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <DetailItem
                    label="Pendidikan Terakhir"
                    value={pengajar.pendidikan_terakhir}
                />

                <DetailItem
                    label="Jurusan"
                    value={pengajar.jurusan}
                />

                <DetailItem
                    label="Sekolah / Universitas"
                    value={pengajar.sekolah_universitas}
                />

                <DetailItem
                    label="Tahun Lulus"
                    value={pengajar.tahun_lulus}
                />
            </div>
        </CardSection>
    );
}