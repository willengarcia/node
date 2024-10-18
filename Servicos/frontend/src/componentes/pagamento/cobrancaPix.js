import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { CircularProgress } from '@mui/material';

export default function CobrancaPix(){
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]); // Dados dos serviços
  const [selectedClient, setSelectedClient] = useState(null); // Cliente selecionado
  const [orderId, setOrderId] = useState('') // id do serviço
  const [clientId, setClientId] = useState('') // id do client
  const [pixUrl, setPixUrl] = useState('');
  const [pixCopiaCola, setPixCopiaCola] = useState('');
  const [email, setEmail] = useState(''); // Email do cliente
  const [descricao, setDescricao] = useState(''); // Descrição do serviço
  const [valor, setValor] = useState('')

  const filtrarAgendamentos = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/CONFIRMED`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }); // URL da sua API
        setData(response.data);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
    }
  };

  // Filtra os serviços com status "CONFIRMED"
  useEffect(() => {
    filtrarAgendamentos()
  }, []);

  // Função para lidar com a seleção do cliente
  const handleClientSelect = (client) => {
    setOrderId(client.id)
    setClientId(client.clientId)
    setSelectedClient(client);
    setEmail(client.client.email);
    setDescricao(client.service.description);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      email,
      descricao,
      valor
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/createPagamento`, data);
      if (response.data) {
        setPixUrl(response.data.url);
        setPixCopiaCola(response.data.pixCopiaCola);
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/updatePagamento`, {
            orderId: orderId,
            clientId: clientId,
            urlPix: response.data.url,
            linkPix: response.data.pixCopiaCola
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        alert('Criação de Link para pagamento feito com sucesso, entre em contato com o cliente para realizar o pagamento!')
      }else {
        console.error('Dados de pagamento incompletos');
      }
    } catch (err) {
      console.error('Erro ao criar o pagamento', err);
    }finally{
      setLoading(false)
    }
  };
  return (
    <article className="login">
      <h1>Pedido de Pagamento via Pix</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="clientSelect">Selecione um Cliente:</label>
        <select
          id="clientSelect"
          onChange={(e) => handleClientSelect(data[e.target.value])}
          value={selectedClient ? selectedClient.id : ''}
        >
          <option value="">Selecione um cliente</option>
          {data.map((client, index) => (
            <option key={client.id} value={index}>
              {client.client.name}
            </option>
          ))}
        </select>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="descricao">Descrição do Serviço:</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <label>Valor (R$):</label>
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <button type="submit">{loading?'Aguarde':'Solicitar Pagamento'}</button>
      </form>
      {loading && (
        <div className="loading-overlay">
            <CircularProgress color="inherit" />
        </div>
      )}
    </article>
  );
};
