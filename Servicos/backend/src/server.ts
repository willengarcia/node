import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import cors from 'cors';
import {rotas} from './routes'

const app = express()

app.use(cors({
    origin: 'https://servicos-bice.vercel.app', // Remova a barra final
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))
app.use(express.json())
app.use(rotas)

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){
        // se for uma instancia do tipo erro
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Erro Interno'
    })
})

app.listen(process.env.PORT, ()=>{console.log('Servidor Online')})