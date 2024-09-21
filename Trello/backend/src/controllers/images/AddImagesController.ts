import { Request, Response } from "express";
import { AddImagesService } from '../../services/images/AddImagesService';
import cloudinary from '../../config/cloudinary';

class AddImagesController {
    async handle(req: Request, res: Response) {
        try {
            const { userId, storeId } = req.body;

            // Verifique se o arquivo foi enviado corretamente
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: 'Arquivo não encontrado.' });
            }

            // Fazer upload da imagem para o Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(file.path); // Enviar a imagem para o Cloudinary

            // Chamar o serviço com a URL da imagem que foi enviada ao Cloudinary
            const addImagesService = new AddImagesService();
            const imageUrl = uploadResponse.secure_url; // URL da imagem no Cloudinary
            const image = await addImagesService.execute({ userId, storeId, imageUrl });

            return res.json(image);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { AddImagesController };
