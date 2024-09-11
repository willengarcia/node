import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{ // chama no router
    async handle(req:Request, res:Response){
        
        const {name, email, senha} = req.body;
        const createUserService = new CreateUserService()
        const exeutar = await createUserService.execute({name, email, senha})
        return res.json({"Usuário":exeutar})
    }
}

export {CreateUserController} // exporta