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
          <NavLink className="navbar-brand" to="/">
            <img
              alt="Logotipo da Kiwi Estética"
              src="/images/logotipo.svg"
            />
          </NavLink>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-lg-4 gap-2">
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
