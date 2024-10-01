import React from "react";
import './cliente.css';

function Solicitacoes({ agendamentos }) {
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
                                <p><strong>Preço:</strong> </p>
                                <p>
                                    <strong>Status:</strong>
                                    <span className={`status status-${order.status.toLowerCase()}`}>
                                        {order.status === "PENDING" && "Pendente"}
                                        {order.status === "CONFIRMED" && "Em Andamento"}
                                        {order.status === "CANCELED" && "Cancelado"}
                                        {order.status === "CONCLUID" && "Concluído"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Solicitacoes;
