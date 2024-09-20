import express from 'express';
import { router } from './router';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'; // Carregar variáveis de ambiente

const app = express();
const porta = process.env.PORT || 4000;

// Configuração do Cloudinary
cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL
});

// Middleware para permitir CORS
const corsOptions = {
    origin: 'https://trello-six-rose.vercel.app', // Remova a barra final
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Permite cookies e credenciais, se necessário
};
app.use(cors(corsOptions));

// Middleware para processar JSON
app.use(express.json());

// Defina suas rotas aqui
app.use(router);

// Iniciar o servidor
app.listen(porta, () => {
    console.log('Server Online!!');
});
