import { Request, Response } from "express";
import { ListChecklistToTeamService } from "../../services/checklist/ListChecklistToTeamService";
class ListChecklistToTeamController{
    async handle(req:Request, res:Response){
        const idTeam = req.params.idTeam
        if(!idTeam){
            res.status(401).json({sucess:false, error:'Atributos is Undefined'})
        }
        try {
            const listChecklistToTeamService = new ListChecklistToTeamService()
            const execute = await listChecklistToTeamService.execute({idTeam})
            return res.status(200).json(execute)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
export { ListChecklistToTeamController }