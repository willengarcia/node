import React, {useState} from 'react';
import '../App.css'
import Header from './header';
import Main from './main';
import Footer from './footer';

function Inicial(){
    const [botaoAtivo, setBotaoAtivo] = useState(false);

    // Função para alternar o estado do botão
    const toggleMenu = () => {
        setBotaoAtivo(!botaoAtivo);
    };
    return (
    <>
        <nav className={`nav ${botaoAtivo ? 'ativo': ''}`}>
            {/* Botão de controle para expandir/recolher o menu */}
            <button className="botao" onClick={toggleMenu}>
            </button>

            {/* Condicional para exibir ou esconder itens adicionais */}
            <ul className={`list-nav ${botaoAtivo ? 'ativo' : ''}`}>
                <li>
                    <a href='#serviços'>Nossos Serviços</a>
                </li>
                <li>
                    <a href='#sobre'>Sobre Nós</a>
                </li>
                <li>
                    <a href='#avaliacoes'>Avaliações</a>
                </li>
                <li>
                    <a href='#contato'>Contato</a>
                </li>

                <li className='loginBotoes'>
                    <a href='/login'>login</a>
                </li>
                <li className='loginBotoes'>
                    <a href='/cadastro'>Cadastrar-se</a>
                </li>
    
            </ul>
        </nav>
        <Header ativo = {botaoAtivo}></Header>
        <Main ativo = {botaoAtivo}/>
        <Footer ativo = {botaoAtivo}></Footer>
    </>        
    )

}
export default Inicial;