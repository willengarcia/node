import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from  'react'
import '../App.css'


function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const login = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:3333/login',{
      email:email,
      password:senha
    })
    .then(response=>{
      console.log('Logado! ')
      setToken(response.data.token)
      localStorage.setItem('authToken', response.data.token); // Armazena o token
      localStorage.setItem('userId', response.data.id)
      navigate('/Lojas'); // Redireciona para a página inicial ou qualquer outra página
    })
    .catch(error=>{
      alert("Erro: "+error)
    })
  }
  return (
    <article className='login'>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
        <input type='password' placeholder='Senha'onChange={(e)=>{setSenha(e.target.value)}} value={senha}></input>
        <button type='submit'>Entrar</button>
        <div>
            <p>Não tem uma conta? <a href='/cadastro/user'> Cadastre-se</a></p>
        </div>
      </form>
      
    </article>
  );
}

export default Login;

