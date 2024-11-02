import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './equipe.css'

function ListarEntry() {
    const [entrys, setEntrys] = useState([])

    const fetchCategorias = async () => {
        
        const idChecklist = localStorage.getItem('idChecklist');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/list/entry/${idChecklist}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            return [];
        }
    };

    const tratarDados = (data) => {
        if (data.length === 0) {
            console.log('Nenhuma categoria encontrada');
            setEntrys([]);
        } else {
            const result = data.map((list) => ({
                titulo: list.title,
                valor: list.value,
                descricao: list.description,
                imageUrl: list.imageUrl
            }));
            setEntrys(result);
        }
    };

    const atualizarLista = async () => {
        const data = await fetchCategorias();
        tratarDados(data);
    };

    useEffect(() => {
        atualizarLista();
    }, []);

    return (
        <section className='equipe'>
            <div>
                {
                    entrys.length > 0 ? entrys.map((list, indice)=>(
                        <div key={indice}>
                            <h2>{list.titulo}</h2>
                            <h3>{list.valor}</h3>
                            <h3>{list.descricao}</h3>
                            <img src={list.imageUrl} width={300} height={400} alt='Comprovante'></img>
                        </div>
                        
                    )):<p>Não há Valores</p>
                }
            </div>
        </section>
    );
}

export default ListarEntry;
