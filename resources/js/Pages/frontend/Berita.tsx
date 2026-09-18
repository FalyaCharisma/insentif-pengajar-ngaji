import React from "react";
import { Head, router } from "@inertiajs/react";
import { ArrowRight, CalendarDays, Newspaper, Search } from "lucide-react";

import PortalLayout from "@/layouts/layout";
import SectionBadge from "@/Components/SectionBadge";

type BeritaItem = {
    id: number;
    judul: string;
    slug: string;
    kategori: string;
    excerpt: string | null;
    gambar: string | null;
    published_at: string | null;
};

type Props = {
    berita: {
        data: BeritaItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
    };
};

function Berita({ berita, filters }: Props) {
    const [search, setSearch] = React.useState(filters?.search ?? "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        router.get(
            route("portal.berita"),
            {
                search: search || undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

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
            <Head title="Berita" />

            <section className="portal-page-header py-5">
                <div className="container py-lg-4">
                    <SectionBadge variant="warning">
                        <Newspaper size={14} className="me-2" />
                        Berita
                    </SectionBadge>

                    <h1 className="display-5 fw-black mt-3 mb-3">
                        Berita dan Pengumuman Resmi
                    </h1>

                    <p className="lead text-muted mb-0 col-lg-8">
                        Informasi resmi terkait program pendataan, validasi
                        lembaga, dan layanan insentif pengajar sekolah non
                        formal Kota Kediri.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    {/* SEARCH */}
                    <div className="card border-0 portal-card mb-4">
                        <div className="card-body p-4">
                            <div className="row g-3 align-items-center">
                                <div className="col-lg-8">
                                    <h2 className="h4 fw-black mb-1">
                                        Pusat Informasi
                                    </h2>

                                    <p className="text-muted mb-0 small">
                                        Cari pengumuman atau berita terbaru dari
                                        Dinas Pendidikan Kota Kediri.
                                    </p>
                                </div>

                                <div className="col-lg-4">
                                    <form onSubmit={handleSearch}>
                                        <div className="input-group portal-search-box">
                                            <span className="input-group-text bg-white border-0">
                                                <Search
                                                    size={17}
                                                    className="text-muted"
                                                />
                                            </span>

                                            <input
                                                className="form-control border-0 shadow-none"
                                                placeholder="Cari berita"
                                                value={search}
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BERITA */}
                    <div className="row g-4">
                        {berita.data.length > 0 ? (
                            berita.data.map((item) => (
                                <div
                                    className="col-md-6 col-lg-4"
                                    key={item.id}
                                >
                                    <article className="card border-0 h-100 portal-news-card">
                                        {/* GAMBAR */}
                                        <div className="portal-news-cover portal-news-cover-lg position-relative">
                                            {item.gambar && (
                                                <img
                                                    src={`/storage/${item.gambar}`}
                                                    alt={item.judul}
                                                    className="w-100 h-100 object-fit-cover"
                                                />
                                            )}

                                            <span className="badge rounded-pill bg-white text-success position-absolute top-0 start-0 m-3">
                                                {item.kategori}
                                            </span>
                                        </div>

                                        <div className="card-body p-4">
                                            <div className="small text-muted fw-bold mb-3 d-flex align-items-center gap-2">
                                                <CalendarDays size={15} />
                                                {formatDate(item.published_at)}
                                            </div>

                                            <h2 className="h4 fw-black lh-base mb-3">
                                                {item.judul}
                                            </h2>

                                            <p className="text-muted mb-4">
                                                {item.excerpt}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            "portal.berita.show",
                                                            item.slug,
                                                        ),
                                                    )
                                                }
                                                className="btn btn-outline-success rounded-pill fw-bold px-4"
                                            >
                                                Baca Selengkapnya
                                                <ArrowRight
                                                    size={16}
                                                    className="ms-1"
                                                />
                                            </button>
                                        </div>
                                    </article>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <div className="text-center py-5">
                                    <Newspaper
                                        size={42}
                                        className="text-muted mb-3"
                                    />

                                    <h3 className="h5 fw-bold">
                                        Belum ada berita
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Belum terdapat berita yang
                                        dipublikasikan.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* PAGINATION */}
                    {berita.last_page > 1 && (
                        <div className="d-flex justify-content-center mt-5">
                            <div className="d-flex gap-2">
                                {berita.links.map((link, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            router.get(
                                                link.url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            )
                                        }
                                        className={`btn ${
                                            link.active
                                                ? "btn-success"
                                                : "btn-outline-success"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

(Berita as any).layout = (page: React.ReactNode) => (
    <PortalLayout>{page}</PortalLayout>
);

export default Berita;
