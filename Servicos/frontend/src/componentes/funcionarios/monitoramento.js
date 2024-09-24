import React from 'react';
import './func.css'

function Monitoramento(){
    return(
        <>
        <div class="dashboard">
            <h1>Painel de Monitoramento de Agendamento de Serviços</h1>
            
            <div class="stats">
                <div class="stat-card">
                    <h3>Agendamentos Hoje</h3>
                    <p id="todayAppointments">0</p>
                </div>
                <div class="stat-card">
                    <h3>Confirmados</h3>
                    <p id="confirmedAppointments">3</p>
                </div>
                <div class="stat-card">
                    <h3>Pendentes</h3>
                    <p id="pendingAppointments">3</p>
                </div>
                <div class="stat-card">
                    <h3>Cancelados</h3>
                    <p id="canceledAppointments">1</p>
                </div>
            </div>
            
            <div class="appointments">
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
                        <tr>
                            <td>2023-06-01</td>
                            <td>09:00</td>
                            <td>João Silva</td>
                            <td>Corte de Cabelo</td>
                            <td><span class="status confirmed">Confirmed</span></td>
                        </tr>
                        <tr>
                            <td>2023-06-01</td>
                            <td>10:30</td>
                            <td>Maria Souza</td>
                            <td>Manicure</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>2023-06-01</td>
                            <td>13:00</td>
                            <td>Pedro Santos</td>
                            <td>Barba</td><td><span class="status confirmed">Confirmed</span></td>
                        </tr>
                        <tr>
                            <td>2023-06-01</td>
                            <td>15:00</td>
                            <td>Ana Oliveira</td>
                            <td>Coloração</td>
                            <td><span class="status canceled">Canceled</span></td>
                        </tr>
                        <tr>
                            <td>2023-06-02</td>
                            <td>11:00</td>
                            <td>Carlos Ferreira</td>
                            <td>Corte de Cabelo</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>2023-06-02</td>
                            <td>10:00</td>
                            <td>Novo Cliente</td>
                            <td>Serviço Aleatório</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>2023-06-02</td>
                            <td>19:00</td>
                            <td>Novo Cliente</td>
                            <td>Serviço Aleatório</td>
                            <td><span class="status confirmed">Confirmed</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default Monitoramento;