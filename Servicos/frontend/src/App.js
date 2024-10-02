import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './componentes/login';
import Inicial from './componentes/inicial';
import Cadastro from './componentes/cadastro';
import Agendamento from './componentes/clientes/agendamento';
import Monitoramento from './componentes/adm/monitoramento';
import Solicitacao from './componentes/funcionario/solicitacao';
import PrivateRoute from './componentes/rotaPrivada';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicial/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>

        <Route 
        path='/agendamento' 
        element={
          <PrivateRoute>
            <Agendamento token/>
          </PrivateRoute>
        }/>
        <Route 
        path='/adm' 
        element={
          <PrivateRoute>
            <Monitoramento token/>
          </PrivateRoute>}/>
        <Route 
        path='/funcionario' 
        element={
          <PrivateRoute>
            <Solicitacao token/>
          </PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
