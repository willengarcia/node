import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './func.css';

function StatusServicos() {
    const [agendamentos, setAgendamentos] = useState([]); // Array vazio inicialmente
    const [inforFuncionarios, setInforFuncionarios] = useState([]);
    const [retornoUpdate, setRetornoUpdate] = useState([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
    const navigator = useNavigate();

    const fetchAgendamentosPorStatus = async (status) => {
        try {
            const url = status ? `${process.env.REACT_APP_API_URL}/orders/${status}` : `${process.env.REACT_APP_API_URL}/orders`;
            const response = await axios.get(url); // URL da sua API
            setAgendamentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };

    const fetchFuncionarios = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/listUser`, {
                tipo: "EMPLOYEE"
            });
            setInforFuncionarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    };

    const botaoConfirmar = (agendamento) => {
        switch (agendamento.status) {
            case 'PENDING': return 'Pendente';
            case 'CONCLUID': return 'Concluído!';
            case 'CONFIRMED': return 'Confirmado';
            default: return 'Cancelado';
        }
    };

    const confirmarServico = async (agendamentoId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateOrder`, {
                orderId: agendamentoId,
                employeeId: funcionarioSelecionado
            });
            setRetornoUpdate(response.data);
            alert('Serviço confirmado, entre em contato com o cliente! Por favor, atualize a página!');
        } catch (err) {
            alert('Erro ao confirmar serviço: ' + err);
        }
    };

    useEffect(() => {
        fetchAgendamentosPorStatus(); // Chama para buscar todos os agendamentos inicialmente
        fetchFuncionarios();
    }, []);

    return (
        <div className="containerStatus">
            <h1>Painel de Serviços e Funcionários</h1>

            {/* Filtro por status */}
            <div className="filter-container">
                <label htmlFor="statusFilter">Filtrar por status:</label>
                <select id="statusFilter" onChange={(e) => fetchAgendamentosPorStatus(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="PENDING">Pendente</option>
                    <option value="CONFIRMED">Confirmado</option>
                    <option value="CONCLUID">Concluído</option>
                </select>
            </div>

            {/* Tabela de serviços para desktop */}
            <table id="servicosTable">
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Status</th>
                        <th>Funcionários Disponíveis</th>
                        <th>Cliente</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.length > 0 ? (
                        agendamentos.map((agendamento) => (
                            <tr key={agendamento.id} id={agendamento.id}>
                                <td>{agendamento.service.name}</td>
                                <td>
                                    <span className={`status ${agendamento.status === 'PENDING' ? 'disponivel' : 'ocupado'}`}>
                                        {agendamento.status}
                                    </span>
                                </td>
                                <td>
                                    <select 
                                        value={funcionarioSelecionado}
                                        onChange={(e) => setFuncionarioSelecionado(e.target.value)}
                                        disabled={agendamento.employeeId} // Desabilita se já tiver um funcionário atribuído
                                        required
                                    >
                                        <option value={''} defaultChecked disabled>
                                            {agendamento.employeeId ? 'Funcionário já atribuído' : 'Selecione o Funcionário'}
                                        </option>
                                        {inforFuncionarios.map(funcionario => (
                                            <option key={funcionario.id} value={funcionario.id}>
                                                {funcionario.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input type="text" placeholder="Nome do cliente" value={agendamento.client.name} readOnly />
                                </td>
                                <td>
                                    <button disabled={['CONFIRMED', 'CONCLUID'].includes(agendamento.status)} onClick={() => confirmarServico(agendamento.id)}>
                                        {botaoConfirmar(agendamento)}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhum agendamento encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Cards de serviços para mobile */}
            <div id="servicosCards">
                {agendamentos.length > 0 ? (
                    agendamentos.map((agendamento) => (
                        <div className="card" key={agendamento.id}>
                            <div className="card-title">{agendamento.service.name}</div>
                            <div className="card-content">
                                <span className={`status ${agendamento.status === 'PENDING' ? 'disponivel' : 'ocupado'}`}>
                                    {agendamento.status}
                                </span>
                            </div>
                            <div className="card-content">
                                <select 
                                    value={funcionarioSelecionado}
                                    onChange={(e) => setFuncionarioSelecionado(e.target.value)}
                                    disabled={agendamento.employeeId} // Desabilita se já tiver um funcionário atribuído
                                    required
                                >
                                    <option value={''} defaultChecked disabled>
                                        {agendamento.employeeId ? 'Funcionário já atribuído' : 'Selecione o Funcionário'}
                                    </option>
                                    {inforFuncionarios.map(funcionario => (
                                        <option key={funcionario.id} value={funcionario.id}>
                                            {funcionario.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="card-content">
                                <input type="text" placeholder="Nome do cliente" value={agendamento.client.name} readOnly />
                            </div>
                            <div className="card-content">
                                <button disabled={['CONFIRMED', 'CONCLUID'].includes(agendamento.status)} onClick={() => confirmarServico(agendamento.id)}>
                                    {botaoConfirmar(agendamento)}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum agendamento encontrado</p>
                )}
            </div>
        </div>
    );
}

export default StatusServicos;
