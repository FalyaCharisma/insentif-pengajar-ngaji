import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="portal-app bg-light text-dark">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
