import React, { useState, useEffect } from 'react';
import '../App.css'

function Header(props){
    return(
        <header className={`conteudo ${props.ativo?"ativo":""}`}>
            <h1>ServiçosExpress</h1>
            <p>Sua solução completa em serviços profissionais</p>
        </header>
    )
}
export default Header;