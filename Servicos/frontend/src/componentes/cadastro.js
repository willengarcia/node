import React, { useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [password, setPassword] = useState('');
    const [radio, setRadio] = useState('');
    const navigate = useNavigate();

    const cadastrar = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/cadastroUsuario`, {
            name: nome, 
            passwordUser: password, 
            emailUser: email, 
            celularUser: cell,
            tipo: radio
        })
        .then(res => {
            navigate('/login');
        })
        .catch(err => {
            alert('Erro ao se cadastrar: ' + err);
        });
    };

    return (
        <section className="paiCadastro">
            <article className='login'>
                <h1>Cadastro</h1>
                <form onSubmit={cadastrar}>
                    <div className="radios">
                        <label htmlFor="client">Cliente</label>
                        <input
                            required
                            name='valores' 
                            type="radio" 
                            value='CLIENT' 
                            id="client"
                            checked={radio === 'CLIENT'}
                            onChange={(e) => setRadio(e.target.value)} 
                        />
                        
                        <label htmlFor="funcionario">Funcionário</label>
                        <input 
                            required
                            name="valores" 
                            type="radio" 
                            value='EMPLOYEE' 
                            id="funcionario" 
                            checked={radio === 'EMPLOYEE'}
                            onChange={(e) => setRadio(e.target.value)} 
                        />
                    </div>

                    <input 
                        type="text" 
                        placeholder='Nome' 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        required
                        type="tel" 
                        placeholder='(91)9 8888-8888' 
                        value={cell} 
                        onChange={(e) => setCell(e.target.value)} 
                    />
                    <input 
                        type='password' 
                        placeholder='Senha' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type='submit'>Finalizar</button>
                </form>  
            </article>
        </section>
    );
}

export default Cadastro;
