import { Request, Response } from "express";
import { ListEntryService } from "../../services/entry/ListEntryService";
class ListEntryController{
    async handle(req:Request, res:Response){
        const categoryId = req.params.categoryId
        if((!categoryId)){
            return res.status(401).json({error:'Atributos is undefined'})
        }
        try {
            const listEntryService = new ListEntryService()
            const execute = await listEntryService.execute({categoryId})
            return res.status(200).json(execute)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
export { ListEntryController }