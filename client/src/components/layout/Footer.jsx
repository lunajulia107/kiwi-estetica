import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Links de Navegação Principal  
  const mainNavLinks = [
    { name: "Home", path: "/" },
    { name: "Sobre nós", path: "/sobre" },
    { name: "Catálogo", path: "/catalogo" },
    { name: "Agende seu Momento", path: "/agendar" },
  ];

  // Links de Tratamentos/Serviços  
  const serviceLinks = [
    { name: "Cuidados faciais", path: "/catalogo#faciais" },
    { name: "Cuidados corporais", path: "/catalogo#corporais" },
    { name: "Terapias", path: "/catalogo#terapias" },
  ];

  const socialLinks = [
    {
      icon: "bi bi-whatsapp text-forest-green",
      label: "WhatsApp",
      url: "https://wa.me/seunumerodetelefone",
    },
    {
      icon: "bi bi-instagram text-forest-green",
      label: "Instagram",
      url: "https://instagram.com/kiwiestetica",
    },
    {
      icon: "bi bi-tiktok text-forest-green",
      label: "TikTok",
      url: "https://tiktok.com/@kiwiestetica",
    },
    {
      icon: "bi bi-facebook text-forest-green",
      label: "Facebook",
      url: "https://facebook.com/kiwiestetica",
    }, 
  ];

  return (
    <footer className="bg-pale-sage py-5 text-dark">
      <div className="container">
        <div className="justify-content-between row">
          {/* Coluna KIWI */}
          <div className="col-12 col-lg-4 mb-5">
            <Link
              aria-label="Logotipo Kiwi Estética."
              className="d-flex navbar-brand"
              to="/"
            >
              <img
                alt="Logotipo Kiwi Estética"
                className="img-fluid"
                src="/images/logotipo-slogan.svg"
              />
            </Link>
          </div>

          {/* Coluna 1 */}
          <nav
            aria-label="Conheça o SPA"
            className="col-12 col-md-3 col-lg-2 d-flex flex-column gap-2 mb-4"
          >
            <h6 className="fw-semibold text-forest-green">Conheça o SPA</h6>
            <ul className="align-items-start d-flex flex-column gap-1 list-unstyledn">
              {mainNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    aria-label={link.name}
                    className="text-decoration-none text-forest-green"
                    to={link.path}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 2 */}
          <nav
            aria-label="Renove-se"
            className="align-items-start col-12 col-md-3 col-lg-2 d-flex flex-column gap-2 mb-5"
          >
            <h6 className="fw-semibold text-forest-green">Renove-se</h6>
            <ul className="d-flex flex-column gap-1 list-unstyled">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    aria-label={link.name}
                    className="text-decoration-none text-forest-green"
                    to={link.path}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna Endereço */}
          <address
            aria-label="Endereço Kiwi Estética"
            className="align-items-start col-12 col-md-3 col-lg-2 d-flex flex-column gap-2 mb-4 text-forest-green"
          >
            <h6 className="fw-semibold text-forest-green">Kiwi Estética</h6>
            Centro Comercial, 138
            <br />
            Alphaville, Barueri - SP <br />
            CEP: 06454-150
            <br />
            Seg à Sáb - Das 9h às 18h
          </address>
        </div>

        {/* Rodapé inferior */}
        <div className="align-items-start border-top d-flex flex-column flex-md-row justify-content-between mt-4 pt-3">
          <small className="text-forest-green text-md-start">
            © {new Date().getFullYear()} Kiwi Estética. By Legally Designers.
          </small>

          <div className="d-flex gap-3 mt-3 mt-md-0">
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                className="fs-4 text-dark"
                href={social.url}
                key={social.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
