import { Request, Response } from "express";   
import { ListUserFuncioSerices } from "../../services/user/ListUserFuncioServices";
class ListUserFuncioController{
    async handle(req:Request, res:Response){
        const tipo = req.body
        if(!tipo){
            return res.status(400).json({error:"Erro ao inserir o tipo: "+ tipo})
        }
        try{
            console.log(tipo)
            const listUserFuncioService = new ListUserFuncioSerices()
            const lista = await listUserFuncioService.execute(tipo)
            return res.json(lista)
        }catch(err){
            return res.json(err)
        }
    }
}
export {ListUserFuncioController}