import prismaClient from "../../prisma";

interface ListImagesForUserStore {
  userId: string;
  storeId: string;
}
class ListImagesService {
  async execute({ userId, storeId }: ListImagesForUserStore) {
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

    // Listar imagens associadas ao usuário e loja
    const images = await prismaClient.image.findMany({
      where: {
        userId: userId
      },
      include:{
        user:{
          select:{
            name:true,
            images:true
          }
        }
      },
    });

    return images;
  }
}
export { ListImagesService };
