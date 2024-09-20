import { Request, Response } from "express";
import {AddImagesService} from '../../services/images/AddImagesService'

class AddImagesController{
    async handle(req:Request, res:Response){
        const { userId, storeId } = req.body
        const addImagesService = new AddImagesService()
        const {filename:imageUrl} = req.file
        try{
            const image = await addImagesService.execute({ userId, storeId, imageUrl })
            return res.json(image)
        }catch(err){
            return res.status(400).json({error: err.message})
        }

    }
}
export {AddImagesController}