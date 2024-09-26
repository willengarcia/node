import React from "react";
import './cliente.css';

function Solicitacoes({ agendamentos }) {
    return (
        <div className="container">
            <div id="solicitacoes" className="panel">
                <h2>Minhas Solicitações</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Serviço</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="solicitacoes-body">
                        {agendamentos?.ordersAsClient?.map((order) => (
                            <tr key={order.id}>
                                <td className="idServico">{order.id}</td>
                                <td>{order.service.name}</td>
                                <td>{order.service.description}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status status-${order.status.toLowerCase()}`}>
                                        {order.status === "PENDING" && "Pendente"}
                                        {order.status === "CONFIRMED" && "Em Andamento"}
                                        {order.status === "CANCELED" && "Cancelado"}
                                        {order.status === "CONCLUID" && "Concluído"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Solicitacoes;
