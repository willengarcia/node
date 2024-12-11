import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from "./componentes/main/main";

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Main></Main>}/>
    </Routes>
   </Router>
  );
}

export default App;
