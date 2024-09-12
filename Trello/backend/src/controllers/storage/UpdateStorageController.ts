import { Request, Response } from "express";
import { UpdateStorageService } from "../../services/storage/UpdateStorageService";

class UpdateStorageController{
    async handle(req:Request, res:Response){
        const { storeId, userId} = req.body;
        const updateStorageService = new UpdateStorageService()
        const result = await updateStorageService.execute({storeId, userId})
        console.log(storeId, userId)

        return res.json(result)
    }
}
export {UpdateStorageController}