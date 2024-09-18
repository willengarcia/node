import { Response, Request } from "express";
import { ListUserService } from "../../services/user/ListUserService";
class ListUserController{
    async handle(req:Request, res:Response){
        const lista = new ListUserService()
        const usuarios = await lista.execute()
        return res.json(usuarios)
    }
}
export { ListUserController }