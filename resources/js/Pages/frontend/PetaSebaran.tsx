import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Building2, ChevronDown, MapPin, Search } from 'lucide-react';
import PortalLayout from '@/layouts/layout';
import SectionBadge from '@/Components/SectionBadge';
import { kecamatanData } from '@/data/dummyData';

function PetaSebaran() {
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
            <Head title="Peta Sebaran" />

            <section className="portal-page-header py-5">
                <div className="container py-lg-4">
                    <SectionBadge variant="info">
                        <MapPin size={14} className="me-2" /> Detail Peta Sebaran
                    </SectionBadge>
                    <h1 className="display-5 fw-black mt-3 mb-3">Sebaran Lembaga Pendidikan Non Formal</h1>
                    <p className="lead text-muted mb-0 col-lg-8">
                        Monitoring persebaran lembaga, jumlah pendidik, status validasi, dan estimasi insentif berdasarkan kecamatan di Kota Kediri.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-5">
                            <div className="card border-0 portal-card sticky-lg-top portal-sticky-map">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <div className="text-muted small fw-semibold">Peta Administratif</div>
                                            <h2 className="h4 fw-black mb-0">Kota Kediri</h2>
                                        </div>
                                        <button className="btn btn-light rounded-pill fw-bold small">
                                            3 Kecamatan <ChevronDown size={16} />
                                        </button>
                                    </div>

                                    <div className="portal-map-wrapper">
                                        <svg viewBox="0 0 310 315" className="portal-map-svg">
                                            <defs>
                                                <linearGradient id="detail-grad-mojoroto" x1="0" x2="1" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#10b981" />
                                                    <stop offset="100%" stopColor="#0f766e" />
                                                </linearGradient>
                                                <linearGradient id="detail-grad-kota" x1="0" x2="1" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="100%" stopColor="#4f46e5" />
                                                </linearGradient>
                                                <linearGradient id="detail-grad-pesantren" x1="0" x2="1" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#fb923c" />
                                                    <stop offset="100%" stopColor="#e11d48" />
                                                </linearGradient>
                                            </defs>

                                            {kecamatanData.map((item) => (
                                                <g key={item.id} onClick={() => setSelectedId(item.id)} className="portal-map-area">
                                                    <path
                                                        d={item.path}
                                                        fill={selectedId === item.id ? `url(#detail-grad-${item.id})` : '#dbe4f0'}
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
                            <div className="card border-0 portal-card mb-4">
                                <div className="card-body p-4">
                                    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                                        <div>
                                            <div className="text-muted small fw-semibold">Kecamatan Terpilih</div>
                                            <h2 className="h1 fw-black mb-0">{selected.name}</h2>
                                        </div>
                                        <div>
                                            <span className="badge rounded-pill text-bg-success px-3 py-2">Data Dummy</span>
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-6 col-xl-3"><div className="portal-mini-stat"><b>{selected.stats.lembaga}</b><span>Lembaga</span></div></div>
                                        <div className="col-6 col-xl-3"><div className="portal-mini-stat"><b>{selected.stats.pendidik}</b><span>Pendidik</span></div></div>
                                        <div className="col-6 col-xl-3"><div className="portal-mini-stat"><b>{selected.stats.tervalidasi}</b><span>Tervalidasi</span></div></div>
                                        <div className="col-6 col-xl-3"><div className="portal-mini-stat"><b>{selected.stats.insentif}</b><span>Insentif</span></div></div>
                                    </div>
                                </div>
                            </div>

                            <div className="card border-0 portal-card">
                                <div className="card-body p-4">
                                    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center mb-4">
                                        <div>
                                            <h3 className="h4 fw-black mb-1">Daftar Lembaga</h3>
                                            <p className="text-muted mb-0 small">Data lembaga berdasarkan kecamatan yang dipilih.</p>
                                        </div>
                                        <div className="input-group portal-search-box portal-search-box-sm">
                                            <span className="input-group-text bg-white border-0">
                                                <Search size={16} className="text-muted" />
                                            </span>
                                            <input
                                                value={query}
                                                onChange={(event) => setQuery(event.target.value)}
                                                className="form-control border-0 shadow-none"
                                                placeholder="Cari lembaga"
                                            />
                                        </div>
                                    </div>

                                    <div className="table-responsive portal-table-wrapper">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th><Building2 size={16} /> Lembaga</th>
                                                    <th>Jenis</th>
                                                    <th>Kelurahan</th>
                                                    <th>Pendidik</th>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

(PetaSebaran as any).layout = (page: React.ReactNode) => <PortalLayout>{page}</PortalLayout>;

export default PetaSebaran;