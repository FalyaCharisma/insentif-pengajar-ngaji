import React from 'react';
import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import PortalLayout from '@/layouts/layout';
import SectionBadge from '@/Components/SectionBadge';

function Kontak() {
    return (
        <>
            <Head title="Kontak" />

            <section className="portal-page-header py-5">
                <div className="container py-lg-4 text-center">
                    <SectionBadge variant="success">Detail Kontak</SectionBadge>
                    <h1 className="display-5 fw-black mt-3 mb-3">Kontak Kami</h1>
                    <p className="lead text-muted mx-auto mb-0 portal-section-heading">
                        Hubungi admin Dinas Pendidikan Kota Kediri untuk bantuan layanan portal insentif pengajar sekolah non formal.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4 mb-4">
                        <div className="col-md-4">
                            <div className="card border-0 h-100 portal-contact-detail-card text-center">
                                <div className="card-body p-4">
                                    <MapPin className="text-success mb-3" size={36} />
                                    <h2 className="h5 fw-black">Alamat</h2>
                                    <p className="text-muted mb-0">Jl. Mayor Bismo, Kota Kediri</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 h-100 portal-contact-detail-card text-center">
                                <div className="card-body p-4">
                                    <Mail className="text-success mb-3" size={36} />
                                    <h2 className="h5 fw-black">Email</h2>
                                    <p className="text-muted mb-0">disdik@kediri.go.id</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 h-100 portal-contact-detail-card text-center">
                                <div className="card-body p-4">
                                    <Phone className="text-success mb-3" size={36} />
                                    <h2 className="h5 fw-black">Telepon</h2>
                                    <p className="text-muted mb-0">(0354) 000000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 portal-card">
                        <div className="card-body p-4 p-lg-5">
                            <div className="row g-4 align-items-center">
                                <div className="col-lg-5">
                                    <h2 className="h3 fw-black mb-3">Form Bantuan</h2>
                                    <p className="text-muted mb-0">
                                        Form ini masih dummy untuk tampilan frontend. Nanti bisa dihubungkan ke API Laravel untuk menyimpan pesan masuk.
                                    </p>
                                </div>
                                <div className="col-lg-7">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <input className="form-control portal-form-control" placeholder="Nama lengkap" />
                                        </div>
                                        <div className="col-md-6">
                                            <input className="form-control portal-form-control" placeholder="Email atau nomor HP" />
                                        </div>
                                        <div className="col-12">
                                            <input className="form-control portal-form-control" placeholder="Subjek bantuan" />
                                        </div>
                                        <div className="col-12">
                                            <textarea className="form-control portal-form-control" rows={4} placeholder="Tulis pesan" />
                                        </div>
                                        <div className="col-12 text-end">
                                            <button className="btn btn-success rounded-pill fw-bold px-4">
                                                Kirim Pesan <Send size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

(Kontak as any).layout = (page: React.ReactNode) => <PortalLayout>{page}</PortalLayout>;

export default Kontak;