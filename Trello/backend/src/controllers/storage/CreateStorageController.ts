import { Request, Response } from "express";
import { CreateStorageService } from "../../services/storage/CreateStorageService";

class CreateStorageController{
    async handle(req:Request, res:Response){

        const {name, location, userId} = req.body;

        const createStorageService = new CreateStorageService()
        const storage = await createStorageService.execute({name, location, userId})
        return res.json(storage)
    }
}
export{CreateStorageController}