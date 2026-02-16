import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 991);
  const [usuario, setUsuario] = useState({ nome: '', cargo: '' });
  const navigate = useNavigate();

  const links = {
    home: [
      { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: "bi-house-fill" },
    ],
    agenda: [
      { id: 'agendamentos', path: '/agendamentos', label: 'Agendamentos', icon: "bi-clock-history" }
    ]
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 991);
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
          setUsuario({
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

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
 
  const fixedAvatar = "/images/tais-bonilha.png";  

  return (
    <>
      {!isMobile && (
        <aside className="bg-forest-green d-flex flex-column justify-content-between p-4 vh-100">
          <div>
            <NavLink className="d-block mb-4 navbar-brand" to="/">
              <img
                alt="Logotipo da Kiwi Estética"
                src="/images/logotipo.svg"
              />
            </NavLink>

            <div className="mb-4">
              <p className="mb-2 text-white">Home</p>
              <ul className="gap-2 nav flex-column">
                {links.home.map((link) => (
                  <li className="nav-item" key={link.id}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? 'active text-white' : 'text-white-50'}`
                      }
                    >
                      <i className={`bi ${link.icon} me-2`}></i>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <p className="mb-2 text-white">Controle</p>
              <ul className="gap-2 nav flex-column">
                {links.agenda.map((link) => (
                  <li className="nav-item" key={link.id}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? 'active text-white' : 'text-white-50'}`
                      }
                    >
                      <i className={`bi ${link.icon} me-2`}></i>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rodapé com info do usuário */}
          <div className="d-flex flex-column gap-2 p-3 rounded-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <div className="d-flex flex-row gap-3 align-items-start">
              <img
                src={fixedAvatar}
                alt="Avatar"
                width="40"
                height="40"
                className="bg-lavender rounded-4"
              />
              <div className="d-flex flex-column small text-white">
                <strong className="fw-semibold">{usuario.nome}</strong>
                <span>{usuario.cargo}</span>
              </div>
            </div>

            <hr className="border-light" />

            <div className="d-flex flex-row justify-content-between w-100">
              <button className="border-0 btn btn-outline-light btn-sm" type="button">
                <i className="bi bi-gear-fill"></i>
              </button>

              <a
                className="border-0 btn btn-outline-light btn-sm"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Sair
              </a>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default AdminSidebar;
