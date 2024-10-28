import { Request, Response } from "express";
import { CreateEquipeService } from "../../services/equipe/CreateEquipeServices"
import prismaClient from "../../prisma";
class CreateEquipeController{
    async handle(req:Request, res:Response){
        const { name, location } = req.body;
        if((!name)||(!location)){
            return res.status(401).json({error:'Atributos undefined'})
        }

        try {
            const createEquipeService = new CreateEquipeService()
            const execute = createEquipeService.execute({name, location})
            res.status(201).json(execute);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar equipe' });
        }
    }
}
export {CreateEquipeController}