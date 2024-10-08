import { Request, Response } from "express";
import { CreateStorageService } from "../../services/storage/CreateStorageService";

class CreateStorageController{
    async handle(req:Request, res:Response){

        const {name, location, userId} = req.body;
        const createStorageService = new CreateStorageService()
        try{
            const storage = await createStorageService.execute({name, location, userId})
            return res.json(storage)            
        }catch(err){
            return res.status(400).json({error: err.message})
        }

    }
}
export{CreateStorageController}