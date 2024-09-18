import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function AdicionarImagens() {
    const [imagens, setImagens] = useState(null);
    const [userId, setUserId] = useState('');
    const [storeId, setStoreId] = useState('');
    const navigator = useNavigate()
    

    const insertImagens = async (e) => {
        e.preventDefault();
        setStoreId(localStorage.getItem('storeId'));
        setUserId(localStorage.getItem('userId'));

        if (!imagens) {
            console.error('Nenhuma imagem selecionada');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId); // Adicionando userId
        formData.append('storeId', storeId); // Adicionando storeId
        formData.append('file', imagens); // Nome do campo para o arquivo

        try {
            const response = await axios.post('http://192.168.50.164:3333/add/imagens', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Imagem enviada com sucesso')
        } catch (error) {
            console.error('Erro:', error);
            alert(`Erro ao inserir Imagem: `+error)
        }
    };
    const sair = ()=>{
        localStorage.removeItem('authToken')
        localStorage.removeItem('storeId')
        localStorage.removeItem('superUser')
        navigator('/')
    }

    return (
        <section className='paiListaLoja'>
            <button className='sair' onClick={() => { sair()}}>Sair</button>
            <article className='cadastrarLoja'>
                <h1>Inserir Imagem</h1>
                <form onSubmit={insertImagens}>
                    <input
                        type='file'
                        onChange={(e) => {
                            setImagens(e.target.files[0]);
                        }}
                    />
                    <button type='submit'>Upload</button>
                </form>
            </article>
        </section>
    );
}

export default AdicionarImagens;
