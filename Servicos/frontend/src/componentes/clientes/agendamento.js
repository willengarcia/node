import React, { useState, useEffect } from 'react';
import './cliente.css';
import Solicitacoes from './solicitacoes';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

function Agendamento() {
    const [loading, setLoading] = useState(false)
    const [servicoId, setServicoId] = useState('');
    const [userId, setUserId] = useState('');
    const [Agendamento, setAgendamentos] = useState([]);
    const [listServices, setListService] = useState([]);
    const [, setSelect] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [time, setTime] = useState('');
    const [image, setImage] = useState(null); // Armazena o arquivo de imagem

    const listAgendamentos = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listServiceClient/${id}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const listServicos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listServices`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
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
        setListService(data);
    };

    const createService = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(); // Cria o objeto FormData
        formData.append('servicoId', servicoId);
        formData.append('description', descricao);
        formData.append('dataTime', data);
        formData.append('hora', time);
        formData.append('userId', userId);

        if (image) {
            formData.append('image', image); // Adiciona a imagem ao FormData, se existir
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/createService`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data', // Define o cabeçalho correto para upload de arquivos
                },
            });

            alert('Agendamento feito!');
        } catch (err) {
            alert('Erro ao agendar Serviço: ' + err);
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        setUserId(localStorage.getItem('clientId'));
        const fetchAgendamentos = async () => {
            const data = await listAgendamentos(localStorage.getItem('clientId'));
            tratarAgendamentos(data);
        };
        fetchAgendamentos();
        const fetchServicos = async () => {
            const data = await listServicos();
            tratarServicos(data);
        };
        fetchServicos();
        const handlePopState = () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('clientId');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <>
            <div id="app">
                <h1>Agendamento de Serviços</h1>
                <form className="service-form" onSubmit={createService}>
                    <label htmlFor="service">Serviço:</label>
                    <select onChange={(e) => {
                        setSelect(e.target.value);
                        setServicoId(e.target.value);
                    }}>
                        <option value="" defaultChecked>Selecione um item</option>
                        {listServices.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    <label htmlFor="description">Descrição:</label>
                    <textarea id="description" required value={descricao} onChange={(e) => { setDescricao(e.target.value); }}></textarea>
                    <label htmlFor="date">Data:</label>
                    <input type="date" id="date" required value={data} onChange={(e) => { setData(e.target.value); }} />
                    <label htmlFor="time">Horário:</label>
                    <input type="time" id="time" required value={time} onChange={(e) => { setTime(e.target.value); }} />
                    <label htmlFor="image">Imagem:</label>
                    <input type="file" id="image" accept="image/*" onChange={(e) => { setImage(e.target.files[0]); }} />
                    <button className='botaoAgendamento' type='submit'>{loading?'Agendando...':'Agendar Serviço'}</button>
                </form>
            </div>
            <Solicitacoes agendamentos={Agendamento} />
            {loading && (
                <div className="loading-overlay">
                    <CircularProgress color="inherit" />
                </div>
            )}
        </>
    );
}

export default Agendamento;
