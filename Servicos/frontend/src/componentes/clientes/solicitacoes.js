import React, {useState} from "react";
import './cliente.css';
import axios from "axios";

function Solicitacoes({ agendamentos }) {
    const [showPopup, setShowPopup] = useState(false);
    const [avaliable, setAvaliable] = useState('')
    const [comment, setComment] = useState('')
    const togglePopup = (order) => {
        localStorage.setItem('orderId', order.id)
        setShowPopup(!showPopup);
    };
    const addReview = (e)=>{
        e.preventDefault();
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/addReview`,{
                clientId:localStorage.getItem('clientId'),
                rating:avaliable,
                comment:comment,
                orderId:localStorage.getItem('orderId')
            })
            .then(res => {
                alert('Enviado');
            })
            .catch(err => {
                alert('Erro ao comentar: ' + err);
            });
        } catch (error) {
            alert('Erro ao receber: '+error)
        }
    }
    return (
        <div className="container">
            <div id="solicitacoes" className="panel">
                <h2>Minhas Solicitações</h2>
                <div className="cards-container">
                    {agendamentos?.ordersAsClient?.map((order) => (
                        <div key={order.id} className="card">
                            <div className="card-header">
                                <h3>ID: {order.id}</h3>
                            </div>
                            <div className="card-body">
                                <p><strong>Serviço:</strong> {order.service.name}</p>
                                <p><strong>Descrição:</strong> {order.service.description}</p>
                                <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p><strong>Preço Média:</strong> R${order.service.price || '50.00'} </p>
                                <p>
                                    <strong>Status:</strong>
                                    <span className={`status status-${order.status.toLowerCase()}`}>
                                        {order.status === "PENDING" && "Pendente"}
                                        {order.status === "CONFIRMED" && "Em Andamento"}
                                        {order.status === "CANCELED" && "Cancelado"}
                                        {order.status === "CONCLUID" && "Concluído"}
                                    </span>
                                </p>
                                {order.status === "PENDING" && <button className='botaoAgendamento'>Aguarde</button>}
                                {order.status === "CONFIRMED" && <button className='botaoAgendamento'>Aguarde</button>}
                                {order.status === "CANCELED" && <button className='botaoAgendamento'>Reenviar</button>}
                                {order.status === "CONCLUID" && <button className='botaoAgendamento' onClick={()=>{togglePopup(order)}}>Avaliar</button>}
                            </div>
                        </div>
                    ))}
                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <button className="botaoPopUpFechar" onClick={togglePopup}></button>
                                <h2>Avaliação do Serviço</h2>
                                <form onSubmit={addReview}>
                                    <label htmlFor="description">Descrição:</label>
                                    <textarea id="description" value={comment} onChange={(e) => { setComment(e.target.value) }}></textarea>
                                    <label htmlFor="number">De 1 a 5:</label>
                                    <input type="number" id="number" required value={avaliable} onChange={(e) => { setAvaliable(e.target.value) }} min='0' max='5' />
                                    <button className="botaoPopUpEnviar" type="submit">Enviar</button>
                                </form>
                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Solicitacoes;
