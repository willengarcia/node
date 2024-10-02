import { Request, Response } from "express";
import { AddReviewServices } from "../../services/avaliacao/AddReviewServices";

class AddReviewController{
    async handle(req:Request, res:Response){
        const {clientId, rating, comment, orderId} = req.body
        if((!clientId)||(!orderId)||(!rating)){
            return res.status(400).json({erro:'Falha ao encontrar Id do cliente, o id do pedido e é necessário colocar o número!'})
        }
        try {
            const addReviewService = new AddReviewServices()
            const insercao = await addReviewService.execute({clientId, rating, comment, orderId})
            return res.status(200).json({insersao:insercao})
        } catch (error) {
            return res.status(400).json({erro:error})
        }
    }
}
export {AddReviewController}