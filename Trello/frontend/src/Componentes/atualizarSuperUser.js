import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateSuperUser() {
  const [nome, setNome] = useState('');
  const [userId, setUserId] = useState('');
  const [userIds, setUserIds] = useState([]);
  const navigate = useNavigate();

  const pegarUser = (e) => {
    setUserId(e.target.value);
  };

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://192.168.50.164:3333/update/user/${userId}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          }
        }
      );

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      if (error.response && error.response.status === 409) {
        alert('Usuário já cadastrado! Contate o Administrador.');
      } else {
        alert('Erro ao cadastrar usuário. Por favor, tente novamente. '+error);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('superUser') === 'false') {
      navigate('/Trello'); // Redireciona usuário comum
    } else {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get('http://192.168.50.164:3333/list/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const users = response.data.map((user) => ({
            id: user.id,
            name: user.name,
          }));
          setUserIds(users);
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
        }
      };

      fetchUser();
    }
  }, [navigate]);

  return (
    <article className='addUser'>
      <h1>Concessão a SuperUser</h1>
      <form onSubmit={addUser}>
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
  );
}

export default UpdateSuperUser;
