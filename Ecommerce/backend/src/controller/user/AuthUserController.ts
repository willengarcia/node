import { Request, Response } from "express";
class AuthUserController{
    async handle(req:Request, res:Response){
        const {email, password} = req.body
        if((!email)||(!password)){
            return res.status(400).json({sucess:false, error:`Parâmetros incorretos!`})
        }
        try {
            
        } catch (error) {
            
        }
    }
}
export { AuthUserController }