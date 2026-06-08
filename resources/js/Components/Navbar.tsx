import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Landmark, LogIn, Menu, X } from 'lucide-react';

const menus = [
    { label: 'Beranda', href: '/' },
    { label: 'Peta Sebaran', href: '/peta-sebaran' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'Berita', href: '/berita' },
];

export default function Navbar() {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    const closeMenu = () => setOpen(false);

    return (
        <nav className="navbar navbar-light bg-white border-bottom sticky-top portal-navbar">
            <div className="container py-2">
                <div className="portal-navbar-inner">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="navbar-brand d-flex align-items-center gap-3 text-decoration-none m-0"
                    >
                        <div className="portal-brand-icon">
                            <Landmark size={24} />
                        </div>

                        <div className="lh-sm">
                            <div className="fw-black text-success fs-5">SI-INSENTIF</div>
                            <small className="text-muted fw-semibold">Dinas Pendidikan Kota Kediri</small>
                        </div>
                    </Link>

                    <div className="portal-desktop-menu">
                        {menus.map((menu) => (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                onClick={closeMenu}
                                className={`portal-nav-link text-decoration-none ${isActive(menu.href) ? 'active' : ''}`}
                            >
                                {menu.label}
                            </Link>
                        ))}
                    </div>

                    <div className="portal-desktop-action">
                        <Link
                            href="/login"
                            className="btn btn-warning rounded-pill px-4 fw-bold text-white d-inline-flex align-items-center gap-2 portal-login-btn"
                        >
                            Masuk <LogIn size={16} />
                        </Link>
                    </div>

                    <div className="portal-mobile-action">
                        <Link
                            href="/login"
                            onClick={closeMenu}
                            className="btn btn-warning rounded-pill px-3 fw-bold text-white d-inline-flex align-items-center gap-2 portal-login-btn"
                        >
                            Masuk
                        </Link>

                        <button
                            type="button"
                            className="btn btn-light border rounded-3 d-inline-flex align-items-center justify-content-center portal-mobile-toggle"
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle navigation"
                        >
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {open && (
                    <div className="portal-mobile-menu">
                        {menus.map((menu) => (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                onClick={closeMenu}
                                className={`portal-mobile-link text-decoration-none ${isActive(menu.href) ? 'active' : ''}`}
                            >
                                {menu.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}