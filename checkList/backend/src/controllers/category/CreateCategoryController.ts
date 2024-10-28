import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryServices";
class CreateCategoryController{
    async handle(req:Request, res:Response){
        const {name, checklistId} = req.body
        if((!name)||(!checklistId)){
            return res.status(401).json({error:'Atributos undefined'})
        }
        try {
            const createCategoryService = new CreateCategoryService()
            const execute = createCategoryService.execute({name, checklistId})
            return res.status(200).json({execute})
        } catch (error) {
            return res.status(500).json({error})
        }
    }
}
export {CreateCategoryController}