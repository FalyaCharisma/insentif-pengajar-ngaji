import React from 'react';
import { Link } from '@inertiajs/react';
import { Landmark, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="portal-footer text-white pt-5 pb-4">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-5">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="portal-footer-icon">
                                <Landmark size={24} />
                            </div>
                            <div>
                                <div className="fs-5 fw-black">SI-INSENTIF</div>
                                <small className="text-white-50">Dinas Pendidikan Kota Kediri</small>
                            </div>
                        </div>
                        <p className="text-white-50 mb-0 portal-footer-text">
                            Portal penghimpunan data penerima insentif pengajar sekolah non formal Kota Kediri.
                            Data pada tampilan ini masih dummy dan siap dihubungkan dengan backend Laravel.
                        </p>
                    </div>

                    <div className="col-6 col-lg-3">
                        <h6 className="fw-bold mb-3">Menu Portal</h6>
                        <div className="d-grid gap-2">
                            <Link href="/" className="portal-footer-link">Beranda</Link>
                            <Link href="/peta-sebaran" className="portal-footer-link">Peta Sebaran</Link>
                            <Link href="/layanan" className="portal-footer-link">Layanan</Link>
                            <Link href="/berita" className="portal-footer-link">Berita</Link>
                            <Link href="/kontak" className="portal-footer-link">Kontak</Link>
                        </div>
                    </div>

                    <div className="col-6 col-lg-4">
                        <h6 className="fw-bold mb-3">Kontak</h6>
                        <div className="d-grid gap-3 text-white-50 small">
                            <div className="d-flex gap-2">
                                <MapPin size={18} className="text-success flex-shrink-0" />
                                <span>Jl. Mayor Bismo, Kota Kediri</span>
                            </div>
                            <div className="d-flex gap-2">
                                <Mail size={18} className="text-success flex-shrink-0" />
                                <span>disdik@kediri.go.id</span>
                            </div>
                            <div className="d-flex gap-2">
                                <Phone size={18} className="text-success flex-shrink-0" />
                                <span>(0354) 000000</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary my-4" />

                <div className="d-flex flex-column flex-md-row justify-content-between gap-2 text-white-50 small">
                    <span>© 2026 Pemerintah Kota Kediri. All Rights Reserved.</span>
                    <span>Prototype Portal Insentif Non Formal</span>
                </div>
            </div>
        </footer>
    );
}