import express from 'express';
import { router } from './router';
import cors from 'cors';
import path from 'path';

const app = express();

// Middleware para permitir CORS
const corsOptions = {
    origin: 'https://trello-o09frj28p-willen-garcia-s-projects.vercel.app', // Remova a barra final
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    credentials: true  // Permite cookies e credenciais
};

// Aplicar o middleware de CORS
app.use(cors(corsOptions));

// Middleware para processar JSON
app.use(express.json());

// Defina suas rotas aqui
app.use(router);

// Criar uma rota estática para exibir as fotos
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// Iniciar o servidor
app.listen(process.env.PORT, () => {
    console.log('Server Online!!');
});
