import prismaClient from "../../prisma";
import cloudinary from '../../config/cloudinary';
import { Readable } from 'stream';

interface AddImageToUserStore {
    userId: string;
    storeId: string;
    imageBuffer: Buffer; // Buffer da imagem
}

class AddImagesService {
    async execute({ userId, storeId, imageBuffer }: AddImageToUserStore) {
        // Verificar se o usuário e a loja existem
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
        });

        const store = await prismaClient.store.findUnique({
            where: { id: storeId },
        });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        if (!store) {
            throw new Error('Loja não encontrada.');
        }

        // Verificar se o usuário está associado à loja
        const userStoreRelation = await prismaClient.userStore.findUnique({
            where: {
                userId_storeId: {
                    userId: user.id,
                    storeId: store.id,
                },
            },
        });

        if (!userStoreRelation) {
            throw new Error('Usuário não está associado à loja.');
        }

        // Fazer upload da imagem no Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: 'image',
        });

        // Retornar a URL após o upload
        return new Promise(async (resolve, reject) => {
            const stream = Readable.from(imageBuffer);
            stream.pipe(uploadStream)
                .on('finish', async () => {
                    const result = await new Promise<any>((res, rej) => {
                        uploadStream.on('finish', () => res(uploadStream));
                        uploadStream.on('error', (error) => rej(error));
                    });
                    resolve(result.secure_url); // Use secure_url para obter a URL
                })
                .on('error', (error) => reject(error));
        }).then(async (imageUrl) => {
            // Adicionar a imagem associada ao UserStore com a URL retornada do Cloudinary
            const newImage = await prismaClient.image.create({
                data: {
                    url: imageUrl as string, // URL da imagem no Cloudinary
                    userStoreId: userStoreRelation.id,
                },
                select: {
                    id: true,
                    url: true,
                    createdAt: true,
                },
            });

            return newImage;
        });
    }
}

export { AddImagesService };
