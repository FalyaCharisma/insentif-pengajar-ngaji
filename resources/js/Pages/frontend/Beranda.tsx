import React, { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Bell,
    BookOpen,
    CalendarDays,
    ChevronDown,
    Mail,
    MapPin,
    Newspaper,
    Phone,
    Search,
} from 'lucide-react';
import PortalLayout from '@/layouts/layout';
import SectionBadge from '@/Components/SectionBadge';
import StatCard from '@/Components/StatCard';
import { berita, kecamatanData, layanan, quickLinks, statistik } from '@/data/dummyData';

function Beranda() {
    const [selectedId, setSelectedId] = useState('kota');
    const [query, setQuery] = useState('');

    const selected = kecamatanData.find((item) => item.id === selectedId) || kecamatanData[0];

    const filteredLembaga = useMemo(() => {
        const keyword = query.toLowerCase().trim();
        if (!keyword) return selected.lembaga;

        return selected.lembaga.filter((item) =>
            [item.nama, item.jenis, item.kelurahan, item.status].join(' ').toLowerCase().includes(keyword)
        );
    }, [query, selected]);

    return (
        <>
            <Head title="Beranda" />

            <section className="portal-hero position-relative overflow-hidden">
                <div className="portal-hero-pattern" />
                <div className="container position-relative py-5">
                    <div className="row align-items-center g-5 py-lg-5">
                        <div className="col-lg-7">
                            <SectionBadge variant="success">
                                <Bell size={14} className="me-2" /> Portal Pemerintah Kota Kediri
                            </SectionBadge>

                            <h1 className="display-4 fw-black text-dark mt-4 mb-4 portal-title">
                                Portal Data Insentif Pengajar Sekolah Non Formal
                            </h1>
                            <p className="lead text-muted mb-4 portal-lead">
                                Satu pintu informasi untuk pendataan lembaga, validasi pendidik, pengajuan insentif,
                                berita resmi, dan layanan Dinas Pendidikan Kota Kediri.
                            </p>

                            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                                <a href="#peta-sebaran" className="btn btn-success btn-lg rounded-pill px-4 fw-bold d-inline-flex align-items-center justify-content-center gap-2 portal-main-btn">
                                    Lihat Peta Sebaran <ArrowRight size={18} />
                                </a>
                                <a href="#layanan" className="btn btn-light btn-lg rounded-pill px-4 fw-bold border d-inline-flex align-items-center justify-content-center gap-2">
                                    Jelajahi Layanan
                                </a>
                            </div>

                            <div className="row g-3 mt-2">
                                {quickLinks.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div className="col-6 col-md-3" key={item.label}>
                                            <div className="portal-quick-card h-100">
                                                <Icon size={20} className="text-success mb-2" />
                                                <div className="fw-bold small text-dark">{item.label}</div>
                                                <small className="text-muted">{item.value}</small>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="card border-0 portal-hero-card">
                                <div className="card-body p-4 p-lg-5">
                                    <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
                                        <div>
                                            <div className="text-muted small fw-semibold">Rekap Tahun 2026</div>
                                            <h2 className="h4 fw-black mb-0">Statistik Kota Kediri</h2>
                                        </div>
                                        <SectionBadge variant="primary">Live Preview</SectionBadge>
                                    </div>

                                    <div className="row g-3">
                                        {statistik.map((item) => (
                                            <div className="col-6" key={item.label}>
                                                <StatCard label={item.label} value={item.value} icon={item.icon} tone={item.tone} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="peta-sebaran" className="py-5 bg-light">
                <div className="container py-lg-4">
                    <div className="row align-items-end g-4 mb-4">
                        <div className="col-lg-7">
                            <SectionBadge variant="info">
                                <MapPin size={14} className="me-2" /> Peta Sebaran
                            </SectionBadge>
                            <h2 className="display-6 fw-black mt-3 mb-2">Sebaran Lembaga Per Kecamatan</h2>
                            <p className="text-muted mb-0">
                                Klik area peta Kota Kediri untuk menampilkan data lembaga dan pendidik non formal secara dummy.
                            </p>
                        </div>
                        <div className="col-lg-5">
                            <div className="input-group portal-search-box">
                                <span className="input-group-text bg-white border-0">
                                    <Search size={18} className="text-muted" />
                                </span>
                                <input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    className="form-control border-0 shadow-none"
                                    placeholder="Cari lembaga, jenis, kelurahan..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-5">
                            <div className="card border-0 portal-card h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <div className="text-muted small fw-semibold">Peta Administratif</div>
                                            <h3 className="h4 fw-black mb-0">Kota Kediri</h3>
                                        </div>
                                        <button className="btn btn-light rounded-pill fw-bold small">
                                            3 Kecamatan <ChevronDown size={16} />
                                        </button>
                                    </div>

                                    <div className="portal-map-wrapper">
                                        <svg viewBox="0 0 310 315" className="portal-map-svg">
                                            <defs>
                                                <linearGradient id="grad-mojoroto" x1="0" x2="1" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#10b981" />
                                                    <stop offset="100%" stopColor="#0f766e" />
                                                </linearGradient>
                                                <linearGradient id="grad-kota" x1="0" x2="1" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="100%" stopColor="#4f46e5" />
                                                </linearGradient>
                                                <linearGradient id="grad-pesantren" x1="0" x2="1" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#fb923c" />
                                                    <stop offset="100%" stopColor="#e11d48" />
                                                </linearGradient>
                                            </defs>

                                            {kecamatanData.map((item) => (
                                                <g key={item.id} onClick={() => setSelectedId(item.id)} className="portal-map-area">
                                                    <path
                                                        d={item.path}
                                                        fill={selectedId === item.id ? `url(#grad-${item.id})` : '#dbe4f0'}
                                                        stroke="#ffffff"
                                                        strokeWidth="5"
                                                    />
                                                    <circle cx={item.label.x} cy={item.label.y - 22} r="6" fill="#ffffff" opacity="0.9" />
                                                    <text
                                                        x={item.label.x}
                                                        y={item.label.y}
                                                        textAnchor="middle"
                                                        className={selectedId === item.id ? 'portal-map-text-active' : 'portal-map-text'}
                                                    >
                                                        {item.name}
                                                    </text>
                                                </g>
                                            ))}
                                        </svg>
                                    </div>

                                    <div className="row g-2 mt-3">
                                        {kecamatanData.map((item) => (
                                            <div className="col-4" key={item.id}>
                                                <button
                                                    onClick={() => setSelectedId(item.id)}
                                                    className={`btn w-100 rounded-pill fw-bold small ${selectedId === item.id ? 'btn-success' : 'btn-light'}`}
                                                >
                                                    {item.name}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="card border-0 portal-card h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 border-bottom pb-3 mb-4">
                                        <div>
                                            <div className="text-muted small fw-semibold">Data Kecamatan Terpilih</div>
                                            <h3 className="h2 fw-black mb-0">{selected.name}</h3>
                                        </div>
                                        <div>
                                            <SectionBadge variant="success">Update 25 Mei 2026</SectionBadge>
                                        </div>
                                    </div>

                                    <div className="row g-3 mb-4">
                                        <div className="col-6 col-lg-3">
                                            <div className="portal-mini-stat"><b>{selected.stats.lembaga}</b><span>Lembaga</span></div>
                                        </div>
                                        <div className="col-6 col-lg-3">
                                            <div className="portal-mini-stat"><b>{selected.stats.pendidik}</b><span>Pendidik</span></div>
                                        </div>
                                        <div className="col-6 col-lg-3">
                                            <div className="portal-mini-stat"><b>{selected.stats.tervalidasi}</b><span>Tervalidasi</span></div>
                                        </div>
                                        <div className="col-6 col-lg-3">
                                            <div className="portal-mini-stat"><b>{selected.stats.insentif}</b><span>Insentif</span></div>
                                        </div>
                                    </div>

                                    <div className="table-responsive portal-table-wrapper">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Lembaga</th>
                                                    <th>Jenis</th>
                                                    <th>Kelurahan</th>
                                                    <th>Guru</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredLembaga.map((item) => (
                                                    <tr key={item.nama}>
                                                        <td className="fw-bold text-dark">{item.nama}</td>
                                                        <td>{item.jenis}</td>
                                                        <td>{item.kelurahan}</td>
                                                        <td className="fw-bold">{item.pendidik}</td>
                                                        <td>
                                                            <span className={`badge rounded-pill ${item.status === 'Tervalidasi' ? 'text-bg-success' : item.status === 'Proses' ? 'text-bg-warning' : 'text-bg-danger'}`}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="text-end mt-4">
                                        <Link href="/peta-sebaran" className="btn btn-outline-success rounded-pill fw-bold">
                                            Detail Peta Sebaran <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="layanan" className="py-5 bg-white">
                <div className="container py-lg-4">
                    <div className="text-center mx-auto mb-5 portal-section-heading">
                        <SectionBadge variant="primary">
                            <BookOpen size={14} className="me-2" /> Layanan Dinas Pendidikan
                        </SectionBadge>
                        <h2 className="display-6 fw-black mt-3 mb-2">Layanan Portal</h2>
                        <p className="text-muted mb-0">
                            Menu layanan dapat diarahkan ke modul Laravel sesuai kebutuhan tahap berikutnya.
                        </p>
                    </div>

                    <div className="row g-4">
                        {layanan.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div className="col-md-6 col-lg-4" key={item.title}>
                                    <div className="card border-0 h-100 portal-service-card">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-4">
                                                <div className="portal-service-icon"><Icon size={28} /></div>
                                                <span className="portal-service-number">{index + 1}</span>
                                            </div>
                                            <h3 className="h5 fw-black mb-2">{item.title}</h3>
                                            <p className="text-muted mb-4">{item.desc}</p>
                                            <Link href="/layanan" className="fw-bold text-success text-decoration-none d-inline-flex align-items-center gap-2">
                                                Lihat Layanan <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="berita" className="py-5 bg-light">
                <div className="container py-lg-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
                        <div>
                            <SectionBadge variant="warning">
                                <Newspaper size={14} className="me-2" /> Berita dan Pengumuman
                            </SectionBadge>
                            <h2 className="display-6 fw-black mt-3 mb-0">Informasi Resmi Pemerintah</h2>
                        </div>
                        <Link href="/berita" className="btn btn-dark rounded-pill fw-bold px-4">
                            Semua Berita <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="row g-4">
                        {berita.map((item) => (
                            <div className="col-md-4" key={item.title}>
                                <article className="card border-0 h-100 portal-news-card">
                                    <div className="portal-news-cover">
                                        <span className="badge rounded-pill bg-white text-success">{item.category}</span>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="small text-muted fw-bold mb-3 d-flex align-items-center gap-2">
                                            <CalendarDays size={15} /> {item.date}
                                        </div>
                                        <h3 className="h5 fw-black lh-base">{item.title}</h3>
                                        <p className="text-muted small mb-4">{item.excerpt}</p>
                                        <Link href="/berita" className="fw-bold text-success text-decoration-none d-inline-flex align-items-center gap-2">
                                            Baca Selengkapnya <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="kontak" className="py-5 bg-white">
                <div className="container py-lg-4">
                    <div className="card border-0 portal-contact-panel">
                        <div className="card-body p-4 p-lg-5">
                            <div className="row align-items-center g-4">
                                <div className="col-lg-5">
                                    <SectionBadge variant="success">Kontak Portal</SectionBadge>
                                    <h2 className="display-6 fw-black mt-3 mb-3">Butuh Bantuan Admin?</h2>
                                    <p className="text-muted mb-0">
                                        Hubungi Dinas Pendidikan Kota Kediri untuk informasi layanan insentif pengajar sekolah non formal.
                                    </p>
                                </div>
                                <div className="col-lg-7">
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <div className="portal-contact-card">
                                                <MapPin className="text-success mb-3" size={30} />
                                                <h3 className="h6 fw-black">Alamat</h3>
                                                <p className="small text-muted mb-0">Jl. Mayor Bismo, Kota Kediri</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="portal-contact-card">
                                                <Mail className="text-success mb-3" size={30} />
                                                <h3 className="h6 fw-black">Email</h3>
                                                <p className="small text-muted mb-0">disdik@kediri.go.id</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="portal-contact-card">
                                                <Phone className="text-success mb-3" size={30} />
                                                <h3 className="h6 fw-black">Telepon</h3>
                                                <p className="small text-muted mb-0">(0354) 000000</p>
                                            </div>
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

(Beranda as any).layout = (page: React.ReactNode) => <PortalLayout>{page}</PortalLayout>;

export default Beranda;