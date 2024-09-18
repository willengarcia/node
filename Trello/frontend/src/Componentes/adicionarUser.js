import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function AdicionarUser() {
    const [userId, setUserId] = useState('');
    const [storeId, setStoreId] = useState('');
    const [lojas, setLojas] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const navigator = useNavigate()
    const pegarUser = (e) => {
        setUserId(e.target.value);
    };

    const pegarLoja = (e) => {
        setStoreId(e.target.value);
    };

    const addUser = async (e) => {
        e.preventDefault();
        console.log(`User ID: ${userId}, Store ID: ${storeId}`);

        try {
            const response = await axios.post('http://localhost:3333/update/user_loja', {
                storeId:storeId,
                userId:userId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            alert('Usuário Cadastrado!');
        } catch (error) {
            console.error('Erro:', error);
            alert(`Erro ao inserir Usuário à loja: ` + error);
        }
    };

    useEffect(() => {
        const fetchLojas = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3333/listar/loja', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const lojas = response.data;
                const lojasSimplificadas = lojas.map((store) => ({
                    id: store.id,
                    name: store.name,
                    location: store.location,
                }));
                setLojas(lojasSimplificadas);
            } catch (error) {
                console.error('Erro ao buscar lojas:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3333/list/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const users = response.data;
                const usersSimplificadas = users.map((user) => ({
                    id: user.id,
                    name: user.name,
                }));
                setUserIds(usersSimplificadas);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchLojas();
        fetchUser();
    }, []);

    const voltar = ()=>{
        navigator('/Lojas')
    }

    return (
        <section className='paiListaLoja'>
            <button className='sair' onClick={() => {voltar()}}>Voltar</button>
            <article className='cadastrarLoja'>
                <h1>Inserir Usuário à Loja</h1>
                <form onSubmit={addUser}>
                    <label>Loja:</label>
                    <select onChange={pegarLoja} value={storeId}>
                        <option value="">Selecione uma loja</option>
                        {lojas.map((el, i) => (
                            <option key={i} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                    <label>Usuários:</label>
                    <select onChange={pegarUser} value={userId}>
                        <option value="">Selecione um usuário</option>
                        {userIds.map((el, i) => (
                            <option key={i} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>
                    <button type='submit'>Inserir</button>
                </form>
            </article>
        </section>
    );
}

export default AdicionarUser;
