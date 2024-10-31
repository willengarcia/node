import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componentes/login/login'; // Importa o componente de Login
import CadastroUser from './Componentes/login/cadastroUser';
import PrivateRoute from './Componentes/rotaPrivada'; // Importando o componente de rota protegida
import Admin from './Componentes/admin/admin';
import AdicionarUserEquipe from './Componentes/admin/adicionarUserEquipe'
import ListarChecklist from './Componentes/equipe/listarChecklist';


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
              <Admin token />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/checklist" 
          element={
            <PrivateRoute>
              <ListarChecklist token />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/addUser" 
          element={
            <PrivateRoute>
              <AdicionarUserEquipe token />
            </PrivateRoute>
          } 
        />
        {/* Outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
