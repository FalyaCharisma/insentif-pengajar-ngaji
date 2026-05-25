import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/layout";
import Beranda from "@/Pages/frontend/Beranda";
import PetaSebaran from "@/Pages/frontend/PetaSebaran";
import Layanan from "@/Pages/frontend/Layanan";
import Berita from "@/Pages/frontend/Berita";
import Kontak from "@/Pages/frontend/Kontak";

export default function PortalApp() {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Beranda />} />
                    <Route path="/peta-sebaran" element={<PetaSebaran />} />
                    <Route path="/layanan" element={<Layanan />} />
                    <Route path="/berita" element={<Berita />} />
                    <Route path="/kontak" element={<Kontak />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}
