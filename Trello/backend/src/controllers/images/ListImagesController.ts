import { Request, Response } from "express";
import { ListImagesService } from "../../services/images/ListImagesService";
class ListImagesController{
    async handle(req:Request, res:Response){
        const {userId, storeId} = req.body
        const listImages = new ListImagesService()
        const list = await listImages.execute({userId, storeId})
        return res.json(list)
    }
}
export {ListImagesController}