import React, { useState, useEffect } from 'react';
import '../App.css'

function Nav(){
    return(
        <nav>
            <ul>
                <li>
                    <a href='#serviços'>Nossos Serviços</a>
                </li>
                <li>
                    <a href='#sobre'>Sobre Nós</a>
                </li>
                <li>
                    <a href='#contato'>Contato</a>
                </li>
            </ul>
        </nav>
    )
}
export default Nav;