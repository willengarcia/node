import express from 'express'
import {router} from './router'
import cors from 'cors'
import path from "path";



const app = express()

app.use(express.json())
const corsOptions = {
    origin: 'https://trello-o09frj28p-willen-garcia-s-projects.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    credentials: true  // Permite cookies e credenciais
  };
// Aplicar o middleware de CORS
app.use(cors(corsOptions));
app.use(router)
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))) // criar uma rota estática para exibir as fotos
app.listen(process.env.PORT, ()=>{console.log('Server Online!!')})