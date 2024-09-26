import { Request, Response } from 'express';
import { AddServicosServices } from '../../services/servicos/AddServicosServices';

class AddServicoController {
    async handle(req: Request, res: Response) {
        const { name, description, price, funcionarioID } = req.body;

        const addServicosServices = new AddServicosServices();

        try {
            const service = await addServicosServices.execute({
                name,
                description,
                price: parseFloat(price), // Converte o preço para número
                funcionarioID
            });
            return res.status(201).json(service);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
export {AddServicoController}