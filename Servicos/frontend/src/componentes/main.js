import React, { useState, useEffect } from 'react';
import '../App.css'

function Main(props){
    return(
        <main className={`conteudo ${props.ativo?"ativo":""}`}>
            <section id='servicos'>
                <h2>Nosso Serviços</h2>
                <div className='services'>
                    <div className="service-card">
                        <div className="service-icon">🏠</div>
                        <h3>Limpeza Residencial</h3>
                        <p>Mantenha sua casa impecável com nossa equipe especializada.</p>
                    </div>
                    <div className="service-card">
                    <div className="service-icon">🔧</div>
                        <h3>Reparos Gerais</h3>
                        <p>Soluções rápidas e eficientes para pequenos reparos domésticos.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">🌳</div>
                        <h3>Jardinagem</h3>
                        <p>Cuide do seu jardim com nossos serviços de paisagismo e manutenção.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">🖥️</div>
                        <h3>Suporte de TI</h3>
                        <p>Assistência técnica para seus dispositivos eletrônicos.</p>
                    </div>
                </div>
                <a href="#contato" className="cta-button">Solicite um Orçamento</a>
            </section>
            <section id="sobre">
                <h2>Sobre Nós</h2>
                <p>A ServiçosExpress é uma empresa comprometida em fornecer soluções de alta qualidade para suas necessidades diárias. Com anos de experiência e uma equipe de profissionais qualificados, estamos prontos para atender você com excelência e dedicação.</p>
            </section>
            <section id="contato">
                <h2>Entre em Contato</h2>
                <form id="contact-form">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" required="" placeholder='Davi Santos'/>
                    
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" name="email" placeholder='example@gmail.com'/>

                    <label htmlFor="celular">Celular:</label>
                    <input type="text" id="celular" name="celular" required="" placeholder='(91) 98888-8888'/>
                    
                    <label htmlFor="service">Serviço de Interesse:</label>
                    <select id="service" name="service">
                        <option value="limpeza">Limpeza Residencial</option>
                        <option value="reparos">Reparos Gerais</option>
                        <option value="jardinagem">Jardinagem</option>
                        <option value="ti">Suporte de TI</option>
                    </select>
                    
                    <label htmlFor="message">Mensagem:</label>
                    <textarea id="message" name="message" required="" placeholder='Diga a situação que está precisando.'></textarea>
                    
                    <button type="submit">Enviar</button>
                </form>
            </section>
        </main>
    )
}
export default Main;