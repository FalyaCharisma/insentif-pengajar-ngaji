import React from "react";
import { Head, router } from "@inertiajs/react";
import { ArrowLeft, CalendarDays, Newspaper, ArrowRight } from "lucide-react";

import PortalLayout from "@/layouts/layout";
import SectionBadge from "@/Components/SectionBadge";

type Berita = {
    id: number;
    judul: string;
    slug: string;
    kategori: string;
    excerpt: string | null;
    isi: string;
    gambar: string | null;
    published_at: string | null;
};

type Props = {
    berita: Berita;
};

function BeritaShow({ berita }: Props) {
    const formatDate = (date: string | null) => {
        if (!date) return "Belum dipublikasikan";

        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <>
            <Head title={berita.judul} />

            {/* HEADER */}
            <section className="portal-page-header py-5">
                <div className="container py-lg-4">
                    <SectionBadge variant="warning">
                        <Newspaper size={14} className="me-2" />
                        Berita
                    </SectionBadge>

                    <h1 className="display-5 fw-black mt-3 mb-3">
                        {berita.judul}
                    </h1>

                    <div className="d-flex flex-wrap align-items-center gap-3 text-muted">
                        <span className="d-flex align-items-center gap-2">
                            <CalendarDays size={16} />
                            {formatDate(berita.published_at)}
                        </span>

                        <span className="badge rounded-pill bg-white text-success border">
                            {berita.kategori}
                        </span>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <article className="card border-0 portal-card">
                                {/* GAMBAR */}
                                {berita.gambar && (
                                    <div className="d-flex justify-content-center pt-4 px-4">
                                        <img
                                            src={`/storage/${berita.gambar}`}
                                            alt={berita.judul}
                                            className="img-fluid rounded-3"
                                            style={{
                                                width: "75%",
                                                maxHeight: "450px",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="card-body p-4 p-lg-5">
                                    {/* EXCERPT */}
                                    {berita.excerpt && (
                                        <p className="lead text-muted fw-medium mb-4">
                                            {berita.excerpt}
                                        </p>
                                    )}

                                    {/* ISI BERITA */}
                                    <div
                                        className="berita-content"
                                        dangerouslySetInnerHTML={{
                                            __html: berita.isi,
                                        }}
                                    />

                                    {/* KEMBALI */}
                                    <div className="mt-5 pt-4 border-top">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                router.get(
                                                    route("portal.berita"),
                                                )
                                            }
                                            className="btn btn-outline-success rounded-pill fw-bold px-4"
                                        >
                                            <ArrowLeft
                                                size={16}
                                                className="me-2"
                                            />
                                            Kembali ke Berita
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

(BeritaShow as any).layout = (page: React.ReactNode) => (
    <PortalLayout>{page}</PortalLayout>
);

export default BeritaShow;
