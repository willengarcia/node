import { Request, Response } from "express";
import {AddImagesService} from '../../services/images/AddImagesService'

class AddImagesController{
    async handle(req:Request, res:Response){
        const { userId, storeId } = req.body
        const addImagesService = new AddImagesService()
        console.log(req.file)
        const {filename:imageUrl} = req.file
        const image = await addImagesService.execute({ userId, storeId, imageUrl })
        return res.json(image)
        // if(!req.file){
        //     throw new Error('Erro ao colocar a imagem')
        // }else{
        //     const {filename:imageUrl} = req.file
        //     const image = await addImagesService.execute({ userId, storeId, imageUrl })
        //     return res.json(image)
        // }
    }
}
export {AddImagesController}