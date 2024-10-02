import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './funcio.css'

function Solicitacao(){
    const [agendamentos, setAgendamentos] = useState([]); // Estado para armazenar agendamentos
    const [review, setReview] = useState([])
    const fetchAgendamentos = async () => {
        try {
            const employeeId = localStorage.getItem('clientId')
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${employeeId}`); // URL da sua API
            setAgendamentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    };
    const fetchReview = async ()=>{
        try {
            const funcionarioId = localStorage.getItem('clientId')
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listReview/${funcionarioId}`)
            setReview(response.data)
        } catch (error) {
            console.log('Erro ao buscar avaliações: '+error)
        }
    }
    const confirmarServico = async (agendamentoId) => {
        try {
            const id = localStorage.getItem('clientId')
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateOrder`, {
                orderId: agendamentoId,
                employeeId: id,
                status:'CONCLUID'
            });
            setAgendamentos(response.data);
            alert('Serviço confirmado, entre em contato com o cliente! Por favor, atualize a página!');
        } catch (err) {
            alert('Erro ao confirmar serviço: ' + err);
        }
    };
    // chama a função de fetchAgendamentos assim que a página carrega
    useEffect(() => {
        fetchAgendamentos(); // Chama a função ao montar o componente
        fetchReview();
        const handlePopState = () => {
            localStorage.removeItem('authToken'); // Altere para o item que deseja remover
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
    const statusBotao = (agendamento)=>{
        if(agendamento.status === 'CONFIRMED'){
            return <button onClick={(e)=>{confirmarServico(agendamento.id)}}>Concluir</button>
        }else if(agendamento.status === 'PENDING'){
            return <button>Pedente</button>
        }else if(agendamento.status === 'CONCLUID'){
            return <button>Concluído</button>
        }else{
            return <button>Cancelado</button>
        }
    }
    return (
        <>
            <div className="container">
                <h1>Sistema de Gestão</h1>
                
                <h2>Painel de Pedidos</h2>
                <div className="pedidos-grid" id="pedidosGrid">
                    {
                        agendamentos.length>0?agendamentos.map(
                            agendamento =>(
                                <div className="pedido-card" id={`${agendamento.id}`}>
                                    <div className="pedido-header">{(() => {
                                        const [year, month, day] = agendamento.data.split('-');
                                        return `${day}/${month}/${year}`;
                                    })()} - {agendamento.hota}</div>
                                    {/* <img className="pedido-foto" src="https://websimsystems.com/employee-management/images/monitor.jpg" alt="Imagem do pedido: Solicito a compra de um novo monitor para meu computador." width="300" height="200"></img> */}
                                    <div className="pedido-body">
                                        <div className="pedido-info">
                                            <p><strong>Solicitante:</strong>{agendamento.client.name}</p>
                                            <p><strong>Contato:</strong>{agendamento.client.celular??'nulo'}</p>
                                        </div>
                                        <h4 className="pedido-descricao">{agendamento.description}</h4>
                                        {
                                            statusBotao(agendamento)
                                        }
                                    </div>
                                </div>
                            )
                        ): <h1>Ainda não há nenhuma solicitação!</h1>
                    }

                </div>

                <div className="section-divider"></div>

                <h2>Feedback dos Clientes</h2>
                <div className="feedback-grid" id="feedbackGrid">
                    {/* Inserido automaticamente */}
                    {review.length >0?review.map(avali =>(
                        <div className="feedback-card" id={avali.id}>
                            <div className="feedback-header" id={avali.client.id}>Cliente: {avali.client.name} | Serviço: {avali.order.service.name}</div>
                            <div className="feedback-body">
                                    {avali.rating === 5 && <div className="estrelas">★★★★★</div>}
                                    {avali.rating === 4 && <div className="estrelas">★★★★</div>}
                                    {avali.rating === 3 && <div className="estrelas">★★★</div>}
                                    {avali.rating === 2 && <div className="estrelas">★★</div>}
                                    {avali.rating === 1 && <div className="estrelas">★</div>}
                                    {avali.rating === 0 && <div className="estrelas">👎</div>}
                                <h5 className="feedback-descricao">{avali.comment || 'Sem comentários!'}</h5>
                            </div>
                        </div>
                    )):<p>Sem Avaliações ainda</p>}
                </div>
            </div>
        </>
    )
}

export default Solicitacao;