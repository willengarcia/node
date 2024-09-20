import { Request, Response } from "express";
import { ListImageService } from "../../services/images/ListImagesService";
class ListImagesController{
    async handle(req:Request, res:Response){
        const storeId = req.query.storeId as string
        const listImages = new ListImageService()
        try{
            const list = await listImages.execute({storeId})
            return res.json(list)            
        }catch(err){
            return res.status(400).json({error: err.message})
        }

    }
}
export {ListImagesController}