import { Request, Response } from "express";
import { InsertEquipeUserService } from "../../services/equipe/InsertEquipeUserService";
class InsertEquipeUserController{
    async handle(req:Request, res:Response){
        const {userId, teamId} = req.body
        if((!userId)||(!teamId)){
            return res.status(401).json({error:'Inserções são Undefined'})
        }
        try {
            const insertEquipeUserService = new InsertEquipeUserService()
            const execute = await insertEquipeUserService.execute({userId, teamId})
            return res.status(200).json(execute)
        } catch (error) {
            return res.status(500).json({error:error})
        }
    }
}
export {InsertEquipeUserController}