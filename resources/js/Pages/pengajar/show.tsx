import { Head, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

import AdminLayout from "@/layouts/app-layout";

import PageHeader from "@/Components/PageHeader";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

import { ArrowLeft } from "lucide-react";

import { useAuth } from "@/lib/auth";

import StatusCard from "./status-card";
import InformasiCard from "./informasi-card";
import PendidikanCard from "./pendidikan-card";
import AlamatCard from "./alamat-card";
import RekeningCard from "./rekening-card";
import VerifikasiModal from "./verifikasi-modal";
import { successAlert } from "@/lib/alert";

type Props = {
    pengajar: any;
};

export default function Show({ pengajar }: Props) {
    const { hasRole } = useAuth();

    const canVerify =
        hasRole("superadmin") ||
        hasRole("forum");

    const [openVerifikasi, setOpenVerifikasi] = useState(false);

    const { flash } = usePage<{
        flash: {
            success?: string;
            error?: string;
        };
    }>().props;

    useEffect(() => {
        if (flash?.success) {
            successAlert(flash.success);
        }
    }, [flash]);

    return (
        <>
            <Head title="Detail Pengajar" />

            <AdminLayout>
                <div className="space-y-4">

                    <PageHeader
                        title="Detail Pengajar"
                        subtitle="Informasi lengkap data pengajar"
                    />

                    {/* Status */}
                    <StatusCard pengajar={pengajar} />

                    {/* Data Diri & Alamat */}
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

                        <InformasiCard
                            pengajar={pengajar}
                        />

                        <AlamatCard
                            pengajar={pengajar}
                        />

                    </div>

                    {/* Pendidikan & Rekening */}
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

                        <PendidikanCard
                            pengajar={pengajar}
                        />

                        <RekeningCard
                            pengajar={pengajar}
                        />

                    </div>

                    <div className="flex items-center justify-between pt-2">

                        <SecondaryButton
                            type="button"
                            onClick={() =>
                                router.visit(route("pengajar.index"))
                            }
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </SecondaryButton>

                        {canVerify && (
                            <PrimaryButton
                                type="button"
                                onClick={() =>
                                    setOpenVerifikasi(true)
                                }
                            >
                                Verifikasi Pengajar
                            </PrimaryButton>
                        )}

                    </div>

                    <VerifikasiModal
                        open={openVerifikasi}
                        onClose={() => setOpenVerifikasi(false)}
                        pengajar={pengajar}
                    />

                </div>
            </AdminLayout>
        </>
    );
}