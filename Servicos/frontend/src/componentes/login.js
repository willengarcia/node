import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from 'axios'
import '../App.css'

function Login(){
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate()
    const logar = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/loginClient`,{
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
        }catch(err){
            alert('Algo deu errado: '+err)
        } finally{
            setLoading(false)
        }
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
                    <button type='submit' disabled={loading}>{loading?'Loading...':'Entrar'}</button>
                </form>
                <div>
                    <p>Não tem uma conta? <a href='/cadastro'>Cadastre-se</a></p>
                </div>
                {loading && (
                    <div className="loading-overlay">
                        <CircularProgress color="inherit" />
                    </div>
                )}
            </article>
        </section>
    )
}
export default Login;