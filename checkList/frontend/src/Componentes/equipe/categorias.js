import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListarEntry from './listarEntry';

function Categorias() {
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const [descricao, setDescricao] = useState('')

    const fetchCategorias = async () => {
        const idChecklist = localStorage.getItem('idChecklist');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/list/category/${idChecklist}`,
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

    const criarCategorias = async (e) => {
        e.preventDefault();
        const idChecklist = localStorage.getItem('idChecklist');
        try {
            await axios.post(`${process.env.REACT_APP_API}/create/category`, {
                name: categoria,
                checklistId: idChecklist,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                }
            }
        );
            setCategoria('');  // Limpa o campo de entrada após criação
            atualizarLista();   // Atualiza a lista de categorias
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };
    const criarEntry = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/create/entry`,
                {
                    categoryId: categoriaSelecionada,
                    title:nome,
                    valueText:valor,
                    description:descricao
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    }
                }
            )
            return response.data
        } catch (error) {
            
        }
    }

    const tratarDados = (data) => {
        if (data.length === 0) {
            console.log('Nenhuma categoria encontrada');
            setCategorias([]);
        } else {
            const result = data.map((list) => ({
                id: list.id,
                name: list.name,
            }));
            setCategorias(result);
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
        <section>
            <div>
                <form onSubmit={criarCategorias}>
                    <label>Categoria</label>
                    <input
                        placeholder='Ex: Alimentos'
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                    <button type='submit'>Criar</button>
                </form>
                <form onSubmit={criarEntry}>
                    {categorias.length > 0 ? (
                        <select onChange={(e)=>setCategoriaSelecionada(e.target.value)}>
                            <option defaultChecked value={null}>Selecione uma categoria</option>
                            {categorias.map((itens) => (
                            <option key={itens.id} value={itens.id}>{itens.name}</option>
                            ))}
                        </select>
                    ) : (
                        <p>Nenhuma categoria encontrada</p>
                    )}
                    <label>Nome:</label>
                    <input type='text' placeholder='Ex: Almoço' required value={nome} onChange={(e)=>setNome(e.target.value)}></input>
                    <label>Valor:</label>
                    <input type='number' placeholder='55.50' required value={valor} onChange={(e)=>setValor(e.target.value)}></input>
                    <textarea value={descricao} onChange={(e)=>setDescricao(e.target.value)}></textarea>
                    <input type='file'></input>
                    <button type='submit'>Inserir</button>
                </form>
            </div>
            <ListarEntry></ListarEntry>
        </section>
    );
}

export default Categorias;
