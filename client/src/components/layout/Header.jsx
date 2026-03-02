import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'sobre', path: '/sobre', label: 'Sobre nós' },
    { id: 'catalogo', path: '/catalogo', label: 'Catálogo' },
    { id: 'agendar', path: '/agendar', label: 'Agendar', isButton: true }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky-top ${scrolled ? 'shadow' : ''}`}>
      <nav
        className={`bg-forest-green navbar navbar-dark navbar-expand-lg ${scrolled ? 'p-2' : 'p-3'}`} 
        aria-label="Menu principal"
      >
        <div className="container gap-3">
          { /* Logotipo da empresa, clicável para retornar à página inicial */ }
          <NavLink className="navbar-brand" to="/">
            <img
              alt="Logotipo da **Kiwi Estética** em fundo verde-escuro, com tipografia branca orgânica e um kiwi estilizado no nome."
              src="/images/logotipo.svg"
            />
          </NavLink>

          { /* Botão de toggle para dispositivos móveis, com ícone padrão do Bootstrap */ }
          <button
            className="navbar-toggler"
            data-bs-target="#navbarNav"
            data-bs-toggle="collapse"
            type="button"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Alternar navegação"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          { /* Links de navegação, com destaque para o botão "Agendar" */ }
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-lg-4 gap-2 mb-4 m-lg-0">
              {links.map((link) => (
                <li className="nav-item" key={link.id}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      link.isButton
                        ? `btn btn-lime-green pe-3 ps-3 text-white`
                        : `nav-link ${isActive ? 'active' : ''}`
                    }
                    id={link.id === 'agendar' ? 'agendar' : undefined}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
