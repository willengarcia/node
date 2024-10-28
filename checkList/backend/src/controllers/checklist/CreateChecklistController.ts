import { Request, Response } from "express";
import { CreateChecklistService } from "../../services/checklist/CreateChecklistService";
class CreateChecklistController{
    async handle(req:Request, res:Response){
        const {teamId, userTeamId} = req.body;
        if((!teamId)||(!userTeamId)){
            return res.status(401).json({error:'Atributos undefined'})
        }
        try{
            const createChecklistService = new CreateChecklistService()
            const execute = createChecklistService.execute({teamId, userTeamId})
            return res.status(200).json({execute})
        }catch(error){
            return res.status(500).json({error})
        }
    }
}

export {CreateChecklistController}