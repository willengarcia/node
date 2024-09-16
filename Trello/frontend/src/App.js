import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componentes/login'; // Importa o componente de Login
import CadastroUser from './Componentes/cadastroUser';
import PrivateRoute from './Componentes/rotaPrivada'; // Importando o componente de rota protegida
import Lojas from './Componentes/lojas';
import Imagens from './Componentes/imagens';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/cadastro/user' element={<CadastroUser/>} />
        <Route 
          path="/Lojas" 
          element={
            <PrivateRoute>
              <Lojas token />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/Imagens" 
          element={
            <PrivateRoute>
              <Imagens token />
            </PrivateRoute>
          } 
        />
        {/* Outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
