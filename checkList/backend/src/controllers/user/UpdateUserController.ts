import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";
interface superUser{
    userId:string;
}
class UpdateUserController{
    async handle(req:Request, res: Response){
        const userId = req.params.userId
        const update = new UpdateUserService()
        try{
            const retorno = await update.execute({userId})
            return res.json({ok:true})
        }catch(err){
            return res.status(400).json({error: err.message})
        }
        
    }
}
export {UpdateUserController}