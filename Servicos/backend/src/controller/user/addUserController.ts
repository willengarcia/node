import { Request, Response } from "express";
import { AddUserService } from "../../services/user/addUserService"
class AddUserController{
    async handle(req:Request, res:Response){
        const {name, passwordUser, emailUser, celularUser} = req.body
        if((!name)|| (!passwordUser) || (!emailUser) || (!celularUser)){
            return res.status(412).end()
        }
        try{
            const addUser = new AddUserService()
            const retorno = await addUser.execute({name, passwordUser, emailUser, celularUser})
            return res.json(retorno)
        }catch(err){
            return res.status(400).end()
        }
    }
}
export {AddUserController}