import { X, UserRound } from "lucide-react";

type Pengajar = {
    id: number;
    nama: string;
    nik: string;
    tempat_lahir: string;
    tgl_lahir: string;
    jk: string | null;
    jabatan: string | null;
    pendidikan_terakhir: string | null;
    jurusan: string | null;
    sekolah_universitas: string | null;
    tahun_lulus: number | null;
    agama: string | null;
    alamat: string | null;
    kelurahan: string | null;
    kecamatan: string | null;
    kabkota: string | null;
    provinsi: string | null;
    no_hp: string | null;
    bank: string | null;
    no_rekening: string | null;
    no_bpjs: string | null;
    pas_foto: string | null;
    status_insentif: string | null;
    status: string | null;
};

type Props = {
    pengajar: Pengajar | null;
    onClose: () => void;
};

function DetailItem({
    label,
    value,
}: {
    label: string;
    value: string | number | null | undefined;
}) {
    return (
        <div>
            <p className="text-xs font-medium text-slate-400">{label}</p>

            <p className="mt-1 text-sm font-medium text-slate-700">
                {value || "-"}
            </p>
        </div>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="mt-4">
            <h3 className="mb-2.5 text-sm font-semibold text-slate-800">
                {title}
            </h3>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
                {children}
            </div>
        </section>
    );
}

export default function DetailPengajarModal({ pengajar, onClose }: Props) {
    if (!pengajar) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
            onClick={onClose}
        >
            <div
                className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between bg-white px-5 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Detail Pengajar
                        </h2>

                        <p className="mt-0.5 text-sm text-slate-500">
                            Informasi lengkap pengajar
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="overflow-y-auto px-5 pb-5">
                    {/* ================= PROFILE ================= */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-4">
                            {/* FOTO */}
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                                {pengajar.pas_foto ? (
                                    <img
                                        src={`/storage/${pengajar.pas_foto}`}
                                        alt={pengajar.nama}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <UserRound className="h-9 w-9 text-slate-300" />
                                    </div>
                                )}
                            </div>

                            {/* INFORMASI NAMA */}
                            <div>
                                <h3 className="text-xl font-semibold text-slate-800">
                                    {pengajar.nama}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    {pengajar.jabatan || "Pengajar"}
                                </p>

                                <div className="mt-2">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                            pengajar.status === "aktif"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {pengajar.status === "aktif"
                                            ? "Pengajar Aktif"
                                            : pengajar.status || "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= DATA PRIBADI ================= */}
                    <Section title="Data Pribadi">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                            <DetailItem label="NIK" value={pengajar.nik} />

                            <DetailItem
                                label="Jenis Kelamin"
                                value={pengajar.jk}
                            />

                            <DetailItem
                                label="Tempat Lahir"
                                value={pengajar.tempat_lahir}
                            />

                            <DetailItem
                                label="Tanggal Lahir"
                                value={pengajar.tgl_lahir}
                            />

                            <DetailItem label="Agama" value={pengajar.agama} />

                            <DetailItem label="No. HP" value={pengajar.no_hp} />
                        </div>
                    </Section>

                    {/* ================= PENDIDIKAN & PEKERJAAN ================= */}
                    <Section title="Pendidikan & Pekerjaan">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3">
                            <DetailItem
                                label="Jabatan"
                                value={pengajar.jabatan}
                            />

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
                    </Section>

                    {/* ================= ALAMAT ================= */}
                    <Section title="Alamat">
                        <div className="space-y-4">
                            <DetailItem
                                label="Alamat"
                                value={pengajar.alamat}
                            />

                            <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
                                <DetailItem
                                    label="Kelurahan"
                                    value={pengajar.kelurahan}
                                />

                                <DetailItem
                                    label="Kecamatan"
                                    value={pengajar.kecamatan}
                                />

                                <DetailItem
                                    label="Kabupaten / Kota"
                                    value={pengajar.kabkota}
                                />

                                <DetailItem
                                    label="Provinsi"
                                    value={pengajar.provinsi}
                                />
                            </div>
                        </div>
                    </Section>

                    {/* ================= DATA INSENTIF ================= */}
                    <Section title="Data Insentif">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                            <DetailItem
                                label="Status Insentif"
                                value={pengajar.status_insentif}
                            />

                            <DetailItem label="Bank" value={pengajar.bank} />

                            <DetailItem
                                label="No. Rekening"
                                value={pengajar.no_rekening}
                            />

                            <DetailItem
                                label="No. BPJS"
                                value={pengajar.no_bpjs}
                            />
                        </div>
                    </Section>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="flex justify-end border-t border-slate-200 bg-white px-5 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
