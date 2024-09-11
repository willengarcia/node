import { Request, Response } from "express";
import { FilterCategoryService } from "../../services/filter/FilterCategoryService";


class FilterCategoryController{
    async handle(req: Request, res:Response){

        const id_category = req.query.id_category as string;

        const resultFilter = new FilterCategoryService()
        const list = await resultFilter.execute({id_category})
        return res.json(list)
        
    }
}
export {FilterCategoryController}