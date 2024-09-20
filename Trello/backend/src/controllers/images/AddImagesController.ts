import { Request, Response } from "express";
import { AddImagesService } from '../../services/images/AddImagesService';
import cloudinary from '../../config/cloudinary';

class AddImagesController {
    async handle(userId: string, storeId: string, imageUrl: string, res: Response) {
        try {
            const addImagesService = new AddImagesService();
            const image = await addImagesService.execute({ userId, storeId, imageUrl });
            return res.json(image);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { AddImagesController };
