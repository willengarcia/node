import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";
class AuthUserController{
    async handle(req:Request, res:Response){
        const {email, password} = req.body
        const authUserService = new AuthUserService()
        try{
            const auth = await authUserService.execute({email, password})
            return res.json(auth)
        }catch(err){
            return res.status(400).json({error: err.message})
        }
        
    }
}
export {AuthUserController}