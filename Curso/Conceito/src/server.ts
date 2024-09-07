import express from "express"; // importa o express
import { router } from "./router"; // importa a rota configurada
const app = express() // instacia o express

app.use(express.json()) // usa o express json
app.use(router) // chama as rotas configuradas
app.listen(3333, ()=>{console.log('Server Online!!')}) // configuração da porta e um console dentro do server