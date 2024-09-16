import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Imagens() {
    const [imagens, setImagens] = useState([]);
    const navigator = useNavigate()

    // Função para listar as lojas
    const listarLoja = async () => {
        const storeId = localStorage.getItem('storeId');
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:3333/list/imagens?storeId=${storeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    };

    // Função para tratar os dados recebidos
    const tratarDados = (data) => {
        const result = data.map((userEntry) => {
            const userName = userEntry.user.name;
            const images = userEntry.user.images.map((image) => ({
                name: userName,
                url: image.url,
                createdAt: image.createdAt,
            }));
            return images;
        }).flat(); // Achata o array para evitar array de arrays

        setImagens(result); // Atualiza o estado com as imagens tratadas
    };

    // useEffect para fazer a chamada da API quando o componente monta
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await listarLoja(); // Aguarda os dados da API
                tratarDados(data); // Trata os dados
                console.log(data)
            } catch (error) {
                console.error('Erro ao buscar imagens:', error);
            }
        };

        fetchData(); // Chama a função de busca de dados
    }, []); // Executa apenas uma vez ao montar o componente

    const sair = ()=>{
        localStorage.removeItem('authToken')
        localStorage.removeItem('storeId')
        navigator('/')
    }

    return (
        <div className='containerImagens'>
            <button className='sair' onClick={()=>{sair()}}>Sair</button>
            <div className="listarImagens">
                {imagens.map((loja, index) => (
                    <div key={index} className="loja-imagem">
                        <img src={'http://localhost:3333/files/'+loja.url} alt={`Imagem de ${loja.name}`} />
                        <div className='loja-imagemDados'>
                            <p>Usuário: {loja.name}</p>
                            <p>Data: {loja.createdAt}</p>
                            <button>Validar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Imagens;
