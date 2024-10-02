import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUserService";
class ListUserController{
    async handle(req:Request, res:Response){
        const id = req.params.id
        if(!id){
            return res.status(400).json({erro: 'Não foi possível receber ID: '+id})
        }
        try{
            const bd = new ListUserService()
            const get = await bd.execute({id})
            return res.json(get)
        }catch(err){
            return res.status(400).json({erro:err.message})
        }
    }
}
export {ListUserController}