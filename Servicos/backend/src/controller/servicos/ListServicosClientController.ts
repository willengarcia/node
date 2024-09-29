import { Request, Response } from "express";
import { ListOrdersService } from "../../services/servicos/ListServicosClientServices";

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const status = req.params.status; // Presuma que isso esteja no formato correto

        try {
            const listOrdersService = new ListOrdersService();
            const orders = await listOrdersService.execute({status});
            return res.json(orders);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}


export { ListOrdersController };
