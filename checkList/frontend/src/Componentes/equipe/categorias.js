import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Categorias() {
    const [showEntry, setShowEntry] = useState(false);
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [image, setImage] = useState(null); // Armazena o arquivo de imagem
    const navigate = useNavigate();

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
        const formData = new FormData();
        formData.append('categoryId', categoriaSelecionada) 
        formData.append('title', nome)
        formData.append('valueText', valor) 
        formData.append('description', descricao) 
        if (image) {
            formData.append('image', image); // Adiciona a imagem ao FormData, se existir
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/create/entry`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'multipart/form-data'

                    }
                }
            )
            setNome(' ')
            setValor(' ')
            setDescricao(' ')
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
    const fecharCategorias = () => {
        setShowEntry(false);
    };

    useEffect(() => {
        atualizarLista();
    }, []);

    return (
        <section className='equipe'>
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
                <button onClick={()=>{setShowEntry(true)}} style={{backgroundColor:'green', display:'block', margin:'1rem auto'}}>Adicionar Informações</button>
                <button onClick={()=>{navigate('/informacoes')}} style={{backgroundColor:'green', display:'block', margin:'1rem auto'}}>Acessar Informações</button>
            </div>
            {showEntry && (
                <div className="modal-overlay-entry">
                    <div className="modal-content-entry">
                        <button className="close-button-entry" onClick={fecharCategorias}>X</button>
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
                            <input type='file' accept="image/*" onChange={(e) => { setImage(e.target.files[0]); }}></input>
                            <button type='submit'>Inserir</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Categorias;
