import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import '../../App.css';

function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // Para exibir mensagens de erro ao usuário

  const login = async (e) => {
    e.preventDefault();
    setLoading(true)

    // Verificação simples para garantir que email e senha não estão vazios
    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }
    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password: senha
      }, {
        withCredentials:false
      })
      .then(response => {
        if(response.data.superUser === false){
          localStorage.setItem('superUser', response.data.superUser)
          localStorage.setItem('authToken', response.data.token); // Armazena o token
          localStorage.setItem('userId', response.data.id); // Armazena o ID do usuário
          setErrorMessage(''); // Limpa a mensagem de erro, caso exista
          navigate('/equipe')
        }else{
          setToken(response.data.token);
          localStorage.setItem('superUser', response.data.superUser)
          localStorage.setItem('authToken', response.data.token); // Armazena o token
          localStorage.setItem('userId', response.data.id); // Armazena o ID do usuário
          setErrorMessage(''); // Limpa a mensagem de erro, caso exista
          navigate('/admin'); // Redireciona para a página desejada após o login
        }
        })
        .catch(error => {
          return error
      }
    );
    }catch(error){
      if (error.response) {
        // Se o servidor respondeu com um status de erro
        setErrorMessage('Erro: ' + error.response.data.message || 'Erro ao fazer login. Verifique as credenciais.');
      } else if (error.request) {
        // Se a requisição foi feita mas não houve resposta do servidor
        setErrorMessage('Erro: Não foi possível se conectar ao servidor.');
      } else {
        // Outro tipo de erro (configuração incorreta ou algo inesperado)
        setErrorMessage('Verifique as credenciais.');
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <section id='login' style={{height:'100dvh', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <article className='login'>
        <h1>Login</h1>
        <form onSubmit={login}>
          <input
            type='email'
            required
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            required
            type='password'
            placeholder='Senha'
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
          <button type='submit'>Entrar</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe o erro, se houver */}
        <div>
          <p>Não tem uma conta? <a href='/cadastro/user'>Cadastre-se</a></p>
        </div>
      </article>
      {loading && (
          <div className="loading-overlay">
              <CircularProgress color="inherit" />
          </div>
      )}
    </section>
  );
}

export default Login;
