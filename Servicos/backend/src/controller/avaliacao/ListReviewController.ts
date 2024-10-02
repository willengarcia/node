import { Request, Response } from "express";
import { ListReviewService } from "../../services/avaliacao/ListReviewServices";
class ListReviewController{
    async handle(req:Request, res:Response){
        const funcionarioId = req.params.funcionarioId
        try {
            const listReviewservice = new ListReviewService()
            const lista = await listReviewservice.execute({funcionarioId})
            return res.status(200).json(lista)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
export {ListReviewController}