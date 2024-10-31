import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componentes/login/login'; // Importa o componente de Login
import CadastroUser from './Componentes/login/cadastroUser';
import PrivateRoute from './Componentes/rotaPrivada'; // Importando o componente de rota protegida
import Admin from './Componentes/admin/admin';
import ListarChecklist from './Componentes/equipe/listarChecklist';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/cadastro/user' element={<CadastroUser/>} />
        <Route 
          path="/admin" 
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
        {/* Outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
