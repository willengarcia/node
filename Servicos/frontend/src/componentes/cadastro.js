import React from "react";
import '../App.css'

function Cadastro(){
    return(
        <section className="paiCadastro">
            <article className='login'>
                <h1>Cadastro</h1>
                <form>
                    <input type="text" placeholder='Nome'></input>
                    <input type="email" placeholder='Email'></input>
                    <input type="tel" placeholder='(91)9 8888-8888'></input>
                    <input type='password' placeholder='Senha'></input>
                    <button type='submit'>Finalizar</button>
                </form>  
            </article>
        </section>
    )
}

export default Cadastro;