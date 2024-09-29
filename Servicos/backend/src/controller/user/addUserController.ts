import { Request, Response } from 'express';
import { AddUserService } from '../../services/user/addUserService';

export class AddUserController {
    async handle(req: Request, res: Response) {
        const { name, passwordUser, emailUser, celularUser, tipo } = req.body;

        const addFuncionarioService = new AddUserService();

        try {
            const usuario = await addFuncionarioService.execute({name, passwordUser, emailUser, celularUser, tipo});

            return res.status(201).json(usuario); // Retorna o funcionário criado
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
