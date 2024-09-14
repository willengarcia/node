import { Request, Response } from "express";
import { ListStorageService } from "../../services/storage/ListStorageService";

class ListStorageController{
    async handle(req:Request, res:Response){
        
        const listStorageService = new ListStorageService()

        const lista = await listStorageService.execute()
        
        return res.json(lista)
    }
}
export {ListStorageController}