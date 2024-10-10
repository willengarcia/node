import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { Analytics } from "@vercel/analytics/react"
function Inicial({children}){
    const [menuAberto, setMenuAberto] = useState(false);
    const navigator = useNavigate()
    const alternarMenu = () => {
      setMenuAberto(!menuAberto); // Alterna o estado do menu entre aberto e fechado
    };        
    const botaoAgendarLogin = ()=>{
        navigator('/login')
    }
    useEffect(() => {
        const pupilas = document.querySelectorAll('.bola')

        const moverPupilas = (evento) => {
          const posX = evento.clientX || (evento.touches && evento.touches[0].clientX);
          const posY = evento.clientY || (evento.touches && evento.touches[0].clientY);
    
          pupilas.forEach((pupila) => {
            const rect = pupila.parentElement.getBoundingClientRect(); // Pega a posição do olho (pai da pupila)
    
            // Calcula a posição relativa da pupila ao centro do olho
            const olhoCentroX = rect.left + rect.width / 2;
            const olhoCentroY = rect.top + rect.height / 2;
    
            // Calcula o ângulo de rotação em relação à posição do mouse ou toque
            const angulo = Math.atan2(posY - olhoCentroY, posX - olhoCentroX);
    
            // Define a nova posição da pupila dentro do olho (movimento limitado)
            const distMaxima = rect.width / 4; // Limite de movimento da pupila (metade do raio do olho)
            const pupilaX = Math.cos(angulo) * distMaxima;
            const pupilaY = Math.sin(angulo) * distMaxima;
    
            pupila.style.transform = `translate(${pupilaX}px, ${pupilaY}px)`; // Move a pupila
          });
        };
        // Adiciona os eventos de mouse e toque
        window.addEventListener('mousemove', moverPupilas);
        window.addEventListener('touchmove', moverPupilas);
    
        // Limpeza ao desmontar o componente
        return () => {
          window.removeEventListener('mousemove', moverPupilas);
          window.removeEventListener('touchmove', moverPupilas);
        };
      }, []);
    return(
        <div id='containerPaiInicial'>
            <nav className='menu'>
                <button className="menu-botao" onClick={alternarMenu}>&#9776;</button>
                <ul  className={`listaMenu ${menuAberto ? 'aberto' : ''}`}>
                <li><a href='/login'>Login</a></li>
                    <li><a href='/cadastro'>Cadastra-se</a></li>
                    <li><a href='#cards-servicos'>Serviços</a></li>
                    <li><a href='#sobre'>Sobre</a></li>
                    <li><a href='#avaliacoes'>Avaliações</a></li>
                    <li><a href='#contato'>Contato</a></li>
                </ul>
            </nav>
            <header className='cabecaInicial'>
                <h1>Explore Nossos Serviços</h1>
                <p>Seja Bem-Vindo ao Serviço Expresso</p>
                <p>Sua solução completa em serviços profissionais</p>
                <button>Entrar</button>
            </header>
            <main className='corpo'>
                <section id='cards-servicos'>
                    <h2>Nossos Serviços</h2>
                    <article className='service'>
                        <h3>Limpeza Residencial</h3>
                        <p>Mantenha sua casa impecável com nossa equipe especializada.</p>
                        <hr></hr>
                        <h4>~R$70</h4>
                        <button className='botao-agendar' onClick={()=>{botaoAgendarLogin()}}>Agendar</button>
                    </article>
                    <article className='service'>
                        <h3>Reparos Gerais</h3>
                        <p>Soluções rápidas e eficientes para pequenos reparos domésticos.</p>
                        <hr></hr>
                        <h4>~R$80</h4>
                        <button className='botao-agendar' onClick={()=>{botaoAgendarLogin()}}>Agendar</button>
                    </article>
                    <article className='service'>
                        <h3>Jardinagem</h3>
                        <p>Cuide do seu jardim com nossos serviços de paisagismo e manutenção.</p>
                        <hr></hr>
                        <h4>~R$50</h4>
                        <button className='botao-agendar' onClick={()=>{botaoAgendarLogin()}}>Agendar</button>
                    </article>
                    <article className='service'>
                        <h3>Suporte de TI</h3>
                        <p>Assistência técnica para seus dispositivos eletrônicos.</p>
                        <hr></hr>
                        <h4>~R$100</h4>
                        <button className='botao-agendar' onClick={()=>{botaoAgendarLogin()}}>Agendar</button>
                    </article>
                </section>
                <section id='sobre'>
                    <div className='imagemParalax'></div>
                    <article className='sobreDetalhes'>
                        <h2>Sobre Nós</h2>
                        <p>A ServiçosExpress é uma empresa comprometida em fornecer soluções de alta qualidade para suas necessidades diárias. Com anos de experiência e uma equipe de profissionais qualificados, estamos prontos para atender você com excelência e dedicação.</p>
                        <button>Saiba Mais</button>
                    </article>
                </section>
                <section id='avaliacoes'>
                    <h2>Avaliações</h2>
                    <article className='avaliacao'>
                        <div className='people'>
                            <div className='imagem-olhos'>
                                <div className="olhos">
                                    <div className="olho">
                                        <div className="bola">
                                        </div>
                                    </div>
                                    <div className="olho">
                                        <div className="bola">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3>David Santos Conceição</h3>
                        </div>
                        <p>Melhoras na parte de suporte ao cliente, pois demorei ser atendido. Fora isso o serviço foi excelente, e o profissional foi bastante pontual!</p>
                        <p className='star'>★★★</p>
                    </article>
                    <article className='avaliacao'>
                        <div className='people'>
                            <div className='imagem-olhos'>
                                <div className="olhos">
                                    <div className="olho">
                                        <div className="bola">
                                        </div>
                                    </div>
                                    <div className="olho">
                                        <div className="bola">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3>Jhonata Morais</h3>
                        </div>
                        <p>Serviço de qualidade e profissionalismo, gostei do atendimento e do custo benefício.</p>
                        <p className='star'>★★★★★</p>
                    </article>
                </section>
                <section id='contato'>
                    <article className='informacoesContato'>
                        <h2>Contato</h2>
                        <div>
                            <p>Celular: (91)99818-5808</p>
                            <p>Email: servicoexpresso@gmail.com</p>
                        </div>
                        <div>
                            <address>Endereço: Rua Décima Segunda, 41 - Anitta Gerosa, Ananindeua - PA, 67033-012</address>
                        </div>
                    </article>
                </section>
            </main>
            <footer className='pe'>
                <ul className='icones'>
                    <li>
                        <a href='https://wa.me/91998185808' target='_blank'><img src='../../whatsapp.png' alt='Whatsapp' width={40}></img></a>
                        <p>Whatsapp</p>
                    </li>
                    <li>
                        <a href='https://www.facebook.com/share/NSNjyFqyXp9DA8uY/' target='_blank'><img src='../../facebook.png' alt='facebook' width={40}></img></a>
                        <p>Facebook</p>
                    </li>
                    <li>
                        <a href='/login' target='_blank'><img src='../../login.png' alt='Entrar' width={40}></img></a>
                        <p>Entrar</p>
                    </li>
                </ul>
            </footer>
            <Analytics></Analytics>
        </div>  
    )

}
export default Inicial;