import { Request, Response } from "express";
import { UpdateOrderPedidosService } from "../../services/pedidos/UpdateOrderPedidosServices";
class UpdateOrderPedidosController{
    async handle(req:Request, res:Response){
        const {orderId, employeeId, status, urlPix, linkPix} = req.body
        if((!orderId)||(!employeeId)){
            return res.status(400).json({erro:'Entradas não inseridas'})
        }
        try{
            const updateOrderPedidosService = new UpdateOrderPedidosService()
            const insert = await updateOrderPedidosService.execute({orderId, employeeId, status, urlPix, linkPix})
            return res.status(200).json(insert)
        }catch(err){
            return res.status(405).json(err)
        }
    }
}
export { UpdateOrderPedidosController }