import { Request, Response } from "express";
import { CreateChecklistService } from "../../services/checklist/CreateChecklistService";

class CreateChecklistController {
    async handle(req: Request, res: Response) {
        const { teamId, userTeamId, name } = req.body;

        // Validação dos dados de entrada
        if (!teamId || !userTeamId || !name) {
            return res.status(400).json({ error: 'Atributos undefined' });
        }

        try {
            const createChecklistService = new CreateChecklistService();
            const result = await createChecklistService.execute({ name, teamId, userTeamId });

            if (result.success) {
                return res.status(201).json(result.checklist);
            } else {
                return res.status(500).json({ error: result.error });
            }
        } catch (error) {
            console.error("Erro no controlador:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export { CreateChecklistController };
