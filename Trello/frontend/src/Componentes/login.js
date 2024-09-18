import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // Para exibir mensagens de erro ao usuário

  const login = (e) => {
    e.preventDefault();

    // Verificação simples para garantir que email e senha não estão vazios
    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    axios.post('http://192.168.50.164:3333/login', {
      email: email,
      password: senha,
    })
      .then(response => {
        console.log(response.data)
        if(response.data.superUser == false){
          localStorage.setItem('authToken', response.data.token); // Armazena o token
          localStorage.setItem('userId', response.data.id); // Armazena o ID do usuário
          localStorage.setItem('superUser', response.data.superUser)
          setErrorMessage(''); // Limpa a mensagem de erro, caso exista
          navigate('/Trello')
        }else{
          console.log('Logado com sucesso!');
          setToken(response.data.token);
          localStorage.setItem('authToken', response.data.token); // Armazena o token
          localStorage.setItem('userId', response.data.id); // Armazena o ID do usuário
          setErrorMessage(''); // Limpa a mensagem de erro, caso exista
          navigate('/Lojas'); // Redireciona para a página desejada após o login
        }
      })
      .catch(error => {
        // Tratamento mais detalhado do erro
        if (error.response) {
          // Se o servidor respondeu com um status de erro
          setErrorMessage('Erro: ' + error.response.data.message || 'Erro ao fazer login. Verifique as credenciais.');
        } else if (error.request) {
          // Se a requisição foi feita mas não houve resposta do servidor
          setErrorMessage('Erro: Não foi possível se conectar ao servidor.');
        } else {
          // Outro tipo de erro (configuração incorreta ou algo inesperado)
          setErrorMessage('Erro: ' + error.message);
        }
      });
  };

  return (
    <article className='login'>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
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
  );
}

export default Login;
