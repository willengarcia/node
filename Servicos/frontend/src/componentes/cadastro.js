import React, { useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Cadastro(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cell, setCell] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate()
    const cadastrar = (e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/cadastroUsuario`,{
            name: nome, 
            passwordUser:password, 
            emailUser:email, 
            celularUser:cell,
            tipo:"CLIENT"
        })
        .then(res=>{
            console.log(res.data)
            setEmail('')
            setNome('')
            setCell('')
            setPassword('')
            navigator('/login')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <section className="paiCadastro">
            <article className='login'>
                <h1>Cadastro</h1>
                <form onSubmit={cadastrar}>
                    <input type="text" placeholder='Nome' value={nome} onChange={(e)=>{setNome(e.target.value)}}></input>
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                    <input type="tel" placeholder='(91)9 8888-8888' value={cell} onChange={(e)=>{setCell(e.target.value)}}></input>
                    <input type='password' placeholder='Senha' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    <button type='submit'>Finalizar</button>
                </form>  
            </article>
        </section>
    )
}

export default Cadastro;