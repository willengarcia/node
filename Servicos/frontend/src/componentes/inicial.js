import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import residencia from '../assets/residencia.png'
import reparo from '../assets/reparos.png'
import jardinagem from '../assets/jardinagem.png'
import informatica from '../assets/informatica.png'
import sobre from '../assets/sobre.png'
import { Analytics } from "@vercel/analytics/react"
function Inicial({children}){
    const [menuAberto, setMenuAberto] = useState(false);
    const [detalhesExibir, setDetalhesExibir] = useState(false);
    const navigator = useNavigate()
    const alternarMenu = () => {
        if(window.innerHeight>=600){
            setMenuAberto(!menuAberto); // Alterna o estado do menu entre aberto e fechado
        }
    };   
    const exibirDetalhes  = ()=>{
        setDetalhesExibir(!detalhesExibir)
    }     
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
                <h1>Seja Bem-Vindo ao Serviço Expresso</h1>
                <div>
                    <p>Sua solução completa em serviços profissionais</p>
                </div>
                
                <button onClick={()=>{botaoAgendarLogin()}} aria-label='Login site'>Entrar</button>
            </header>
            <main className='corpo'>
                <section id='cards-servicos'>
                    <h2>Nossos Serviços</h2>
                    <article className='service'>
                        <img src={residencia} alt='Residencia' className='image-service'></img>
                        <h3>Limpeza Residencial</h3>
                        <div className='descricao-servico'>
                            <h3>Limpeza</h3>
                            <p>Os serviços de limpeza residencial incluem a realização de tarefas como varrição, poeira, lavagem de pisos, limpeza de vidros, banheiro e cozinha, além de organização de ambientes. Profissionais especializados oferecem soluções personalizadas, garantindo um lar mais higienizado e confortável. Esses serviços podem ser recorrentes ou pontuais, atendendo às necessidades de cada cliente, proporcionando mais praticidade e tempo livre para quem busca uma casa sempre limpa e bem cuidada.</p>
                        </div>
                        <p>Mantenha sua casa impecável com nossa equipe especializada.</p>
                        <hr></hr>
                        <div className='preco'>
                            <h4>R$ ~ 70,00 <span className='duvida'>?</span></h4>
                            <button className='botao-agendar' onClick={()=>{botaoAgendarLogin()}}>Agendar</button>  
                        </div>
                    </article>
                    <article className='service'>
                        <img src={reparo} alt='Residencia' className='image-service'></img>
                        <h3>Reparos Gerais</h3>
                        <div className='descricao-servico'>
                            <h3>Reparos</h3>
                            <p>Os serviços de reparos gerais englobam uma variedade de tarefas para manutenção e conserto de elementos dentro da residência, como conserto de encanamentos, instalações elétricas, pintura, troca de telhas, ajuste de portas e janelas, entre outros. Esses serviços são realizados por profissionais capacitados, garantindo que problemas pequenos ou grandes sejam resolvidos de forma rápida e eficaz. Ideal para quem precisa de uma manutenção periódica ou para situações de emergência, os reparos gerais ajudam a manter o lar funcional e seguro.</p>
                        </div>
                        <p>Soluções rápidas e eficientes para pequenos reparos domésticos.</p>
                        <hr></hr>
                        <div className='preco'>
                            <h4>R$ ~ 80,00 <span className='duvida'>?</span></h4>
                            <button className='botao-agendar' onClick={()=>{botaoAgendarLogin()}}>Agendar</button>
                        </div>
                        
                    </article>
                    <article className='service'>
                        <img src={jardinagem} alt='Residencia' className='image-service'></img>
                        <h3>Jardinagem</h3>
                        <div className='descricao-servico'>
                            <h3>Jardinagem</h3>
                            <p>Os serviços de jardinagem incluem cuidados com plantas, jardins e paisagismo, como poda, corte de grama, plantio de flores e árvores, controle de pragas, adubação e irrigação. Profissionais especializados garantem o desenvolvimento saudável do jardim, criando e mantendo ambientes verdes e agradáveis. Esses serviços podem ser recorrentes ou pontuais, atendendo desde a criação de novos jardins até a manutenção de espaços já existentes. A jardinagem contribui para a estética e o bem-estar do ambiente residencial, proporcionando um espaço mais natural e harmonioso.</p>
                        </div>
                        <p>Cuide do seu jardim com nossos serviços de paisagismo e manutenção.</p>
                        <hr></hr>
                        <div className='preco'>
                            <h4>R$ ~ 50,00 <span className='duvida'>?</span></h4>
                            <button className='botao-agendar' onClick={()=>{botaoAgendarLogin()}}>Agendar</button>
                        </div>
                    </article>
                    <article className='service'>
                        <img src={informatica} alt='Residencia' className='image-service'></img>
                        <h3>Suporte de TI</h3>
                        <div className='descricao-servico'>
                            <h3>Informática</h3>
                            <p>Os serviços de TI (Tecnologia da Informação) englobam uma ampla gama de soluções para atender às necessidades tecnológicas de empresas e indivíduos. Isso inclui suporte técnico, manutenção de redes e servidores, instalação e configuração de software e hardware, gestão de infraestrutura de TI, segurança da informação, recuperação de dados, monitoramento de sistemas e backup. Além disso, serviços especializados como consultoria em TI e desenvolvimento de soluções personalizadas (como aplicativos e sistemas) também são oferecidos. Profissionais de TI ajudam a otimizar o uso de tecnologias, garantindo a eficiência operacional, a segurança de dados e a continuidade dos negócios.</p>
                        </div>
                        <p>Assistência técnica para seus dispositivos eletrônicos.</p>
                        <hr></hr>
                        <div className='preco'>
                            <h4>R$ ~ 100,00 <span className='duvida'>?</span></h4>
                            <button className='botao-agendar' onClick={()=>{botaoAgendarLogin()}}>Agendar</button>
                        </div>
                    </article>
                </section>
                <section id='sobre'>
                    {/* <div className='imagemParalax'></div> */}
                    <img src={sobre} alt='Equipe Serviços Expressos' id='imagem-equipe'></img>
                    <article className='sobreDetalhes'>
                        <h2>Sobre Nós</h2>
                        <p>A ServiçosExpress é uma empresa comprometida em fornecer soluções de alta qualidade para suas necessidades diárias. Com anos de experiência e uma equipe de profissionais qualificados, estamos prontos para atender você com excelência e dedicação.</p>
                        <button onClick={exibirDetalhes}>Saiba Mais</button>
                        {detalhesExibir && 
                            (<div className={`${detalhesExibir ? 'detalhes-sobre-exibido' : ''}`}>
                                <aside>
                                    <h3>Sobre o Serviço Expresso</h3>
                                    <p>
                                    A ServiçosExpress é uma empresa comprometida em conectar quem precisa de serviços com quem busca oportunidades de trabalho. Fundada em 2024 por dois empreendedores visionários, nossa missão nasceu do desejo de ajudar pessoas a encontrar empregos e oferecer soluções práticas para as necessidades do dia a dia. Com uma equipe qualificada e dedicada, combinamos inovação e compromisso para atender nossos clientes com excelência, sempre promovendo o crescimento mútuo entre empregadores e trabalhadores.
                                    </p>
                                    <button onClick={()=>{botaoAgendarLogin()}} aria-label='Login site'>Entrar</button>
                                    <button onClick={exibirDetalhes} aria-label='Fechar Janela'>Fechar</button>
                                </aside>
                            </div>)
                        }
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