import { Request, Response } from "express";
import { AuthUserClientService } from "../../services/user/AuthUserClientService";
class AuthUserClientController{
    async handle(req:Request, res:Response){
        const {email, password, tipo} = req.body
        const authUserService = new AuthUserClientService()
        if((!email)||(!password)){
            return res.status(400).json({error: 'Insira o email e password'})
        }
        try{
            const auth = await authUserService.execute({email, password, tipo})
            return res.json(auth)
        }catch(err){
            return res.status(400).json({error: err.message})
        }
        
    }
}
export {AuthUserClientController}