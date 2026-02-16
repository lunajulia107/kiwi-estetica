import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const AdminHeader = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 991);
    const [scrolled, setScrolled] = useState(false);

    const links = [
        { id: 'dashboard', path: '/', label: 'Dashboard', icon: "bi-speedometer2" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const handleResize = () => setIsMobile(window.innerWidth < 991);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header className={`sticky-top ${scrolled ? 'shadow' : ''}`}>
            <nav
                className={`${isMobile ? 'bg-forest-green' : 'bg-light'} navbar navbar-dark navbar-expand-lg ${scrolled ? 'p-2' : 'p-3'}`}
                aria-label="Menu principal"
            >
                <NavLink className="d-flex d-lg-none navbar-brand" to="/">
                        <img
                            alt="Logotipo da Kiwi Estética"
                            src="/images/logotipo.svg"
                        />
                    </NavLink>
                    <button
                        className="d-flex d-lg-none navbar-toggler"
                        data-bs-target="#navbarNav"
                        data-bs-toggle="collapse"
                        type="button"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Alternar navegação"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {isMobile && (
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="gap-2 gap-lg-4 ms-auto navbar-nav">
                                {links.map((link) => (
                                    <li className="nav-item" key={link.id}>
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) =>
                                                link.isButton
                                                    ? `btn btn-lime-green pe-3 ps-3 text-brown`
                                                    : `nav-link ${isActive ? 'active' : ''}`
                                            }
                                            id={link.id === 'agendar' ? 'agendar' : undefined}
                                        >
                                            <i className={`bi ${link.icon} me-2`}></i>
                                            {link.label}
                                        </NavLink>
                                    </li>
                                ))} 
                            </ul>
                        </div>
                    )}  

                    {/* Menu Usuário (somente desktop) */}
                    <div className="align-items-center d-none d-lg-flex gap-3 ms-auto" style={{ height: "32px" }}></div>
            </nav>
        </header>
    );
};

export default AdminHeader;
