import { Request, Response } from "express";
import { CreateUserService } from "../../service/user/CreateUserService";
class CreateUserController{
    async handle(req:Request, res:Response){
        const {name, email, password} = req.body
        if((!name)||(!email)||(!password)){
            res.status(400).json({sucess:false, error:`Dados ausentes.`})
        }
        try {
            const createUserService = new CreateUserService()
            const execute = await createUserService.execute({name, email, password})
            return res.status(200).json(execute)
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}
export { CreateUserController }