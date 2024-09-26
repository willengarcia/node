import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../App.css'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate()
    const logar = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3333/loginClient',{
            email:email, 
            password:password
        }, {
            withCredentials:false
        })
        .then(res=>{
            console.log(res.data)
            if(res.data.userPedidosFeitos.role === 'CLIENT'){
                localStorage.setItem('clientId', res.data.id)
                navigator('/agendamento')
            }else if(res.data.userPedidosFeitos.role ==='EMPLOYEE'){
                navigator('/adm')
            }else if(res.data.userPedidosFeitos.role === 'SUPERUSER'){
                console.log('superUser')
            }else{
                alert('Contate o administrador')
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <section className='paiLogin'>
            <article className='login'>
                <h1>Login</h1>
                <form onSubmit={logar}>
                    <input
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <input
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
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