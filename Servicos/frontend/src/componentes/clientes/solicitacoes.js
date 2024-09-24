import React from "react";
import './cliente.css'

function Solicitacoes(props){
    return(
        <div className="container">
            <div className="tabs">
                <button className="botaoAgendamento tab active" >Minhas Solicitações</button>
                <button className="botaoAgendamento tab" >Status dos Serviços</button>
            </div>
            <div id="solicitacoes" className="panel">
                <h2>Minhas Solicitações</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="solicitacoes-body">
                        <tr>
                            <td>1</td>
                            <td>Manutenção de Computador</td>
                            <td>2023-05-15</td>
                            <td><span className="status status-pendente">Pendente</span></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Instalação de Software</td>
                            <td>2023-05-14</td>
                            <td><span className="status status-em-andamento">Em Andamento</span></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Troca de Monitor</td>
                            <td>2023-05-13</td>
                            <td><span className="status status-concluído">Concluído</span></td>
                        </tr>
                    </tbody>
                </table>
                <button className="new-request">Nova Solicitação</button>
            </div>
            <div id="servicos" className="panel">
            <h2>Status dos Serviços</h2>
            <table>
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Status</th>
                        <th>Última Atualização</th>
                    </tr>
                </thead>
                <tbody id="servicos-body">
                    <tr>
                        <td>Sistema de Email</td>
                        <td>Operacional</td>
                        <td>2023-05-15 09:00</td>
                    </tr>
                    <tr>
                        <td>Rede Interna</td>
                        <td>Problemas Parciais</td>
                        <td>2023-05-15 10:30</td>
                    </tr>
                    <tr>
                        <td>Servidor de Arquivos</td>
                        <td>Operacional</td>
                        <td>2023-05-14 18:00</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}
export default Solicitacoes;