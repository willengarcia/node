import { Request, Response } from "express";
import cloudinary from '../../config/cloudinary';
import { AddImagesService } from "../../services/images/AddImagesService";

class AddImagesController {
    async handle(req: Request, res: Response) {
        try {
            const { userId, storeId } = req.body;
            const file = req.file; // O arquivo enviado pelo multer
            
            // Verifica se o arquivo foi enviado
            if (!file) {
                return res.status(400).json({ error: 'Arquivo não encontrado.' });
            }

            // Faz o upload do arquivo diretamente para o Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(file.path, {
                folder: 'user_images' // Pasta no Cloudinary
            });

            const imageUrl = uploadResponse.secure_url; // URL da imagem

            // Chame seu serviço para adicionar a imagem ao banco de dados
            const newImage = await new AddImagesService().execute({ userId, storeId, imageUrl });
            return res.json(newImage);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { AddImagesController };
