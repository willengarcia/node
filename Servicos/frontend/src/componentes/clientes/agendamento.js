import React, { useState, useEffect } from 'react';
import './cliente.css';
import Solicitacoes from './solicitacoes';
import axios from 'axios';

function Agendamento() {
    const [servicoId, setServicoId] = useState('');
    const [userId, setUserId] = useState('');
    const [Agendamento, setAgendamentos] = useState([]);
    const [listServices, setListService] = useState([]);
    const [select, setSelect] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [time, setTime] = useState('');
    const [image, setImage] = useState('');

    const listAgendamentos = async (id) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listServiceClient/${id}`)
            return response.data
        }catch(err){
            console.log(err);
            return [];
        }
    };

    const listServicos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listServices`);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const tratarAgendamentos = (data) => {
        setAgendamentos(data);
    };

    const tratarServicos = (data) => {
        setListService(data)
    };

    const createService = (e) => {
        e.preventDefault();
        axios.post(`https://services-zeta-gold.vercel.app/createService`, {
            servicoId: servicoId,
            description: descricao,
            dataTime: data,
            hora: time,
            userId: userId
            // falta colocar a imagem, tanto no backend, quanto no front
        })
            .then(res => {
                alert('Agendamento feito!');
            })
            .catch(err => {
                alert('Erro ao agendar Serviço: ' + err);
            });
    };

    useEffect(() => {
        setUserId(localStorage.getItem('clientId'))
        // listAgendamentos(clientId);
        // tratarDados(Agendamento);
        const fetchAgendamentos = async ()=>{
            const data = await listAgendamentos(localStorage.getItem('clientId'))
            tratarAgendamentos(data)
        }
        fetchAgendamentos()
        const fetchServicos = async () => {
            const data = await listServicos();
            tratarServicos(data);
        };
        fetchServicos();
    }, []);

    return (
        <>
            <div id="app">
                <h1>Agendamento de Serviços</h1>
                <form className="service-form" onSubmit={createService}>
                    <label htmlFor="service">Serviço:</label>
                    <select onChange={(e) => {
                        setSelect(e.target.value);
                        setServicoId(e.target.value); // Atualiza o servicoId aqui
                    }}>
                        <option value="" defaultChecked>Selecione um item</option>
                        {listServices.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    <label htmlFor="description">Descrição:</label>
                    <textarea id="description" required value={descricao} onChange={(e) => { setDescricao(e.target.value) }}></textarea>
                    <label htmlFor="date">Data:</label>
                    <input type="date" id="date" required value={data} onChange={(e) => { setData(e.target.value) }} />
                    <label htmlFor="time">Horário:</label>
                    <input type="time" id="time" required value={time} onChange={(e) => { setTime(e.target.value) }} />
                    <label htmlFor="image">Imagem:</label>
                    <input type="file" id="image" accept="image/*" onChange={(e) => { setImage(e.target.files[0]) }} />
                    <button className='botaoAgendamento' type='submit'>Agendar Serviço</button>
                </form>
            </div>
            <Solicitacoes agendamentos={Agendamento}/>
        </>
    );
}

export default Agendamento;
