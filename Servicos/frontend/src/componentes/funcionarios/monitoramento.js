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
    // funcionários
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [password, setPassword] = useState('');
    // lista pedidos
    const [agendamentos, setAgendamentos] = useState([]); // Estado para armazenar agendamentos
    const [inforFuncionarios, setInforFuncionarios] = useState([]); // Estado para armazenar agendamentos
    // cadastro funcionário
    const cadastrar = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/cadastroUsuario`, {
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
            setNameServico('');
            setDescricaoServico('');
            setPriceServico('');
            setFuncionarioSelecionado('');
            alert('Funcionário inserido com sucesso! Atualize a página!');
        })
        .catch(err => {
            alert('Erro ao cadastrar: '+err);
        });
    };
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
                                    <td>{agendamento.data}</td>
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
                            <h1>Cadastro de Funcionários</h1>
                            <form onSubmit={cadastrar}>
                                <input type="text" placeholder='Nome' value={nome} onChange={(e) => { setNome(e.target.value) }} />
                                <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <input type="tel" placeholder='(91)9 8888-8888' value={cell} onChange={(e) => { setCell(e.target.value) }} />
                                <input type='password' placeholder='Senha' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                <button type='submit'>Finalizar</button>
                            </form>  
                        </article>
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
