import { Request, Response } from "express";
import { ListChecklistService } from "../../services/checklist/ListChecklistService";
class ListChecklistController{
    async handle(req:Request, res:Response){
        try {
            const listChecklistService = new ListChecklistService()
            const execute = await listChecklistService.execute()
            return res.status(200).json(execute)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
export { ListChecklistController }