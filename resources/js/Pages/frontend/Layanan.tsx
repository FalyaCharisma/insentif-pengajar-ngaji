import React from 'react';
import { Head } from '@inertiajs/react';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import PortalLayout from '@/layouts/layout';
import SectionBadge from '@/Components/SectionBadge';
import { layanan } from '@/data/dummyData';

function Layanan() {
    return (
        <>
            <Head title="Layanan" />

            <section className="portal-page-header py-5">
                <div className="container py-lg-4 text-center">
                    <SectionBadge variant="primary">
                        <BookOpen size={14} className="me-2" /> Detail Layanan
                    </SectionBadge>
                    <h1 className="display-5 fw-black mt-3 mb-3">Layanan Dinas Pendidikan</h1>
                    <p className="lead text-muted mx-auto mb-0 portal-section-heading">
                        Layanan digital untuk mendukung proses pengajuan, verifikasi, monitoring, dan bantuan program insentif pengajar sekolah non formal.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4">
                        {layanan.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div className="col-md-6 col-lg-4" key={item.title}>
                                    <div className="card border-0 h-100 portal-service-card portal-service-card-detail">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-4">
                                                <div className="portal-service-icon"><Icon size={30} /></div>
                                                <span className="portal-service-number">{index + 1}</span>
                                            </div>
                                            <h2 className="h4 fw-black mb-3">{item.title}</h2>
                                            <p className="text-muted mb-4">{item.desc}</p>

                                            <div className="d-grid gap-2 small text-muted mb-4">
                                                <div className="d-flex gap-2"><CheckCircle2 size={16} className="text-success flex-shrink-0" /> Data terintegrasi dengan akun lembaga</div>
                                                <div className="d-flex gap-2"><CheckCircle2 size={16} className="text-success flex-shrink-0" /> Riwayat proses dapat dipantau</div>
                                                <div className="d-flex gap-2"><CheckCircle2 size={16} className="text-success flex-shrink-0" /> Siap dikembangkan ke backend Laravel</div>
                                            </div>

                                            <button className="btn btn-outline-success rounded-pill fw-bold px-4">
                                                Buka Layanan <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

(Layanan as any).layout = (page: React.ReactNode) => <PortalLayout>{page}</PortalLayout>;

export default Layanan;