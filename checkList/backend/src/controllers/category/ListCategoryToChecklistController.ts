import { Request, Response } from "express";
import { ListCategoryToChecklistService } from "../../services/category/ListCategoryToChecklistService";
class ListCategoryToChecklistController{
    async handle(req:Request, res:Response){
        const idChecklist = req.params.idChecklist
        if(!idChecklist){
            return res.status(401).json({error:'Id é undefined'})
        }
        try {
            const listCategoryToChecklistController = new ListCategoryToChecklistService()
            const execute = await listCategoryToChecklistController.execute({idChecklist})
            return res.status(200).json(execute)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
export {ListCategoryToChecklistController}