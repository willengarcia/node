import { Router, Request, Response, NextFunction } from "express";
const router = Router();

//Exemplo: http://localhost:3333/rota

// query params: ?nome=comprar
// route params: /tarefas/2
// request body: {nome:"marcos"}
const tarefas = ["Estudar Node", "Estudar JS"]

/*
    Entendendo Middleware ("está no meio")
    - Está no meio após chamar a requisição e antes de chamar o callbak

*/

router.use((req: Request, res: Response, next: NextFunction)=>{
    console.log('Passou pelo middleware global')

    return next() // Para continuar a aplicação, se não fica num loop
})

// para colocar um middleware para uma rota:
function checkTarefa(req: Request, res: Response, next: NextFunction){
    if(!req.body.nome) {
        return res.status(400).json({erro: "Erro ao validar"})
    }
    return next()
}

router.get("/query", (req: Request, res: Response)=>{ // requisição, resposta
    // res.send("Minha primeira api")
    // query params: ?nome=comprar
    const nome =req.query.nome;
    res.json({messsage: nome, })
})

router.get("/params/:id", (req: Request, res: Response)=>{ // requisição, resposta
    // res.send("Minha primeira api")
    // route params: /tarefas/2
    const id =req.params.id;
    res.json({messsage: `tarefa com o id ${id}`, })
})

// Listar todas as tarefas
router.get("/body", (req: Request, res: Response)=>{ // requisição, resposta
    // res.send("Minha primeira api")
    // request body: {nome:"marcos"}
    res.json(tarefas)
})

// Listar todas as tarefas
router.get("/tarefa/:index", (req: Request, res: Response)=>{ // requisição, resposta
    // res.send("Minha primeira api")
    const index = req.params.index

    res.json({tarefa: tarefas[parseInt(index)]})
})

// cadastrar 
router.post('/tarefa', checkTarefa, (req: Request, res: Response)=>{
    const {nome} = req.body
    
    tarefas.push(nome)
    console.log(tarefas)
    res.json(tarefas)
    
})

// Atualizar uma unica tarefa
router.put('/tarefa/:index', (req: Request, res: Response)=>{
    const {index} = req.params
    const {nome} = req.body
    tarefas[Number(index)] = nome // atualiza o nome pelo indice

    res.json(tarefas)
})

// Deletar alguma tarefa 
router.delete('/deleta/:index', (req: Request, res: Response)=>{
    const {index} = req.params;
    tarefas.splice(Number(index), 1)
    res.json(tarefas)
})
export {router};