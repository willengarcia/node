import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Imagens() {
    const [imagens, setImagens] = useState([]);
    const [botaoMap, setBotaoMap] = useState({}); // Mapeia o estado de verificação por imagem
    const navigator = useNavigate();

    // Função para listar as imagens da loja
    const listarLoja = async () => {
        const storeId = localStorage.getItem('storeId');
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/list/imagens`, {
                params: {
                    storeId: storeId, // Adiciona storeId como parâmetro de consulta
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            alert('Erro ao buscar imagens:', error);
            return [];
        }
    };

    // Função para tratar os dados recebidos
    const tratarDados = (data) => {
        const result = data.map((imageEntry) => ({
            id: imageEntry.idImage,
            name: imageEntry.userName,
            url: imageEntry.imageUrl,
            isVerified: imageEntry.isVerified, // Adicionando o status de verificação se necessário
            createdAt: imageEntry.createdAt
        }));
        setImagens(result); // Atualiza o estado com as imagens tratadas

        // Configura o estado do botão para cada imagem com base no isVerified
        const initialBotaoMap = result.reduce((acc, image) => {
            acc[image.id] = image.isVerified || false; // Inicializando como false se não houver isVerified
            return acc;
        }, {});
        setBotaoMap(initialBotaoMap);
    };

    useEffect(() => {
        if(localStorage.getItem('superUser')==='false'){
            navigator('/Trello')
        }else{
            const fetchData = async () => {
                const data = await listarLoja(); // Aguarda os dados da API
                tratarDados(data); // Trata os dados
            };
            fetchData(); // Chama a função de busca de dados
        }

    }, []); // Executa apenas uma vez ao montar o componente

    const voltar = ()=>{
        navigator('/Lojas')
    }
    
    const validar = async (idImage) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.put(`${process.env.REACT_APP_API}/list/imagens/validate/${idImage}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(botaoMap)
            // Atualizar a lista de imagens após validação
        } catch (error) {
            console.error('Erro ao validar a imagem:', error);
        }
    };

    return (
        <div className='containerImagens'>
            <button className='sair' onClick={voltar}>Voltar</button>
            <div className="listarImagens">
                {imagens.map((imagem) => (
                    <div key={imagem.id} className="loja-imagem" id={imagem.id}>
                        <img src={imagem.url} alt={`Imagem de ${imagem.name}`} />
                        <div className='loja-imagemDados'>
                            <p>Usuário: {imagem.name}</p>
                            <p>Data: {imagem.createdAt}</p>
                            {botaoMap[imagem.id] ? (
                                <button className='valiado'>Validado</button>
                            ) : (
                                <button onClick={(e) => {validar(e.target.parentElement.parentElement.id);}}>Validar</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Imagens;
