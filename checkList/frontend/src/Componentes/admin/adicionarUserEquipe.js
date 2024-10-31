import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css'

function AdicionarUserEquipe() {
    const [userId, setUserId] = useState('');
    const [teamId, setTeamId] = useState('');
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUserId(e.target.value);
    };

    const handleTeamChange = (e) => {
        setTeamId(e.target.value);
    };

    const addUserToTeam = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${process.env.REACT_APP_API}/insert/user/equipe`,
                { teamId, userId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
            alert('Usuário adicionado à equipe com sucesso!');
            setUserId('');
            setTeamId('');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar o usuário à equipe: ' + error.message);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('superUser') === 'false') {
            navigate('/Trello');
        } else {
            const fetchTeams = async () => {
                try {
                    const token = localStorage.getItem('authToken');
                    const response = await axios.get(`${process.env.REACT_APP_API}/list/equipe`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const teamsData = response.data.map((team) => ({
                        teamId: team.teamId,
                        userTeamId: team.userTeams[0].userTeamId,
                        name: team.teamName,
                        location: team.teamLocation
                    }));
                    setTeams(teamsData);
                } catch (error) {
                    alert('Erro ao buscar equipes: ' + error.message);
                }
            };

            const fetchUsers = async () => {
                try {
                    const token = localStorage.getItem('authToken');
                    const response = await axios.get(`${process.env.REACT_APP_API}/list/user`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const usersData = response.data.map((user) => ({
                        id: user.id,
                        name: user.name,
                    }));
                    setUsers(usersData);
                } catch (error) {
                    alert('Erro ao buscar usuários: ' + error.message);
                }
            };

            fetchTeams();
            fetchUsers();
        }
    }, [navigate]);

    return (
        <article className='addUser'>
            <h1>Adicionar Usuário à Equipe</h1>
            <form onSubmit={addUserToTeam} className='formAddUser
            '>
                <label>Equipe:</label>
                <select onChange={handleTeamChange} value={teamId}>
                    <option value="">Selecione uma equipe</option>
                    {teams.map((team) => (
                        <option key={team.teamId} value={team.teamId}>
                            {team.name}
                        </option>
                    ))}
                </select>
                <label>Usuários:</label>
                <select onChange={handleUserChange} value={userId}>
                    <option value="">Selecione um usuário</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Adicionar</button>
            </form>
        </article>
    );
}

export default AdicionarUserEquipe;
