import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from  'react'
import '../App.css'



function CadastroUser() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()
  const cadastro = (e)=>{
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/cadastrar/usuario`,{
        name:nome,
        email:email,
        senha:senha,
        superUser:false
    })
    .then(response=>{
      navigate('/'); // Redireciona para a página inicial ou qualquer outra página
    })
    .catch(error=>{
      alert('Usuário já cadastrado! Contate o Administrador: '+error)
    })
  }
  return (
    <article className='login'>
      <h1>Cadastro</h1>
      <form onSubmit={cadastro}>
        <input placeholder='Nome' onChange={(e)=>{setNome(e.target.value)}} value={nome}></input>
        <input placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
        <input type='password' placeholder='Senha'onChange={(e)=>{setSenha(e.target.value)}} value={senha}></input>
        <button type='submit'>Finalizar</button>
      </form>
      
    </article>
  );
}

export default CadastroUser;

