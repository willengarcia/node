import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './func.css';

function Monitoramento() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [password, setPassword] = useState('');
    const [agendamentos, setAgendamentos] = useState([]); // Estado para armazenar agendamentos
    const navigator = useNavigate();

    const cadastrar = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3333/cadastro', {
            name: nome,
            passwordUser: password,
            emailUser: email,
            celularUser: cell,
            tipo: 'EMPLOYEE'
        }, {
            withCredentials: false
        })
        .then(res => {
            console.log(res.data);
            setEmail('');
            setNome('');
            setCell('');
            setPassword('');
            alert('Funcionário inserido com sucesso!');
        })
        .catch(err => {
            console.log(err);
        });
    };

    // Função para buscar agendamentos
    const fetchAgendamentos = async () => {
        try {
            const response = await axios.get('http://localhost:3333/orders'); // URL da sua API
            setAgendamentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };

    useEffect(() => {
        fetchAgendamentos(); // Chama a função ao montar o componente
    }, []);

    return (
        <>
            <div className="dashboard">
                <h1>Painel de Monitoramento de Agendamento de Serviços</h1>
                
                <div className="stats">
                    <div className="stat-card">
                        <h3>Agendamentos Hoje</h3>
                        <p id="todayAppointments">0</p>
                    </div>
                    <div className="stat-card">
                        <h3>Confirmados</h3>
                        <p id="confirmedAppointments">3</p>
                    </div>
                    <div className="stat-card">
                        <h3>Pendentes</h3>
                        <p id="pendingAppointments">3</p>
                    </div>
                    <div className="stat-card">
                        <h3>Cancelados</h3>
                        <p id="canceledAppointments">1</p>
                    </div>
                </div>
                
                <div className="appointments">
                    <h2>Agendamentos Recentes</h2>
                    <table id="appointmentsTable">
                        <tbody>
                            <tr>
                                <th>Data</th>
                                <th>Hora</th>
                                <th>Cliente</th>
                                <th>Serviço</th>
                                <th>Status</th>
                            </tr>
                            {agendamentos.map(agendamento => (
                                <tr key={agendamento.id}>
                                    <td>{agendamento.data}</td>
                                    <td>{agendamento.hota}</td>
                                    <td>{agendamento.client.name}</td>
                                    <td>{agendamento.service.name}</td>
                                    <td>
                                        <span className={`status ${agendamento.status.toLowerCase()}`}>
                                            {agendamento.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <h1>Inserção de Funcionários</h1>
                <section className="paiCadastroFuncionario">
                    <article className='login'>
                        <h1>Cadastro</h1>
                        <form onSubmit={cadastrar}>
                            <input type="text" placeholder='Nome' value={nome} onChange={(e) => { setNome(e.target.value) }} />
                            <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="tel" placeholder='(91)9 8888-8888' value={cell} onChange={(e) => { setCell(e.target.value) }} />
                            <input type='password' placeholder='Senha' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <button type='submit'>Finalizar</button>
                        </form>  
                    </article>
                </section>
            </div>
        </>
    );
}

export default Monitoramento;
