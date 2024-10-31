import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categorias from './categorias';
import './equipe.css'

function ListarChecklist() {
    const [chekclistName, setChecklistName] = useState('');
    const [infoChecklist, setInfoChecklist] = useState([]);
    const navigate = useNavigate();

    const listarChecklist = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/list/chekclist`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return [];
        }
    };

    const tratarDados = (data) => {
        if (data.length === 0) {
            console.log('não há nada!');
        } else {
            const result = data.map((list) => ({
                id: list.id,
                status: list.status,
                finalizado: list.finalizedAt,
                name: list.team.name
            }));
            setInfoChecklist(result);
        }
    };

    const inserirChekclist = async (e) => {
        e.preventDefault();
        const teamId = localStorage.getItem('teamId');
        const userTeamId = localStorage.getItem('userTeamId');
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/create/checklist`,
                {
                    name: chekclistName,
                    teamId: teamId,
                    userTeamId: userTeamId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    }
                }
            );
            console.log('Checklist criado:', response.data);
            setChecklistName(''); // Limpa o input após criar o checklist
            await atualizarLista(); // Atualiza a lista de checklists após criar um novo
        } catch (error) {
            console.error('Erro ao criar checklist:', error);
        }
    };

    const atualizarLista = async () => {
        const data = await listarChecklist();
        tratarDados(data);
    };
    const pegarId = (idChecklist)=>{
        localStorage.setItem('idChecklist', idChecklist)
    }

    useEffect(() => {
        atualizarLista();
    }, []);

    return (
        <>
            <article>
                <h1>Crie um novo Checklist</h1>
                <form onSubmit={inserirChekclist}>
                    <label>Nome do Checklist</label>
                    <input
                        type='text'
                        placeholder='Checklist - 1'
                        required
                        value={chekclistName}
                        onChange={(e) => setChecklistName(e.target.value)}
                    />
                    <button type='submit'>Criar</button>
                </form>
            </article>
            <article>
                <h2>Lista de Checklist</h2>
                {
                    infoChecklist.length > 0 ? infoChecklist.map((itens) => (
                        <div key={itens.id} className="checklist-item" id={itens.id}>
                            <h3>{itens.name}</h3>
                            <p>Status: {itens.status}</p>
                            <p>Finalizado em: {itens.finalizado ? itens.finalizado : 'Em andamento'}</p>
                            {itens.status === 'ONGOING'?<button onClick={()=>pegarId(itens.id)}>Entrar</button>:<button disabled>Finalizado</button>}
                        </div>
                    )) : <p>Nenhum checklist encontrado.</p>
                }
            </article>
            <Categorias></Categorias>
        </>
    );
}

export default ListarChecklist;
