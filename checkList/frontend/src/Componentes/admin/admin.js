import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdicionarUser from './adicionarUserEquipe';
import UpdateSuperUser from './atualizarSuperUser';
import './admin.css'

function Equipes() {
    const [nomeEquipe, setNomeEquipe] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const navigator = useNavigate();
    const [equipes, setEquipes] = useState([]);

    const cadastrarEquipe = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/create/equipe`, {
            name: nomeEquipe,
            location: localizacao
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(response => {
            alert('Equipe Cadastrada!');
            setNomeEquipe('');
            setLocalizacao('');
        })
        .catch(error => {
            alert("Erro: " + error);
        });
    };

    useEffect(() => {
        if (localStorage.getItem('superUser') === 'false') {
            navigator('/');
        } else {
            const fetchEquipes = async () => {
                try {
                    const token = localStorage.getItem('authToken');
                    const response = await axios.get(`${process.env.REACT_APP_API}/list/equipe`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const equipesData = response.data.map(team => ({
                        teamId: team.teamId,
                        userTeamId: team.userTeams.length > 0 ? team.userTeams[0].userTeamId : null,
                        name: team.teamName,
                        location: team.teamLocation
                    }));
                    setEquipes(equipesData);
                } catch (error) {
                    alert('Erro ao buscar equipes:', error);
                }
            };
            fetchEquipes();
        }
    }, []);

    const pegaIdEquipe = (teamId, userTeamId) => {
        localStorage.setItem('teamId', teamId);
        localStorage.setItem('userTeamId', userTeamId);
        navigator('/checklist');
    };

    const sair = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('teamId');
        localStorage.removeItem('superUser');
        navigator('/');
    };

    return (
        <section className='paiListaEquipe'>
            <button className='sair' onClick={sair}>Sair</button>
            <div className='paiCadastroAdd'>
                <article className='cadastrarEquipe'>
                    <h1>Cadastrar Equipe</h1>
                    <form onSubmit={cadastrarEquipe}>
                        <input type='text' placeholder='Nome da Equipe' onChange={(e) => setNomeEquipe(e.target.value)} value={nomeEquipe}></input>
                        <input type='text' placeholder='Localização' onChange={(e) => setLocalizacao(e.target.value)} value={localizacao}></input>
                        <button type='submit'>Cadastrar</button>
                    </form>
                </article>
                <AdicionarUser />
                <UpdateSuperUser />
            </div>
            <div className='listarEquipe'>
                {equipes.map(equipe => (
                    <div key={equipe.teamId} className="equipe-card" id={equipe.teamId}>
                        <h2>ID: {equipe.teamId}</h2>
                        <p>Nome: {equipe.name}</p>
                        <p>Localização: {equipe.location}</p>
                        <button onClick={() => pegaIdEquipe(equipe.teamId, equipe.userTeamId)}>Acessar</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Equipes;
