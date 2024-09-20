import prismaClient from "../../prisma";
import cloudinary from '../../config/cloudinary'; // Certifique-se de que o Cloudinary está configurado corretamente

interface AddImageToUserStore {
  userId: string;
  storeId: string;
  imageUrl: string; // Caminho ou URL local da imagem
}

class AddImagesService {
  async execute({ userId, storeId, imageUrl }: AddImageToUserStore) {
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

    // Fazer upload da imagem para o Cloudinary
    try {
      const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        folder: 'user_images', // Define a pasta onde as imagens serão salvas no Cloudinary
      });

      // Adicionar a imagem associada ao UserStore com a URL retornada do Cloudinary
      const newImage = await prismaClient.image.create({
        data: {
          url: uploadResult.secure_url, // URL da imagem no Cloudinary
          userStoreId: userStoreRelation.id,
        },
        select: {
          id: true,
          url: true,
          createdAt: true,
        },
      });

      return newImage;
    } catch (err) {
      throw new Error(`Erro ao adicionar a imagem: ${err.message}`);
    }
  }
}

export { AddImagesService };
