import { Response, Request } from "express";
import { ListUserService } from "../../services/user/ListUserService";
class ListUserController{
    async handle(req:Request, res:Response){
        const lista = new ListUserService()
        try{
            const usuarios = await lista.execute()
            return res.json(usuarios)
        }catch(err){
            return res.status(400).json({error: err.message})
        }
    }
}
export { ListUserController }