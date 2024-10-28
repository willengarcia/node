import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import AdicionarUser from './adicionarUser';
import UpdateSuperUser from './atualizarSuperUser';

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
                        id: team.id,
                        name: team.name,
                        location: team.location
                    }));
                    setEquipes(equipesData);
                } catch (error) {
                    alert('Erro ao buscar equipes:', error);
                }
            };
            fetchEquipes();
        }
    }, []);

    const pegaIdEquipe = (id) => {
        localStorage.setItem('teamId', id);
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
                    <div key={equipe.id} className="equipe-card" id={equipe.id}>
                        <h2>ID: {equipe.id}</h2>
                        <p>Nome: {equipe.name}</p>
                        <p>Localização: {equipe.location}</p>
                        <button onClick={() => pegaIdEquipe(equipe.id)}>Acessar</button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Equipes;
