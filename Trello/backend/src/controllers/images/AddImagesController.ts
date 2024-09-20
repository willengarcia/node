import { Request, Response } from "express";
import { AddImagesService } from '../../services/images/AddImagesService';
interface AddImageToUserStore {
    userId: string;
    storeId: string;
    imagePath: string; // URL da imagem
}
class AddImagesController {
  async handle({ userId, storeId, imagePath }: AddImageToUserStore, res: Response) {
    const addImagesService = new AddImagesService();
    try {
      const image = await addImagesService.execute({ userId, storeId, imagePath });
      return res.json(image);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { AddImagesController };

