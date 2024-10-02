import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './func.css';
import StatusServicos from './statusServicos';

function Monitoramento() {
    // servico
    const [nameServico, setNameServico] = useState('')
    const [descricaoServico, setDescricaoServico] = useState('') 
    const [priceServico, setPriceServico] = useState('')
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('')
    // lista pedidos
    const [agendamentos, setAgendamentos] = useState([]); // Estado para armazenar agendamentos
    const [inforFuncionarios, setInforFuncionarios] = useState([]); // Estado para armazenar agendamentos
    // Cadastra serviço
    const cadastrarServico = (e) =>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/addServiceFuncio`,{
            name: nameServico,
            description: descricaoServico,
            price: priceServico,
            funcionarioID: funcionarioSelecionado
        })
        .then(res=>{
            alert("Serviço Cadastrado! Atualize a página!")
        })
    }
    // Lista funcionários
    const fetchFuncionarios = async()=>{
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/listUser`,{
                tipo:"EMPLOYEE"
            }); // URL da sua API
            setInforFuncionarios(response.data)
            
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    }
    // lista agendamentos
    const fetchAgendamentos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`); // URL da sua API
            setAgendamentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };
    // chama a função de fetchAgendamentos assim que a página carrega
    useEffect(() => {
        fetchAgendamentos(); // Chama a função ao montar o componente
        fetchFuncionarios()
        const handlePopState = () => {
            localStorage.removeItem('token'); // Altere para o item que deseja remover
            localStorage.removeItem('clientId')
        };

        // Função para limpar o localStorage quando o usuário fecha a aba/janela
        const handleBeforeUnload = () => {
            localStorage.clear(); // Limpa todo o localStorage (ou use removeItem se quiser remover algo específico)
        };

        // Ouve o evento "popstate" para detectar a navegação para trás
        window.addEventListener('popstate', handlePopState);

        // Ouve o evento "beforeunload" para detectar o fechamento da aba ou janela
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Remove os event listeners ao desmontar o componente para evitar vazamentos de memória
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
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
                                <th>Agente</th>
                                <th>Status</th>
                            </tr>
                            {agendamentos.length>0?agendamentos.map(agendamento => (
                                <tr key={agendamento.id}>
                                    <td>{(() => {
                                        const [year, month, day] = agendamento.data.split('-');
                                        return `${day}/${month}`;
                                    })()}</td>
                                    <td>{agendamento.hota}</td>
                                    <td>{agendamento.client.name}</td>
                                    <td>{agendamento.service.name}</td>
                                    <td>{agendamento.employee ? agendamento.employee.name : 'nulo'}</td>
                                    <td>
                                        <span className={`status ${agendamento.status.toLowerCase()}`}>
                                            {agendamento.status}
                                        </span>
                                    </td>
                                </tr>
                            )):
                                <tr>
                                    <td>Nulo</td>
                                    <td>Nulo</td>
                                    <td>Nulo</td>
                                    <td>Nulo</td>
                                    <td>Nulo</td>
                                    <td>Nulo</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <StatusServicos></StatusServicos>
                </div>

                <article className='administracao'>
                    <h1>Administração</h1>
                    <section className="paiCadastroFuncionario">
                        <article className='login'>
                            <h1>Cadastro de Serviços</h1>
                            <form onSubmit={cadastrarServico}>
                                <input type="text" placeholder='Ex: Encanador' value={nameServico} onChange={(e) => { setNameServico(e.target.value) }}  required/>
                                <textarea type="text" placeholder='Digite as funcionalidades do cargo' value={descricaoServico} onChange={(e) => { setDescricaoServico(e.target.value) }}  required/>
                                <input type="number" placeholder='50.30' value={priceServico} onChange={(e) => { setPriceServico(e.target.value) }}  required/>
                                <select value={funcionarioSelecionado} onChange={(e) =>
                                        setFuncionarioSelecionado(e.target.value)
                                    } required>
                                    <option value={''} defaultChecked disabled>Selecione o Funcionário</option>
                                    {
                                        inforFuncionarios.length>0?inforFuncionarios.map(funcionario=>(
                                            <option key={funcionario.id} value={funcionario.id}>{funcionario.name}</option>
                                        )):''
                                    }
                                </select>
                                <button type='submit'>Finalizar</button>
                            </form>  
                        </article>
                    </section>
                </article>
            </div>
        </>
    );
}

export default Monitoramento;
