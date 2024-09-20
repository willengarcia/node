import { Request, Response } from "express";
import { ValidImageService } from "../../services/images/ValidImageService";
class ValidImageController{
    async  handle(req:Request, res:Response){
        const imageId = req.params.id
        const validImageService = new ValidImageService()
        try{
            const retorno = await validImageService.execute({imageId})
            return res.json(retorno)
        }catch(err){
            return res.status(400).json({error: err.message})
        }

    }
}
export { ValidImageController }