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

export default function RekeningCard({ pengajar }: Props) {
    return (
        <CardSection title="Data Rekening">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <DetailItem
                    label="Bank"
                    value={pengajar.bank}
                />

                <DetailItem
                    label="Nomor Rekening"
                    value={pengajar.no_rekening}
                />

                <DetailItem
                    label="Nomor BPJS"
                    value={pengajar.no_bpjs}
                />
            </div>
        </CardSection>
    );
}