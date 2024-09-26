import { Request, Response } from "express";
import { AddServicosUserService } from "../../services/user/AddServicosUserService";

class AddServicosUserController{
    async handle(req:Request, res:Response){
        const {servicoId, description, dataTime, hora, userId} = req.body
        
        if((!servicoId)||(!dataTime)||(!hora)||(!userId)){
            return {error:'Erro ao inserir os dados'}
        }
        try{
            const addServiceUserService = new AddServicosUserService()
            const pedido = await addServiceUserService.execute({servicoId, description, dataTime, hora, userId})
            return res.json(pedido)
        }catch(err){
            return res.status(400).json({error:err});
        }
    }
}
export {AddServicosUserController}