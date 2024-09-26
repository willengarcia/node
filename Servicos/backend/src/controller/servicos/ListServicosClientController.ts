import { Request, Response } from "express";
import { ListOrdersService } from "../../services/servicos/ListServicosClientServices";


class ListOrdersController {
    async handle(req: Request, res: Response) {
        try {
            const listOrdersService = new ListOrdersService();
            const orders = await listOrdersService.execute();
            return res.json(orders);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
export { ListOrdersController };
