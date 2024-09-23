import React, { useState, useEffect } from 'react';
import '../App.css'

function Login(){
    return(
        <section className='paiLogin'>
            <article className='login'>
                <h1>Login</h1>
                <form >
                <input
                    placeholder='Email'
                    
                />
                <input
                    type='password'
                    placeholder='Senha'
                    
                />
                <button type='submit'>Entrar</button>
                </form>
                <div>
                <p>Não tem uma conta? <a href='/cadastro'>Cadastre-se</a></p>
                </div>
            </article>
        </section>
    )
}
export default Login;