import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './componentes/login';
import Inicial from './componentes/inicial';
import Cadastro from './componentes/cadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicial/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
      </Routes>
    </Router>
  );
}

export default App;
