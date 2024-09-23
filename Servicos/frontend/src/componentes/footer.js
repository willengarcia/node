import React, { useState, useEffect } from 'react';
import '../App.css'

function Footer(props){
    return(
        <footer className={`conteudo ${props.ativo?"ativo":""}`}>
            <p>© 2023 ServiçosExpress. Todos os direitos reservados.</p>
        </footer>
    )
}
export default Footer;