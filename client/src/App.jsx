import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Componentes públicos
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";

import AdminHeader from "./components/admin/AdminHeader.jsx";
import AdminSidebar from "./components/admin/AdminSidebar.jsx";

// Páginas públicas
import Home from "./pages/Home.jsx";
import Sobre from "./pages/Sobre.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Agendar from "./pages/Agendar.jsx";

// Páginas do Admin
import PrivateRoute from "./components/admin/AdminPrivateRoute.jsx";
import AdminLogin from "./pages/admin/Login.jsx"; 
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminAgendamentos from "./pages/admin/Agendamentos.jsx";

// Layout para páginas públicas
const PublicLayout = () => (
  <>
    <Header />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
);

// Layout para página de login admin
const AdminLayoutLogin = () => (
  <main className="bg-gray-200 min-h-screen">
    <Outlet />
  </main>
);

// Layout para páginas admin 
const AdminLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sidebarOpen] = useState(false);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`col-12 col-lg-2 p-0`}>
          {/* Sidebar */}
          <AdminSidebar />
        </div>
        
        {/* Conteúdo principal */}
        <div className={`col-12 col-lg-10 p-0`}>
          <AdminHeader />

          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/agendar" element={<Agendar />} />
      </Route>

      <Route element={<AdminLayoutLogin />}>
        <Route path="/login" element={<AdminLogin />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/agendamentos" element={<AdminAgendamentos />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
