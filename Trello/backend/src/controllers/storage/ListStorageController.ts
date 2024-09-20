import { Request, Response } from "express";
import { ListStorageService } from "../../services/storage/ListStorageService";

class ListStorageController{
    async handle(req:Request, res:Response){
        
        const listStorageService = new ListStorageService()
        try{
            const lista = await listStorageService.execute()
            return res.json(lista)
        }catch(err){
            return res.status(400).json({error: err.message})
        }

    }
}
export {ListStorageController}