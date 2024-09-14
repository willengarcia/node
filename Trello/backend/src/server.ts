import express from 'express'
import {router} from './router'
import cors from 'cors'
import path from "path";



const app = express()

app.use(express.json())
app.use(cors({
    origin: '*'
}))
app.use(router)
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))) // criar uma rota estática para exibir as fotos
app.listen(3333, ()=>{console.log('Server Online!!')})