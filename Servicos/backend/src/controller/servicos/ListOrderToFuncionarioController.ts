import { Request, Response } from "express";
import { ListOrdersToFuncionarioService } from "../../services/servicos/ListOrderToFuncionarioService";

class ListOrdersToFuncionarioController {
    async handle(req: Request, res: Response) {
        const funcionarioId = req.params.funcionarioId; // Presuma que isso esteja no formato correto

        try {
            const listOrdersService = new ListOrdersToFuncionarioService();
            const orders = await listOrdersService.execute({funcionarioId});
            return res.json(orders);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}


export { ListOrdersToFuncionarioController };