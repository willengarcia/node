import { Request, Response } from 'express';
import { AddImagesService } from '../../services/images/AddImagesService';

class AddImagesController {
    async handle(req: Request, res: Response) {
        const { userId, storeId } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Arquivo não encontrado.' });
        }

        try {
            const addImageService = new AddImagesService();
            const newImage = await addImageService.execute({
                userId,
                storeId,
                imageBuffer: req.file.buffer, // Passa o buffer da imagem
            });

            return res.json(newImage);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { AddImagesController };
