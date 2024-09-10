import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserServices";

class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email, password} = req.body // requisição que o usuário enviou
        const creatUserService = new CreateUserService()
        const user = await creatUserService.execute({name, email, password}) // interfaces
        return res.json(user)
    }
}
// await espera o serviço, e async é para demorar

export {CreateUserController}