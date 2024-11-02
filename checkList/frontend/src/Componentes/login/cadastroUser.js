import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useState } from  'react'
import '../../App.css';



function CadastroUser() {
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()
  const cadastro = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/cadastrar/usuario`,{
        name:nome,
        email:email,
        senha:senha,
        superUser:false
    })
    .then(response=>{
      navigate('/'); // Redireciona para a página inicial ou qualquer outra página
    })
    .catch(error=>{
      return error
    })
    } catch (error) {
      alert('Erro:', error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <article className='login'>
      <h1>Cadastro</h1>
      <form onSubmit={cadastro}>
        <input type='text' required placeholder='Nome' onChange={(e)=>{setNome(e.target.value)}} value={nome}></input>
        <input type='email' required placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
        <input type='password' required placeholder='Senha'onChange={(e)=>{setSenha(e.target.value)}} value={senha}></input>
        <button type='submit'>Finalizar</button>
      </form>
      {loading && (
          <div className="loading-overlay">
              <CircularProgress color="inherit" />
          </div>
      )}
    </article>
  );
}

export default CadastroUser;

