import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './equipe.css'

function Equipe() {
    const [equipes, setEquipes] = useState([]);
    const navigator = useNavigate();
    const pegaIdEquipe = (teamId, userTeamId) => {
        localStorage.setItem('teamId', teamId);
        localStorage.setItem('userTeamId', userTeamId)
        navigator('/checklist');
    };

    useEffect(() => {
        const fetchEquipes = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`${process.env.REACT_APP_API}/list/equipe/user/${localStorage.getItem('userId')}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const equipesData = response.data.map(team => ({
                    userTeamId: team.id,
                    teamId: team.team.id,
                    name: team.team.name,
                    location: team.team.location,
                    created: team.team.createdAt
                }));
                setEquipes(equipesData);
            } catch (error) {
                alert('Erro ao buscar equipes, possa ser que você ainda não tenha nenhuma equipe cadastrada', error);
            }
        };
        fetchEquipes();
    }, []);

    return (
        <article className='equipe'>
            <h1>Acessar as Equipes</h1>
            <div className='listarEquipe'>
                {equipes.map(equipe => (
                    <div key={equipe.teamId} className="equipe-card" id={equipe.teamId}>
                        <h2>ID: {equipe.teamId}</h2>
                        <p>Nome: {equipe.name}</p>
                        <p>Localização: {equipe.location}</p>
                        <p>Criado: {equipe.created}</p>
                        <button onClick={() => pegaIdEquipe(equipe.teamId, equipe.userTeamId)}>Acessar</button>
                    </div>
                ))}
            </div>
        </article>
    );
}

export default Equipe;
