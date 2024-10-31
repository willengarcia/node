import { Request, Response } from "express";
import { ListEquipeService } from "../../services/equipe/ListEquipeServices";
class ListEquipeController{
    async handle(req:Request, res:Response){
        try {
            const listEquipeService = new ListEquipeService()
            const execute = await listEquipeService.execute()
            return res.status(200).json(execute)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
export {ListEquipeController}