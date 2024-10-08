import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../App.css'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate()
    const logar = (e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/loginClient`,{
            email:email, 
            password:password
        }, {
            withCredentials:false
        })
        .then(res=>{
            if(res.data.userPedidosFeitos.role === 'CLIENT'){
                localStorage.setItem('clientId', res.data.userPedidosFeitos.id)
                localStorage.setItem('token', res.data.token)
                navigator('/agendamento')
            }else if(res.data.userPedidosFeitos.role ==='EMPLOYEE'){
                localStorage.setItem('clientId', res.data.userPedidosFeitos.id)
                localStorage.setItem('token', res.data.token)
                navigator('/funcionario')
            }else if(res.data.userPedidosFeitos.role === 'SUPERUSER'){
                localStorage.setItem('clientId', res.data.userPedidosFeitos.id)
                localStorage.setItem('token', res.data.token)
                navigator('/adm')
            }else{
                alert('Contate o administrador')
            }
            
        })
        .catch(err=>{
            alert('Senha ou email incorretos! Contate o Administrador!: '+err)
        })
    }
    return(
        <section className='paiLogin'>
            <article className='login'>
                <h1>Login</h1>
                <form onSubmit={logar}>
                    <input
                        required
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <input
                        required
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