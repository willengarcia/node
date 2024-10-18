import React, { useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

function Cadastro() {
    const [loading, setLoading] = useState(false)
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [password, setPassword] = useState('');
    const [radio, setRadio] = useState('');
    const navigate = useNavigate();

    const cadastrar = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/cadastroUsuario`, {
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
        }catch(err){
            alert('Algo deu errado: '+err)
        }finally{
            setLoading(false)
        }
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
                    <button type='submit' disabled={loading}>{loading?'Cadastrando...':'Cadastrar'}</button>
                </form>  
            </article>
            {loading && (
                <div className="loading-overlay">
                    <CircularProgress color="inherit" />
                </div>
            )}
        </section>
    );
}

export default Cadastro;
