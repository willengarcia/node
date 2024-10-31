import { Request, Response } from "express";
import { CreateEntryService } from "../../services/entry/CreateEntryService";
class CreateEntryController{
    async handle(req:Request, res:Response){
        const {categoryId, title, valueText, description} = req.body
        if((!categoryId)||(!title)||(!valueText)){
            return res.status(401).json({error:'Atributos is undefined'})
        }
        const value = parseFloat(valueText)
        try {
            const createEntryService = new CreateEntryService()
            const execute = await createEntryService.execute({categoryId, title, value, description})
            return res.status(200).json(execute)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
export { CreateEntryController }