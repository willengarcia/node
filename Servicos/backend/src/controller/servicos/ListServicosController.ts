import { Request, Response } from "express";
import { ListServicosService } from "../../services/servicos/ListServicosService";

class ListServicosController {
    async handle(req: Request, res: Response) {
        const listServicoService = new ListServicosService();

        try {
            const lista = await listServicoService.execute();
            return res.status(200).json(lista); // Retorna 200 OK com a lista
        } catch (error) {
            console.error("Erro ao listar serviços:", error);
            return res.status(500).json({ message: "Erro interno ao listar serviços" }); // Retorna 500 em caso de erro
        }
    }
}

export { ListServicosController };
