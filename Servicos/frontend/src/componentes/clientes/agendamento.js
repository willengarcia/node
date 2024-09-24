import React, { useState, useEffect } from 'react';
import './cliente.css'
import Solicitacoes from './solicitacoes';

function Agendamento(){
    return(
        <>
        <div id="app">
            <h1>Agendamento de Serviços</h1>
            <div className="service-form">
                <label htmlFor="service">Serviço:</label>
                <select>
                    <option value={''} defaultChecked>Selecione um item</option>
                    <option value={''}>Limpeza Residencial</option>
                    <option value={''}>Reparos Gerais</option>
                    <option value={''}>Jardinagem</option>
                    <option value={''}>Suporte de T.I</option>
                </select>
                <label htmlFor="description">Descrição:</label>
                <textarea id="description" required="required"></textarea>
                <label htmlFor="date">Data:</label>
                <input type="date" id="date" required="required"></input>
                <label htmlFor="time">Horário:</label>
                <input type="time" id="time" required="required"></input>
                <label htmlFor="image">Imagem:</label>
                <input type="file" id="image" accept="image/*"></input>
                <button className='botaoAgendamento'>Agendar Serviço</button>
            </div>
        </div>
        <Solicitacoes></Solicitacoes>
        </>

    )
}
export default Agendamento;