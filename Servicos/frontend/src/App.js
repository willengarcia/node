import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './componentes/login';
import Inicial from './componentes/inicial';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicial/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
