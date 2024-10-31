import React from 'react';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Verifica se o token está armazenado

  // Se o token existir, renderiza os filhos (a rota protegida), caso contrário, redireciona para login
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
