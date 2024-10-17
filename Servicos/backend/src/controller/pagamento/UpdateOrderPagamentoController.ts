import { Request, Response } from "express";
import { UpdateOrderPagamentoService } from "../../services/pagamento/UpdateOrderPagamentoServices";
class UpdateOrderPagamentoController{
    async handle(req:Request, res:Response){
        const {orderId, clientId, urlPix, linkPix} = req.body
        if((!orderId)||(!clientId)){
            return res.status(400).json({erro:'Entradas não inseridas'})
        }
        try{
            const updateOrderPagamentoService = new UpdateOrderPagamentoService()
            const insert = await updateOrderPagamentoService.execute({orderId, clientId, urlPix, linkPix})
            return res.status(200).json(insert)
        }catch(err){
            return res.status(500).json({erro:err.message})
        }
    }
}
export { UpdateOrderPagamentoController }