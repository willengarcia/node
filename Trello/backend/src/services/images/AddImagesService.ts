import prismaClient from "../../prisma";
interface AddImageToUserStore {
  userId: string;
  storeId: string;
  imageUrl: string; // URL ou caminho da imagem
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

    // Adicionar a imagem
    const newImage = await prismaClient.image.create({
      data: {
        url: imageUrl,
        userId: user.id
      },
      select: {
        id: true,
        url: true,
        createdAt: true,
      },
    });

    return newImage;
  }
}
export { AddImagesService };
