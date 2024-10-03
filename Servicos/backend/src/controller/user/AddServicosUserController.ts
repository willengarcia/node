import { Request, Response } from "express";
import { AddServicosUserService } from "../../services/user/AddServicosUserService";

class AddServicosUserController {
    async handle(req: Request, res: Response) {
        const { servicoId, description, dataTime, hora, userId } = req.body;

        // Validação dos campos obrigatórios
        if ((!servicoId) || (!dataTime) || (!hora) || (!userId)) {
            return res.status(400).json({ erro: 'Erro ao inserir os dados!' });
        }

        try {
            const addServiceUserService = new AddServicosUserService();
            
            // Verifica se a imagem foi enviada, se não, envia undefined
            const imageBuffer = req.file ? req.file.buffer : undefined;
            
            const pedido = await addServiceUserService.execute({
                servicoId,
                description,
                dataTime,
                hora,
                userId,
                imageBuffer // Buffer da imagem ou undefined
            });
            
            return res.json(pedido);

        } catch (err) {
            return res.status(400).json({ error: err.message || 'Erro ao processar o pedido.' });
        }
    }
}

export { AddServicosUserController };
