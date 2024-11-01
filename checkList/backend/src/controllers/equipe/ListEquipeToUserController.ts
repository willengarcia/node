import { Request, Response } from "express";
import { ListEquipeToUserService } from "../../services/equipe/ListEquipeToUserService";
class ListEquipeToUserController{
    async handle(req:Request, res:Response){
        const idUser = req.params.idUser
        try {
            const listEquipeToUserService = new ListEquipeToUserService()
            const execute = await listEquipeToUserService.execute({idUser})
            return res.status(200).json(execute)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
export {ListEquipeToUserController}