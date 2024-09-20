import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function AdicionarImagens() {
    const [imagens, setImagens] = useState(null);
    const [imagensList, setImagensList] = useState([]);
    const navigator = useNavigate();
    const listarImagens = async () => {
        const storeId = localStorage.getItem('storeId');
        const token = localStorage.getItem('authToken');
        
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/list/imagens`, {
                params: { storeId },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            alert('Erro ao buscar imagens: ' + error.message);
            return [];
        }
    };

    const tratarDados = (data) => {
        const result = data.map((imageEntry) => ({
            id: imageEntry.idImage,
            name: imageEntry.userName,
            url: imageEntry.imageUrl,
            createdAt: imageEntry.createdAt
        }));
        setImagensList(result);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await listarImagens();
            tratarDados(data);
        };
        fetchData();
    }, []);

    const insertImagens = async (e) => {
        e.preventDefault();

        if (!imagens) {
            alert('Nenhuma imagem selecionada');
            return;
        }

        const formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('storeId', localStorage.getItem('storeId'));
        formData.append('file', imagens);

        try {
            await axios.post(`${process.env.REACT_APP_API}/add/imagens`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Imagem enviada com sucesso');
            // Atualiza a lista de imagens após o upload
            const updatedList = await listarImagens();
            tratarDados(updatedList);
        } catch (error) {
            console.error('Erro:', error);
            alert(`Erro ao inserir Imagem: ${error.message}`);
        }
    };

    const sair = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('storeId');
        localStorage.removeItem('superUser');
        navigator('/');
    };

    return (
        <section className='paiInserirImagem'>
            <button className='sair' onClick={sair}>Sair</button>
            <article className='InserirImagem'>
                <h1>Inserir Imagem</h1>
                <form onSubmit={insertImagens}>
                    <input
                        type='file'
                        onChange={(e) => setImagens(e.target.files[0])}
                    />
                    <button type='submit'>Upload</button>
                </form>
            </article>
            <div className="listInseriImagem">
                {imagensList.map((imagem) => (
                    <div key={imagem.id} className="loja-imagem" id={imagem.id}>
                        <a href={`${process.env.REACT_APP_API}/files/${imagem.url}`} target='_blank' rel="noopener noreferrer">
                            <img src={`${process.env.REACT_APP_API}/files/${imagem.url}`} alt={`Imagem de ${imagem.name}`} />
                        </a>
                        <div className='loja-imagemDados'>
                            <p>Usuário: {imagem.name}</p>
                            <p>Data: {imagem.createdAt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default AdicionarImagens;
