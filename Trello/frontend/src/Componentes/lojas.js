import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'
import AdicionarUser from './adicionarUser';


function Lojas() {
    const [loja, setLoja] = useState('')
    const [nome, setNome] = useState('')
    const navigator = useNavigate()
    const cadastrar = (e)=>{
        e.preventDefault()
        axios.post('http://192.168.50.164:3333/cadastrar/loja',{
          name:loja,
          location:nome
        },{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(response=>{
          console.log('Loja Cadastrada! ')
        })
        .catch(error=>{
          console.log("Erro: "+error)
        })
    }
    const [lojas, setLojas] = useState([]);

    useEffect(() => {
        const fetchLojas = async () => {
        try {
            // Obtendo o token do localStorage ou de outra fonte
            const token = localStorage.getItem('authToken');
            
            const response = await axios.get('http://localhost:3333/listar/loja', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            
            const lojas = response.data;
            const lojasSimplificadas = lojas.map(store => ({
                id: store.id,
                name: store.name,
                location: store.location
            }));
            setLojas(lojasSimplificadas);
        } catch (error) {
            console.error('Erro ao buscar lojas:', error);
        }
        };

        fetchLojas();
    }, []);
    const pegaIdLoja = (el) =>{
        console.log(el)
        localStorage.setItem('storeId', `${el}`)
        navigator('/imagens')
    }
    
    const sair = ()=>{
        localStorage.removeItem('authToken')
        localStorage.removeItem('storeId')
        navigator('/')
    }

    return(
        <section className='paiListaLoja'>
            <button className='sair' onClick={()=>{sair()}}>Sair</button>
            <article className='cadastrarLoja'>
                <h1>Cadastrar Loja</h1>
                <form onSubmit={cadastrar}>
                    <input type='text' placeholder='Ex: SM45' onChange={(e)=>{setLoja(e.target.value)}} value={loja}></input>
                    <input type='text' placeholder='Ex: Marambaia'onChange={(e)=>{setNome(e.target.value)}} value={nome}></input>
                    <button type='submit'>Cadastrar</button>
                </form>
            </article>
            <AdicionarUser></AdicionarUser>
            <div className='listarLoja'>
                {lojas.map(loja => (
                    <div key={loja.id} className="loja-card" id={loja.id}>
                        <h2>ID: {loja.id}</h2>
                        <p>Nome: {loja.name}</p>
                        <p>Localização: {loja.location}</p>
                        <button onClick={(el)=>{pegaIdLoja(el.target.parentElement.id)}}>Acessar</button>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Lojas;