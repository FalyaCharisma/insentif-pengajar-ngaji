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

export default function InformasiCard({ pengajar }: Props) {
    return (
        <CardSection title="Data Diri">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Pas Foto */}
                <div className="flex justify-center">
                    {pengajar.pas_foto ? (
                        <img
                            src={`/storage/pengajar/${pengajar.pas_foto}`}
                            alt={pengajar.nama}
                            className="h-52 w-40 rounded-lg border object-cover shadow-sm"
                        />
                    ) : (
                        <div className="flex h-52 w-40 items-center justify-center rounded-lg border border-dashed text-sm text-gray-400">
                            Tidak ada foto
                        </div>
                    )}
                </div>

                {/* Informasi */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-3">
                    <DetailItem
                        label="NIK"
                        value={pengajar.nik}
                    />

                    <DetailItem
                        label="Nama"
                        value={pengajar.nama}
                    />

                    <DetailItem
                        label="Tempat Lahir"
                        value={pengajar.tempat_lahir}
                    />

                    <DetailItem
                        label="Tanggal Lahir"
                        value={
                            pengajar.tgl_lahir
                                ? new Date(
                                      pengajar.tgl_lahir
                                  ).toLocaleDateString("id-ID")
                                : "-"
                        }
                    />

                    <DetailItem
                        label="Jenis Kelamin"
                        value={pengajar.jk}
                    />

                    <DetailItem
                        label="Agama"
                        value={pengajar.agama}
                    />

                    <DetailItem
                        label="No. HP"
                        value={pengajar.no_hp}
                    />

                    <DetailItem
                        label="Jabatan"
                        value={pengajar.jabatan}
                    />

                    <DetailItem
                        label="Lembaga"
                        value={pengajar.lembaga?.nama}
                    />
                </div>
            </div>
        </CardSection>
    );
}