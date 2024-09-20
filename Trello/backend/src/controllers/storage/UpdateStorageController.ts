import { Request, Response } from "express";
import { UpdateStorageService } from "../../services/storage/UpdateStorageService";

class UpdateStorageController{
    async handle(req:Request, res:Response){
        const { storeId, userId} = req.body;
        const updateStorageService = new UpdateStorageService()
        try{
            const result = await updateStorageService.execute({storeId, userId})
            return res.json(result)
        }catch(err){
            return res.status(400).json({error: err.message})
        }
        

        
    }
}
export {UpdateStorageController}