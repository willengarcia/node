import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function AdicionarImagens() {
    const [imagens, setImagens] = useState(null);
    const [imagensList, setImagensList] = useState([]);
    const [isUploading, setIsUploading] = useState(false); // Indica se o upload está em andamento
    const navigator = useNavigate();

    // Função para listar imagens
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

    // Função para tratar os dados recebidos
    const tratarDados = (data) => {
        const result = data.map((imageEntry) => ({
            id: imageEntry.idImage,
            name: imageEntry.userName,
            url: imageEntry.imageUrl, // Usar diretamente a URL do Cloudinary
            createdAt: new Date(imageEntry.createdAt).toLocaleDateString() // Formatar a data
        }));
        setImagensList(result);
    };

    // useEffect para carregar as imagens ao carregar o componente
    useEffect(() => {
        const fetchData = async () => {
            const data = await listarImagens();
            tratarDados(data);
        };
        fetchData();
    }, []);

    // Função para inserir imagens
    const insertImagens = async (e) => {
        e.preventDefault();

        // Validação de arquivo
        if (!imagens) {
            alert('Nenhuma imagem selecionada');
            return;
        }

        // Validação do tamanho do arquivo
        if (imagens.size > 5000000) { // 5MB
            alert('O arquivo é muito grande. Escolha um arquivo menor que 5MB.');
            return;
        }

        setIsUploading(true); // Indica que o upload começou

        const formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('storeId', localStorage.getItem('storeId'));
        formData.append('image', imagens);

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
            alert(`Erro ao inserir imagem: ${error.message}`);
        } finally {
            setIsUploading(false); // Upload concluído
        }
    };

    // Função para sair
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
                        name='image'
                        accept='image/*' // Aceita apenas arquivos de imagem
                        onChange={(e) => setImagens(e.target.files[0])}
                    />
                    <button type='submit' disabled={isUploading || !imagens}>
                        {isUploading ? 'Carregando...' : 'Upload'}
                    </button>
                </form>
            </article>
            <div className="listInseriImagem">
                {imagensList.map((imagem) => (
                    <div key={imagem.id} className="loja-imagem" id={imagem.id}>
                        <a href={imagem.url} target='_blank' rel="noopener noreferrer">
                            <img src={imagem.url} alt={`Imagem de ${imagem.name}`} />
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
