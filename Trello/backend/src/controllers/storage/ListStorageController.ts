import { Request, Response } from "express";
import { ListStorageService } from "../../services/storage/ListStorageService";

class ListStorageController{
    async handle(req:Request, res:Response){

        const {name} = req.body;
        
        const listStorageService = new ListStorageService()

        const lista = await listStorageService.execute({name})
        
        return res.json(lista)
    }
}
export {ListStorageController}