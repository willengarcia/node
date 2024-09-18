import prismaClient from "../../prisma";

interface StoreId {
  storeId: string;
}

class ListImageService {
  async execute({ storeId }: StoreId) {
    // Buscar todas as imagens associadas à loja, incluindo informações do usuário
    const images = await prismaClient.image.findMany({
      where: {
        userStore: {
          storeId: storeId
        },
      },
      select: {
        id: true,
        url: true,
        createdAt: true,
        userStore: {
          select: {
            id:true,
            user: {
              select: {
                id: true,
                name: true, // Nome do usuário
              },
            },
            store: {
              select: {
                id: true,
                name: true, // Nome da loja
              },
            },
            isVerified: true,
          },
        },
      },
    });

    // Formatar a resposta para incluir apenas os campos desejados
    const formattedImages = images.map(image => ({
      idImage: image.id,
      userName: image.userStore.user.name,
      imageUrl: image.url,
      isVerified: image.userStore.isVerified,
      createdAt: image.createdAt,
    }));

    return formattedImages;
  }
}

export { ListImageService };
