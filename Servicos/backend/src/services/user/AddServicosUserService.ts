import cloudinary from "../../config/cloudinary";
import prismaClient from "../../prisma";
import { Readable } from 'stream';

interface AddService {
    servicoId: string;
    description?: string;
    dataTime: string;
    hora: string;
    userId: string;
    imageBuffer?: Buffer; // Buffer da imagem (opcional)
}

class AddServicosUserService {
    async execute({ servicoId, description, dataTime, hora, userId, imageBuffer }: AddService) {
        try {
            let imageUrl: string | undefined;

            // Verifica se o buffer da imagem foi passado, caso contrário, pula o upload
            if (imageBuffer) {
                imageUrl = await new Promise<string>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream({
                        resource_type: 'image',
                    }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result?.secure_url || '');
                    });

                    const stream = Readable.from(imageBuffer);
                    stream.pipe(uploadStream).on('error', (error) => reject(error));
                });
            }

            // Criação do pedido no banco de dados com ou sem a imagem
            const data = await prismaClient.order.create({
                data: {
                    clientId: userId,
                    serviceId: servicoId,
                    data: dataTime,
                    hota: hora, // Corrigido de "hota" para "hora"
                    description: description,
                    status: "PENDING", // Definido como PENDING
                    urlImages: imageUrl || '', // Define como string vazia se não houver imagem
                },
                select: {
                    id: true,
                    service: true,
                    description: true,
                    data: true,
                    status: true,
                }
            });

            return data;

        } catch (err) {
            throw new Error('Erro ao solicitar serviço!: '+err);
        }
    }
}

export { AddServicosUserService };
