import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1400);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState({ nome: '', cargo: '' });
    const navigate = useNavigate();

    const links = [
        { id: 'dashboard', path: '/', label: 'Dashboard', icon: "bi-speedometer2" },
        { id: 'agendamentos', path: '/agendamentos', label: 'Agendamentos', icon: "bi-calendar-check" } 
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const handleResize = () => setIsMobile(window.innerWidth < 1400);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
 
        const searchUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/usuario-logado', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                }); 

                if (response.ok) {
                const data = await response.json(); 
                setUser({
                    nome: data.nome || 'Usuário',
                    cargo: data.cargo || 'Administrador'
                });
                } else {    
                console.error('Erro ao buscar usuário');
                }
            } catch (error) {
                console.error('Erro na requisição do usuário:', error);
            }
        };

        searchUser();

        // O return final do useEffect é apenas para remover os listeners
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    const fixedAvatar = "/images/tais.png";  

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className={`sticky-top ${scrolled ? 'shadow' : ''}`}>
            <nav
                className={`${isMobile ? 'bg-forest-green' : 'bg-light'} navbar navbar-dark navbar-expand-xxl ${scrolled ? 'p-2' : 'p-3'}`}
                aria-label="Menu principal"
            >
                    <NavLink className="d-flex d-xxl-none navbar-brand" to="/dashboard">
                        <img
                            alt="Logotipo da **Kiwi Estética** em fundo verde-escuro, com tipografia branca orgânica e um kiwi estilizado no nome."
                            src="/images/logotipo.svg"
                        />
                    </NavLink>
                    <button
                        className="d-flex d-xxl-none navbar-toggler"
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
                        <div className="collapse mb-4 mt-4 navbar-collapse" id="navbarNav">
                            <div className="align-items-center d-flex gap-2">
                                <img
                                    src={fixedAvatar}
                                    alt="Avatar do usuário logado no sistema."
                                    width="40"
                                    height="40"
                                    className="bg-lavender rounded-4"
                                />
                                <div className="d-flex flex-column small text-white">
                                    <strong className="fw-semibold">{user.nome}</strong>
                                    <span>{user.cargo}</span>
                                </div>
                            </div>

                            <hr className="border-light" />
                            
                            <ul className="ms-auto navbar-nav">
                                {links.map((link) => (
                                    <li className="nav-item p-1" key={link.id}>
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
                                <li className="nav-item p-1">
                                    <a
                                        className="border-0 btn btn-outline-light btn-sm p-1 pe-2 ps-2"
                                        href="#"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout();
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Sair
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}  

                    {/* Menu Usuário (somente desktop) */}
                    <div className="align-items-center d-none d-xxl-flex gap-3 ms-auto" style={{ height: "32px" }}></div>
            </nav>
        </header>
    );
};

export default AdminHeader;