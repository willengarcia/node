import express from 'express'
import {router} from './router'
import cors from 'cors'
import path from "path";



const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',  // Substitua pelo domínio do seu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(router)
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))) // criar uma rota estática para exibir as fotos
app.listen(process.env.PORT, ()=>{console.log('Server Online!!')})