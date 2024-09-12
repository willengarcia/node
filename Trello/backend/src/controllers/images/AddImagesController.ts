import { Request, Response } from "express";
import {AddImagesService} from '../../services/images/AddImagesService'

class AddImagesController{
    async handle(req:Request, res:Response){
        const { userId, storeId, imageUrl } = req.body
        const addImagesService = new AddImagesService()
        const image = await addImagesService.execute({ userId, storeId, imageUrl })
        return res.json(image)
    }
}
export {AddImagesController}