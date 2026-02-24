import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Função para verificar se o usuário está autenticado
function PrivateRoute() {
    const token = localStorage.getItem("token");

    if (!token) { 
        return <Navigate to="/login" replace />;
    }
 
    return <Outlet />;
}

export default PrivateRoute;
