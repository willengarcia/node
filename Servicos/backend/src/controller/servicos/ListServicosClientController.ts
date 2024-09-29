import { Request, Response } from "express";
import { ListOrdersService } from "../../services/servicos/ListServicosClientServices";
import { OrderStatus } from "@prisma/client"; // Importe o enum

class ListOrdersController {
    async handle(req: Request, res: Response) {
        // Capture o status diretamente dos parâmetros da requisição
        const status = req.params.status as OrderStatus; // Certifique-se de que seja do tipo OrderStatus

        try {
            const listOrdersService = new ListOrdersService();
            const orders = await listOrdersService.execute({ status });
            return res.json(orders);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
export {ListOrdersController}