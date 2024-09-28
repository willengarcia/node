import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './func.css';

function StatusServicos() {
    const [agendamentos, setAgendamentos] = useState([]); // Array vazio inicialmente
    const [inforFuncionarios, setInforFuncionarios] = useState([]);
    const [retornoUpdate, setRetornoUpdate] = useState([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('')
    const fetchAgendamentosPorStatus = async (e) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${e}`); // URL da sua API
            setAgendamentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };
    const fetchAgendamentos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`); // URL da sua API
            setAgendamentos(response.data); // Altere para response.data para pegar os dados
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };
    const fetchFuncionarios = async()=>{
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/listUser`,{
                tipo:"EMPLOYEE"
            }) // URL da sua API
            setInforFuncionarios(response.data)
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    }
    const status = (ag)=>{
        if(ag.status === 'PENDING'){
            return 'Pendente'
        }else if(ag.status === 'CONCLUID'){
            return 'Concluído!'
        }else if( ag.status === 'CONFIRMED'){
            return 'Processando'
        }else{
            return 'Cancelado'
        }
    }
    const botaoConfirmar = (ag)=>{
        if(ag.status === 'PENDING'){
            return 'Pendente'
        }else if(ag.status === 'CONCLUID'){
            return 'Concluído!'
        }else if( ag.status === 'CONFIRMED'){
            return 'Confirmado'
        }else{
            return 'Cancelado'
        }
    }
    const confirmarServico = async (e)=>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateOrder`,{
                orderId: e,
                employeeId: funcionarioSelecionado
            })
            .catch(err=>{
                alert('Erro: '+err)
            })
            setRetornoUpdate(response.data)
        }catch(err){
            alert('Erro ao inserir: '+err)
        }
    }

    useEffect(() => {
        fetchAgendamentos();
        fetchFuncionarios()
    }, []);

    return (
        <div className="containerStatus">
            <h1>Painel de Serviços e Funcionários</h1>

            {/* Filtro por status */}
            <div className="filter-container">
                <label htmlFor="statusFilter">Filtrar por status:</label>
                <select id="statusFilter" onChange={(e)=>{fetchAgendamentosPorStatus(e.target.value)}}>
                    <option value="">Todos</option>
                    <option value="PENDING">Pendente</option>
                    <option value="CONFIRMED">Ocupado</option>
                    <option value="CONCLUID">Concuído</option>
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
                                <td>{agendamento.service.name}</td> {/* Nome do serviço */}
                                <td>
                                    <span className={`status ${agendamento.status === 'PENDING' ? 'disponivel' : 'ocupado'}`}>
                                        {status(agendamento.status)}
                                    </span>
                                </td>
                                <td>
                                    <select value={funcionarioSelecionado} onChange={(e) =>
                                            setFuncionarioSelecionado(e.target.value)
                                        } required>
                                        <option value={''} defaultChecked disabled>Selecione o Funcionário</option>
                                        {
                                            inforFuncionarios.map(funcionario=>(
                                                <option key={funcionario.id} value={funcionario.id}>{funcionario.name}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td>
                                    <input type="text" placeholder="Nome do cliente" value={agendamento.client.name} readOnly />
                                </td>
                                <td>
                                    <button onClick={(e)=>{confirmarServico(e.target.parentElement.parentElement.id)}}>{botaoConfirmar(agendamento)}</button>
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

            {/* Cards de serviços para mobile PENDENTE...*/}
            <div id="servicosCards">
                {agendamentos.length > 0 ? (
                    agendamentos.map((agendamento) => (
                        <div className="card" key={agendamento.id}>
                            <div className="card-title">{agendamento.service.name}</div> {/* Nome do serviço */}
                            <div className="card-content">
                                <span className={`status ${agendamento.status === 'PENDING' ? 'disponivel' : 'ocupado'}`}>
                                        {status(agendamento)}
                                </span>
                            </div>
                            <div className="card-content">
                                <select value={funcionarioSelecionado} onChange={(e) =>
                                    setFuncionarioSelecionado(e.target.value)
                                    } required>
                                    <option value={''} defaultChecked disabled>Selecione o Funcionário</option>
                                    {
                                        inforFuncionarios.map(funcionario=>(
                                        <option key={funcionario.id} value={funcionario.id}>{funcionario.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="card-content">
                                <input type="text" placeholder="Nome do cliente" value={agendamento.client.name} readOnly />
                            </div>
                            <div className="card-content">
                                <button onClick={(e)=>{confirmarServico(e.target.parentElement.parentElement.id)}}>{botaoConfirmar(agendamento)}</button>
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
