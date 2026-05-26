import React from 'react';
import { Head } from '@inertiajs/react';
import { ArrowRight, CalendarDays, Newspaper, Search } from 'lucide-react';
import PortalLayout from '@/layouts/layout';
import SectionBadge from '@/Components/SectionBadge';
import { berita } from '@/data/dummyData';

function Berita() {
    return (
        <>
            <Head title="Berita" />

            <section className="portal-page-header py-5">
                <div className="container py-lg-4">
                    <SectionBadge variant="warning">
                        <Newspaper size={14} className="me-2" /> Detail Berita
                    </SectionBadge>
                    <h1 className="display-5 fw-black mt-3 mb-3">Berita dan Pengumuman Resmi</h1>
                    <p className="lead text-muted mb-0 col-lg-8">
                        Informasi resmi terkait program pendataan, validasi lembaga, dan layanan insentif pengajar sekolah non formal Kota Kediri.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <div className="card border-0 portal-card mb-4">
                        <div className="card-body p-4">
                            <div className="row g-3 align-items-center">
                                <div className="col-lg-8">
                                    <h2 className="h4 fw-black mb-1">Pusat Informasi</h2>
                                    <p className="text-muted mb-0 small">Cari pengumuman atau berita terbaru dari Dinas Pendidikan Kota Kediri.</p>
                                </div>
                                <div className="col-lg-4">
                                    <div className="input-group portal-search-box">
                                        <span className="input-group-text bg-white border-0"><Search size={17} className="text-muted" /></span>
                                        <input className="form-control border-0 shadow-none" placeholder="Cari berita" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        {berita.map((item) => (
                            <div className="col-md-6 col-lg-4" key={item.title}>
                                <article className="card border-0 h-100 portal-news-card">
                                    <div className="portal-news-cover portal-news-cover-lg">
                                        <span className="badge rounded-pill bg-white text-success">{item.category}</span>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="small text-muted fw-bold mb-3 d-flex align-items-center gap-2">
                                            <CalendarDays size={15} /> {item.date}
                                        </div>
                                        <h2 className="h4 fw-black lh-base mb-3">{item.title}</h2>
                                        <p className="text-muted mb-4">{item.excerpt}</p>
                                        <button className="btn btn-outline-success rounded-pill fw-bold px-4">
                                            Baca Selengkapnya <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

(Berita as any).layout = (page: React.ReactNode) => <PortalLayout>{page}</PortalLayout>;

export default Berita;