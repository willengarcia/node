import { Request, Response } from "express";
import { ListOrdersService } from "../../services/servicos/ListServicosClientServices";
import { OrderStatus } from "@prisma/client"; // Certifique-se de importar o enum

class ListOrdersController {
    async handle(req: Request, res: Response) {
        // O status pode vir dos parâmetros da rota ou da query string
        const status = req.params.status || req.query.status;

        // Verificar se o status fornecido corresponde a um valor válido do enum OrderStatus
        let statusOrder: OrderStatus | undefined;
        if (status && Object.values(OrderStatus).includes(status as OrderStatus)) {
            statusOrder = status as OrderStatus;
        }

        try {
            const listOrdersService = new ListOrdersService();
            const orders = await listOrdersService.execute({ status: statusOrder });
            return res.json(orders);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { ListOrdersController };
