import express from 'express';
import { router } from './router';
import cors from 'cors';
import 'dotenv/config'; // Carregar variáveis de ambiente

const app = express();
const porta = process.env.PORT || 4000;

// Middleware para permitir CORS
const corsOptions = {
    origin: ['http://localhost:3000'], // Remova a barra final
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permite cookies e credenciais, se necessário
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(router)
app.listen(porta, ()=>{console.log('Servidor Online')})